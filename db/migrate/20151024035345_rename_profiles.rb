class RenameProfiles < ActiveRecord::Migration
	def self.up
    	rename_table :profiles, :users
  	end
 	# def self.down
  #   	rename_table :users, :profiles
 	# end
end
