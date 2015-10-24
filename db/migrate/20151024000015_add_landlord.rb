class AddLandlord < ActiveRecord::Migration
  def change
  	create_table :Landlord do |t|
      t.string :email
      t.string :password
      t.string :university
      t.integer :house_num
      t.string :house_street
      t.integer :house_zip
      t.string :city
      t.string :state
    end
  end
end
