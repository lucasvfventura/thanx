class CreateRewards < ActiveRecord::Migration[8.0]
  def change
    create_table :rewards do |t|
      t.string :title
      t.text :description
      t.integer :value_per_unit, null: false
      t.integer :quantity, default: 0, null: false
      t.check_constraint "value_per_unit > 0", name: "value_per_unit_positive"
      t.check_constraint "quantity >= 0", name: "quantity_nonnegative"

      t.timestamps
    end
  end
end
