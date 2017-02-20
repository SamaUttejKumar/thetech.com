class Article < ActiveRecord::Base
  default_scope -> { order('created_at DESC') }
  scope :published, -> { join(:drafts).where('drafts.web_status == ?', Draft.web_statuses[:web_published]) }

  has_many :drafts
  belongs_to :section
  belongs_to :issue

  validates :slug, presence: true, uniqueness: true, length: {minimum: 5, maximum: 80}, format: {with: /\A[a-z0-9-]+\z/}
  validates :section, presence: true
  validates :issue, presence: true
  validates :rank, presence: true

  RANKS = ([99] + (0..98).to_a)

  # REBIRTH_TODO: API
  # REBIRTH_TODO: ElasticSearch

  # Accesses various Draft-s of the Article
  def has_print_ready_draft?
    self.drafts.print_ready.any?
  end

  def has_web_ready_draft?
    self.drafts.web_ready.any?
  end

  def has_web_published_draft?
    self.drafts.web_published.any?
  end

  def has_pending_draft?
    newest_web_ready_draft = self.drafts.web_ready.order('created_at DESC').first
    return false if newest_web_ready_draft.nil?
    return true if !self.has_web_published_draft?
    return newest_web_ready_draft.created_at > self.newest_web_published_draft.created_at
  end

  def newest_web_published_draft
    self.drafts.web_published.order('created_at DESC').first
  end

  def oldest_web_published_draft
    self.drafts.web_published.order('created_at DESC').last
  end

  def newest_print_ready_draft
    self.drafts.print_ready.order('created_at DESC').first
  end

  def oldest_print_ready_draft
    self.drafts.print_ready.order('created_at DESC').last
  end

  def newest_draft
    self.drafts.order('created_at DESC').first
  end
end
