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

  has_attached_file :content, :styles => { :medium => "400x400>" }, :default_url => "/images/:style/default.gif"
  validates_attachment_content_type :content, :content_type => /\Aimage\/.*\Z/
  validates :content, presence: true

  private
end
