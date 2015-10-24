class UsersController < ApplicationController
	def new
		# if current_user.profile
		# 	redirect_to profile_path(current_user.profile)
		# end
		# unsure of what this does...
		@user = User.new
	end

	def create
		@user = User.new(params[:user])
		@user.user = current_user
		if @user.save
			flash[:success] = "Profile Created"
			redirect_to @user
		else
			render 'new'
		end
	end

	# def profile_params
	# 	params.require(:profile).permit(:description, :pic)
	# end

end
