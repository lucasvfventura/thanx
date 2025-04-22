class User < ApplicationRecord
  has_secure_password

  has_many :redemptions, dependent: :destroy

  validates :email, presence: true, uniqueness: true
  validates :balance_points, numericality: { greater_than_or_equal_to: 0, only_integer: true }

  # Returns true if the user is an admin
  def admin?
    role == 0
  end
end
