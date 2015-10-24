class AddUniversityTable < ActiveRecord::Migration
  def change
  	create_table :university do |t|
  	 t.string :name
  	end
  end
end
