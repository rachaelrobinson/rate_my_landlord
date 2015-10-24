class AddHouse < ActiveRecord::Migration
  def change
    create_table :house do |t|
  	 t.integer :house_num
  	 t.string :street
  	 t.string :city
  	 t.string :state
  	 t.integer :zip
  	 t.string :university
  	end
  end
end
