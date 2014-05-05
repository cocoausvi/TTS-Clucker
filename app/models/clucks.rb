class Clucks
  include Mongoid::Document
  field :userID, type: String
  field :user_name, type: String
  field :body, type: String
  field :posted_date, type: Date

  validates :body, presence: true
end