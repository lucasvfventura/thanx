class User < ApplicationRecord
  has_secure_password

  enum role: { admin: 0, user: 1 }, _default: :user

  validates :email, presence: true, uniqueness: true
  validates :balance_points, numericality: { greater_than_or_equal_to: 0, only_integer: true }
end
