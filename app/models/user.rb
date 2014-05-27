class User
  include Mongoid::Document
  field :first, type: String
  field :last, type: String
  field :email, type: String
  field :password, type: String

  validates :email, presence: true, uniqueness: true
  validates :password, presence: true
end