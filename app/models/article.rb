##
# Represents an article
class Article < ActiveRecord::Base
  has_and_belongs_to_many :users
  has_many :authors, through: :authorships
  has_many :authorships
  has_many :article_versions

  belongs_to :piece

  validates :headline, presence: true, length: {minimum: 2}

  serialize :chunks
  serialize :author_ids

  before_save :parse_html
  before_save :update_authors_line
  after_save :update_authorships
  after_save :update_piece_web_template

  scope :search_query, lambda { |q|
    return nil if q.blank?

    terms = q.downcase.split(/\s+/)

    terms = terms.map { |e|
      ('%' + e.gsub('*', '%') + '%').gsub(/%+/, '%')
    }

    num_or_conds = 4
    where(
      terms.map { |t|
        "(LOWER(articles.headline) LIKE ? OR LOWER(articles.subhead) LIKE ? OR LOWER(articles.authors_line) LIKE ? OR LOWER(articles.bytitle) LIKE ?)"
      }.join(' AND '),
      *terms.map { |e| [e] * num_or_conds }.flatten
    )
  }

  # The latest published version.
  # Returns an instance of Article_Version
  def display_version
    self.article_versions.published.first
  end

  # The latest version.
  # Returns an instance of Article_Version
  def latest_version
    self.article_versions.first
  end

  # The earliest published version.
  # Returns an instance of Article_Version
  def original_published_version
    self.article_versions.published.last
  end

  # Gives the publication time of the first version to be published.
  # Returns an instance of datetime. If the article has never been published,
  # returns nil.
  def published_at
    self.original_published_version.try(:created_at)
  end

  # Gives the time of the most recent update to the latest published verison.
  # Returns an istance of datetime.
  def updated_at
    self.display_version.try(:updated_at)
  end

  def published?
    !self.display_version.nil?
  end

  def unpublished?
    !self.published?
  end

  def has_pending_draft?
    self.article_versions.first.try(:draft?)
  end

  # Returns the draft version of the article as an instance of Article_Version
  # if it exists. Otherwise, returns nil.
  def pending_draft
    has_pending_draft? ? self.article_versions.first : nil
  end

  # Parses a comma-separated string of author_ids and returns a list of
  # author_ids as integers.
  def author_ids=(author_ids)
    @author_ids = author_ids.split(',').map(&:to_i)
  end

  # Creates a comma separated string of author_ids, where the author_ids belong
  # to the authors of this article.
  def author_ids
    (@author_ids ||= self.authorships.map(&:author_id)).join(',')
  end

  # Returns an empty list of images associated with this article if there are
  # any such images. Otherwise, returns an empty list.
  def asset_images
    if self.piece
      self.piece.images
    else
      []
    end
  end

  def authors_line
    read_attribute(:authors_line) || assemble_authors_line
  end

  # metas to be displayed
  def meta(name)
    case name
      when :headline, :subhead, :bytitle, :intro, :updated_at, :published_at, :syndicated?
        self.send(name)
      when :authors
        Authorship.where(article_id: self.id).map(&:author)
      when :authors_line
        assemble_authors_line_from_authors(self.meta(:authors))
    end
  end

  # virtual accessor intro for lede or automatically generated lede. If no lede
  # was specified, the lede is taken to be the first paragraph. If there is no
  # first paragraph, the string 'A rather empty piece.' is used as the lede.
  def intro
    if self.lede.blank?
      p = self.chunks.first

      if p
        Nokogiri::HTML.fragment(p).text
      else
        'A rather empty piece.'
      end
    else
      self.lede
    end
  end

  # Returns an xml-formatted string containing the contents of the article.
  def as_xml
    content = ""

    content += "<document>\n"
    content += "<byline>#{self.headline} By #{self.authors_line}</byline>\n"
    content += "<bytitle>#{self.bytitle}</bytitle>\n"

    chunks.each do |c|
      chunk = Nokogiri::HTML.fragment(c)
      fc = chunk.children.first

      if fc.name.to_sym == :p
        content += "<body>"
        fc.children.each do |c|
          case c.name.to_sym
          when :text
            content += c.text
          when :a
            content += c.content
          when :em
            content += "<em>#{c.text}</em>"
          when :strong
            content += "<strong>#{c.text}</strong>"
          end
        end
        content += "</body>\n"
      end
    end

    content += "</document>"
    content
  end

  # This will simulate the controller save_version behavior. However, the params
  # will be generated instead of hand-crafted. This should only be used while 
  # importing data
  def save_version!
    version = ArticleVersion.create(
      article_id: self.id,
      contents: {
        article_params: {
          headline: self.headline,
          subhead: self.subhead,
          bytitle: self.bytitle,
          html: self.html,
          author_ids: self.authorships.map(&:author_id).join(','),
          lede: self.lede
        },
        piece_params: {
          section_id: self.piece.section_id,
          primary_tag: self.piece.primary_tag,
          tags_string: self.piece.tags_string,
          issue_id: self.piece.issue_id
        },
        article_attributes: self.attributes,
        piece_attributes: self.piece.attributes
      }
    )

    version.published!

    version
  end

  # Gives the time of creation of the latest published version. Returns datetime
  def publish_datetime
    self.display_version.created_at
  end

  # Returns a json representation of the cached version of the article.
  def as_display_json
    Rails.cache.fetch("#{cache_key}/display_json") do
      {
        slug: self.piece.slug,
        publish_status: self.published? ? '✓' : '',
        draft_pending: self.has_pending_draft? ? '✓' : '',
        section_name: self.piece.section.name,
        headline: self.headline,
        subhead: self.subhead,
        authors_line: self.authors_line,
        bytitle: self.bytitle,
        published_version_path: self.display_version && self.piece.frontend_display_path,
        draft_version_path: self.pending_draft && Rails.application.routes.url_helpers.article_article_version_path(self, self.pending_draft),
        latest_version_path: Rails.application.routes.url_helpers.article_article_version_path(self, self.latest_version),
        versions_path: Rails.application.routes.url_helpers.article_article_versions_path(self)
      }
    end
  end

  private

    # Parses the html content of the article and populates the chunks.
    def parse_html
      require 'parser'

      @parser = Techplater::Parser.new(self.html)
      @parser.parse!

      self.chunks = @parser.chunks
    end

    def update_piece_web_template
      self.piece.update(web_template: @parser.template)
    end

    def update_authors_line
      self.authors_line = assemble_authors_line
    end

    # Creates a user-friendly string representation of the authors of this
    # article.
    def assemble_authors_line
      authors = self.author_ids.split(',').map(&:to_i).map { |i| Author.find(i) }

      assemble_authors_line_from_authors(authors)
    end

    # Given an array of Author instances, creates a user-friendly string
    # representation of the authors of this article.
    def assemble_authors_line_from_authors(authors)
      case authors.size
      when 0
        "Unknown Author"
      when 1
        authors.first.name
      when 2
        "#{authors.first.name} and #{authors.last.name}"
      else
        (authors[0...-1].map(&:name) + ["and #{authors.last.name}"]).join(', ')
      end
    end

    def update_authorships
      self.authorships.destroy_all

      if @author_ids
        @author_ids.each_with_index do |author, order|
          self.authorships.create(
            author_id: author,
            rank: order
          )
        end
      end
    end
end
