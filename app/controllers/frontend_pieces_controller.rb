class FrontendPiecesController < ApplicationController

  # Metas and contents accessible in view:
  #
  # @article.meta(:sym)
  #   :headline, :subhead, :bytitle, :intro, :modified, :published_at
  #   :syndicated?, :authors, :authors_line
  #
  # @piece.meta(:sym)
  #   :tags, :primary_tag, :slug
  #
  # @html
  #
  def show
    piece = Piece.find_by!(slug: params[:slug])

    datetime = piece.publish_datetime

    if params[:year].to_d != datetime.year ||
       params[:month].to_d != datetime.month ||
       params[:day].to_d != datetime.day
      raise_404
    else
      if piece.article
        @version = piece.article.display_version

        @article = Article.new
        @article.assign_attributes(@version.article_attributes)
        @piece = Piece.new
        @piece.assign_attributes(@version.piece_attributes)

        require 'renderer'
        renderer = Techplater::Renderer.new(@piece.web_template, @article.chunks)
        @html = renderer.render

        render 'show_article', layout: 'frontend'
      end
    end
  end

  private
    def allowed_in_frontend?
      true
    end
end
