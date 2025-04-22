# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end

User.find_or_create_by!(email: "admin@example.com") do |user|
  user.password = "password"
  user.password_confirmation = "password"
  user.role = 0
  user.balance_points = 1000
end

User.find_or_create_by!(email: "user@example.com") do |user|
  user.password = "password"
  user.password_confirmation = "password"
  user.role = 1
  user.balance_points = 100
end

# Gift card rewards seed
[5, 10, 15, 20, 25, 30, 40, 50, 75, 100].each_with_index do |value, i|
  Reward.find_or_create_by!(title: "Gift Card $#{value}") do |reward|
    reward.description = "A $#{value} gift card redeemable at participating stores."
    reward.value_per_unit = value
    reward.quantity = 100 - i * 5
  end
end
