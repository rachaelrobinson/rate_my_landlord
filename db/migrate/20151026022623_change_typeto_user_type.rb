class ChangeTypetoUserType < ActiveRecord::Migration
  def change
  	remove_column :users, :type
  	add_column :users, :user_type, :string
  end
end
