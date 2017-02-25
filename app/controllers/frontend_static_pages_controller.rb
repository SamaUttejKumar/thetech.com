class FrontendStaticPagesController < FrontendController
  REDIRECTS = {
    'ads' => 'ads/index',
    'about' => 'about/index',
    'adinfo.html?type=mit' => 'adinfo/mit'
  }

  ADVERTISER_TYPES_INFO = {
    :mit => {
      :color_cost => 270,
      :ci_cost => 9.5,
      :advertiser_name => "MIT Advertiser"
    },
    :nonprofit => {
      :color_cost => 315,
      :ci_cost => 10,
      :advertiser_name => "Non-Profit Advertiser"
    },
    :local => {
      :color_cost => 325,
      :ci_cost => 11,
      :advertiser_name => "Local Advertiser"
    },
    :national => {
      :color_cost => 450,
      :ci_cost => 15,
      :advertiser_name => "National Advertiser"
    },
    :recruiter => {
      :color_cost => 540,
      :ci_cost => 18,
      :advertiser_name => "Recruiter"
    }
  }

  def show
    @name = params[:name].gsub('-', '_')
    if ['ads', 'about'].include?(@name)
      @name = @name + '/index'
    end
    @nav_name = @name.split('/').first
    @client_type_guess = request.remote_ip.split('.').first == '18' ? :mit : :unknown

    redirect_to frontend_static_page_url(REDIRECTS[@name]) and return if REDIRECTS[@name]

    render 'frontend_static_pages/' + @name, layout: 'frontend_static_pages'
  end

  def adinfo
    @advertiser_type = params[:advertiser_type].to_sym
    @color_cost = ADVERTISER_TYPES_INFO[@advertiser_type][:color_cost]
    @ci_cost = ADVERTISER_TYPES_INFO[@advertiser_type][:ci_cost]
    @advertiser_name = ADVERTISER_TYPES_INFO[@advertiser_type][:advertiser_name]
    @special_placement_percentage = 15;
    @late_fee_percentage = 10;
    @nav_name = 'ads'

    render 'frontend_static_pages/ads/adinfo', layout: 'frontend_static_pages'
  end

  def update_mast
    File.open(File.join(Rails.root, 'app', 'views', 'frontend_static_pages', 'about', 'mast_dokku_persistence', 'staff.html.erb'), 'w') do |f|

      if ENV['UPDATE_MAST_KEY'].eql? request.params[:secret_key]
        f.write(request.params[:content])

        render plain: "MAST UPDATED SUCCESSFULLY\n"
      else
        render plain: "MAST UPDATE FAILED\n"
      end
    end
  end

end


