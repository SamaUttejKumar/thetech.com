class HomepagesController < ApplicationController
  before_action :set_homepage, except: [:index, :new_submodule_form, :new_row_form, :new_specific_submodule_form, :create_specific_submodule, :create_new_row]

  load_and_authorize_resource

  def index
    @homepages = Homepage.order('created_at DESC').limit(100)
  end

  def show
    @homepage = Homepage.find(params[:id])
    @latest_issue = Issue.latest_published

    if @homepage.published? || @homepage.publish_ready?
      @homepage_warning = "Layout locked since it has already been marked ready for publication."
      @homepage_locked = true
    else
      @homepage_editing = true
    end

    gon.layout = @homepage.layout

    render 'frontend/homepage', layout: 'frontend'
  end

  def update
    @homepage = Homepage.find(params[:id])
    @homepage.update(
      layout: JSON.parse(params[:layout]),
      status: params[:status]
    )

    redirect_to homepage_path(@homepage), flash: {success: 'Successfully updated homepage. '}
  end

  def mark_publish_ready
    require 'varnish/purger'

    @homepage = Homepage.find(params[:id])
    @homepage.publish_ready!

    redirect_to homepage_path(@homepage), flash: {success: 'Successfully marked layout as publish ready. '}
  end

  def duplicate
    @homepage = Homepage.find(params[:id])

    nh = Homepage.create(layout: @homepage.layout)

    redirect_to homepage_path(nh), flash: {success: 'Successfully duplicated the layout. '}
  end

  def new_submodule_form
    @uuid = params[:module_uuid]

    respond_to do |f|
      f.js
    end
  end

  def new_row_form
    respond_to do |f|
      f.js
    end
  end

  def new_specific_submodule_form
    @uuid = params[:uuid]
    @mod_uuid = params[:mod_uuid]
    @type = params[:type]

    respond_to do |f|
      f.js
    end
  end

  def create_specific_submodule
    @type = params[:type]
    @uuid = params[:uuid]
    @mod_uuid = params[:mod_uuid]

    sub_params = params[:submodule]

    m = {uuid: @uuid, type: @type}

    case @type.to_sym
    when :article
      m[:article_id] = sub_params[:article_id]
    when :img, :img_nocaption
      m[:image_id] = sub_params[:image_id]
    # when :links
    #   m[:links] = sub_params[:links].select(&:present?)
    end

    @homepage_editing = true
    @content = render_to_string(partial: 'frontend/homepage/modules/submodule', locals: {m: m})
    @json = m.to_json

    respond_to do |f|
      f.js
    end
  end

  def create_new_row
    @uuid = params[:uuid]
    @type = params[:type].split(',').map(&:to_i)

    row = {
      uuid: @uuid,
      modules: @type.map do |c|
        {
          uuid: Homepage.generate_uuid,
          cols: c,
          submodules: []
        }
      end
    }

    @homepage_editing = true
    @content = render_to_string(partial: 'frontend/homepage/row', locals: {row: row})
    @json = row.to_json

    respond_to do |f|
      f.js
    end
  end

  def publish
    require 'varnish/purger'

    @homepage = Homepage.find(params[:id])
    pieces = Piece.find(@homepage.fold_pieces)
    pictures = Picture.find(@homepage.pictures)
    invalids = pieces.select { |p| !p.web_published? }
    invalid_pictures = pictures.select { |p| p.image.primary_piece && !p.image.web_published? }

    if invalids.any? or invalid_pictures.any?
      redirect_to publishing_dashboard_path, flash: {error: "Cannot publish layout since the following pieces have not been published yet: \n\n" + invalids.map(&:name).join("\n") + invalid_pictures.map(&:image).map(&:caption).map { |c| c.strip.presence || 'Uncaptioned image. ' }.join("\n")}
    else
      @homepage.published!

      Varnish::Purger.purge(root_path, true)

      redirect_to publishing_dashboard_path, flash: {success: "You have successfully published the homepage layout. "}
    end
  end

  private
    def set_homepage
      @homepage = Homepage.find(params[:id])
    end
end
