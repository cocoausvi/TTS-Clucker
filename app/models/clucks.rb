class Clucks
  include Mongoid::Document
  field :user_id, type: String
  field :user_name, type: String
  field :text, type: String
  field :post_date, type: DateTime

  validates :text, presence: true
end