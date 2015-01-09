# Schema information
#
# table: images
#
# caption			text
# attribution		text
# created_at		datetime
# updated_at 		datetime

class Image < ActiveRecord::Base
  has_and_belongs_to_many :users
  has_and_belongs_to_many :pieces

  belongs_to :piece
  belongs_to :section

  has_attached_file :content, :styles => { :medium => "400x400>" }, :default_url => "/images/:style/default.gif"
  validates_attachment_content_type :content, :content_type => /\Aimage\/.*\Z/

  after_create :assign_creation_piece

  # This is a virtual attribute identifying the piece that the image is assigned to upon creation. Removing/assigning new pieces after creation should be handled through association object directly.
  attr_accessor :creation_piece_id

  private
    def assign_creation_piece
      unless self.creation_piece_id.blank?
        self.pieces << Piece.find(self.creation_piece_id)
        self.section = nil
      else
        self.pieces.create
      end
    end
end
