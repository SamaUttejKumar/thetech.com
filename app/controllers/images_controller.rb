class ImagesController < ApplicationController
  before_action :set_image, only: [:show, :edit, :update, :destroy, :direct, :assign_piece, :unassign_piece]

  respond_to :html

  def index
    @images = Image.all
    respond_with(@images)
  end

  def show
    @assignable_pieces = Piece.all.select { |p| !@image.pieces.include?(p) }
    respond_with(@image)
  end

  def new
    @image = Image.new
    respond_with(@image)
  end

  def edit
  end

  def create
    @image = Image.new(image_params)
    @image.save
    respond_with(@image)
  end

  def update
    @image.update(image_params)
    respond_with(@image)
  end

  def destroy
    @image.destroy
    respond_with(@image)
  end

  def direct
    redirect_to @image.content.url
  end

  def assign_piece
    piece = Piece.find(params[:piece_id])

    @image.pieces << piece
    @image.save

    redirect_to image_path(@image), flash: {success: 'The image is now assigned to the piece. '}
  end

  def unassign_piece
    piece = @image.pieces.find(params[:piece_id])

    if piece
      @image.pieces.delete(piece)
      redirect_to image_path(@image), flash: {success: 'The image is no longer assigned to the piece. '}
    else
      redirect_to image_path(@image), flash: {error: 'The image is not assigned to the piece in the first place. '}
    end
  end

  private
    def set_image
      @image = Image.find(params[:id])
    end

    def image_params
      params.require(:image).permit(:caption, :attribution, :content, :creation_piece_id, :section_id)
    end
end
