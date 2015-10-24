class AddUniversityToUser < ActiveRecord::Migration
  def change
  	add_column :user, :university, :string
  end
end
 