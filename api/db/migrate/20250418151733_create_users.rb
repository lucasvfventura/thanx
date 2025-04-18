class CreateUsers < ActiveRecord::Migration[8.0]
  def change
    create_table :users do |t|
      t.string :email
      t.string :password_digest
      t.integer :role, default: 1, null: false, comment: "0=admin, 1=user"
      t.integer :balance_points, default: 0, null: false
      t.check_constraint "balance_points >= 0", name: "balance_points_nonnegative"

      t.timestamps
    end
  end
end
