class ArticlesController < ApplicationController
  before_action :prepare_authors_json, only: [:new, :edit]

  load_and_authorize_resource

  def index
    # Rough query syntax:
    #
    # If query looks like "  v343 N9394    " or "V134/N61" or "v100n1"
    #   then the articles from that issue are returned.
    # Otherwise
    #   articles are searched for matching headline or other metadata.

    match = /^\s*V(\d+)[ \/]?N(\d+)\s*$/i.match(params[:q])
    unless match.nil?
      issue = Issue.find_by(volume: match[1].to_i, number: match[2].to_i)
      @articles = issue.articles rescue []
    else
      drafts = Draft.search_query(params[:q]).order('created_at DESC').limit(100)
      @articles = drafts.map(&:article).uniq
    end

    respond_to do |format|
      format.html
      format.js
    end
  end

  def new
    @article = Article.new
    @draft = Draft.new
  end

  def create
    @article = Article.new(article_params)
    @draft = Draft.new(draft_params)
    @draft.article = @article
    @draft.user = current_user

    if @article.valid? && @draft.valid?
      @article.save!
      @draft.save!

      redirect_to article_draft_path(@article, @draft), flash: {success: "You have successfully created an article. "}
    else
      @flash[:error] = (@article.errors.full_messages + @draft.errors.full_messages).join("\n")
      prepare_authors_json
      render 'new'
    end
  end

  def edit
  end

  def update
    @article.assign_attributes(article_params)
    @piece.assign_attributes(piece_params)

    if @article.valid? && @piece.valid?
      @piece.save
      @article.save

      unplaced_images = @article.unplaced_images
      unplaced_images_lines = unplaced_images.map(&:caption).join("\n")
      flash[:warning] = "You have added the following #{ActionController::Base.helpers.pluralize unplaced_images.count, "image"} to the article, but have not placed them anywhere in the content: \n" + unplaced_images_lines unless unplaced_images.empty?

      redirect_to article_article_version_path(@article, save_version)
    else
      @flash[:error] = (@article.errors.full_messages + @piece.errors.full_messages).join("\n")

      prepare_authors_json

      render 'edit'
    end
  end

  def destroy
    @article.article_versions.destroy_all
    @article.piece.destroy
    @article.destroy
    respond_with(@article)
  end

  private
    def allowed_params
      params.permit(
        article: [:issue_id, :section_id, :slug, :syndicated, :allow_ads],
        draft: [:primary_tag, :secondary_tags, :headline, :subhead, :comma_separated_author_ids, :bytitle, :attribution, :redirect_url, :lede, :html]
      )
    end

    def article_params
      allowed_params[:article]
    end

    def draft_params
      allowed_params[:draft]
    end

    def prepare_authors_json
      gon.authors = Author.all.map { |a| {id: a.id, name: a.name} }
      gon.prefilled_authors = @article.author_ids.split(',').map { |i| Author.find(i.to_i) }.map { |a| {id: a.id, name: a.name} } rescue []
    end
end
