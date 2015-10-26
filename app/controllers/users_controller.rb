class UsersController < ApplicationController
  include SessionsHelper
  # before_action :all_users, only: [:index, :create]
  respond_to :html, :js
	def new
		@user = User.new
	end

	def create
    	@user = User.new(user_params)
    	if @user.save
      		flash[:success] = "Welcome!"
      		redirect_to @user
    	else
      		render 'new'
    	end
  end

	def show
		@user = User.find(params[:id])
	end

	def edit
    @user = User.find(params[:id])
  end

  def destroy
    @user.destroy
  end

  def add_house
    @user = User.find(params[:id])
  end




  	private
      def all_users
        @user = User.all
      end
      def user_params
        params.require(:user).permit(:name, :email, :password, :user_type)
      end

end
