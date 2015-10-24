class CreateProfiles < ActiveRecord::Migration
  def change
  	create_table :profiles do |t|
      t.string :name
      t.string :type
      t.string :email
      t.integer :house_id
      t.string :password
  end
  end
end
