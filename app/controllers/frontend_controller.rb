class FrontendController < ApplicationController
  layout 'frontend'

  def homepage
    @latest_issue = Issue.latest_published
    @homepage = Homepage.latest_published
    set_cache_control_headers(1.hours)
  end

  def article
    # REBIRTH_TODO: check wrong date?
    @article = Article.find_by(slug: params[:slug])
    raise_404 && return if @article.nil?

    @draft = @article.newest_web_published_draft
    raise_404 && return if @draft.nil?

    return redirect_to @draft.redirect_url if @draft.redirect_url.present?
  end

  def image
    @image = Image.find(params[:id])
  end

  def section
    # REBIRTH_TODO
    @section = Section.friendly.find(params[:slug])
    @title = @section.name

    # We need a separate @count because this ought to be the total count
    @count = @section.articles.web_published.count
    @articles = @section.articles.web_published.page(params[:page]).per(20)

    set_cache_control_headers(1.hours)
  end

  def author
    @author = Author.friendly.find(params[:slug])
    @title = @author.name

    # REBIRTH_TODO: Performance? Elegance?
    @drafts = @author.drafts.web_published
    @drafts = @drafts.select { |d| d.article.newest_web_published_draft == d }
    @articles = @drafts.map(&:article).uniq.sort_by { |a| a.newest_web_published_draft.published_at }

    set_cache_control_headers(24.hours)
  end

  def photographer
    @author = Author.friendly.find(params[:slug])
    @images = @author.images.web_published.order('created_at DESC')

    @title = @author.name

    set_cache_control_headers(24.hours)
  end

  def tag
    @tag = ActsAsTaggableOn::Tag.find_by(slug: params[:slug])
    raise_404 if @tag.nil?

    @title = @tag.name.titlecase

    # REBIRTH_TODO: Performance? Elegance?
    @drafts = Draft.web_published.tagged_with(@tag)
    @drafts = @drafts.select { |d| d.article.newest_web_published_draft == d }
    @articles = @drafts.map(&:article).uniq.sort_by { |a| a.newest_web_published_draft.published_at }

    set_cache_control_headers(24.hours)
  end

  def issue_index
  end

  def issue
    volume = params[:volume].to_d
    number = params[:number].to_d

    @issue = Issue.find_by(volume: volume, number: number)

    if @issue && @issue.published_at <= Time.now
      @next = Issue.published.where('published_at > ?', @issue.published_at).reorder('published_at ASC').first
      @prev = Issue.published.where('published_at < ?', @issue.published_at).first

      @title = "Volume %d, Issue %d" % [params[:volume], params[:number]]

      @images = @issue.images.web_published
    else
      raise_404
    end

    set_cache_control_headers(24.hours)
  end

  def ads_manifest
    json = Hash[Ad.positions.map do |k, v|
      [
        k,
        Ad.active.where(position: v).map do |a|
          {
            image: frontend_ads_relay_path(a),
            link: a.link
          }
        end
      ]
    end]

    render json: json
  end

  def ads_relay
    require 'open-uri'

    ad = Ad.find(params[:id].to_i)

    data = Paperclip.io_adapters.for(ad.content).read
    send_data data
  end

  private
    def allowed_in_frontend?
      true
    end

    def set_cache_control_headers(age = 24.hours)
      request.session_options[:skip] = true
      response.headers["Cache-Control"] = "public, max-age=#{age}"
    end
end