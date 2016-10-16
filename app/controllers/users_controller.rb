class UsersController < ApplicationController
  def index
    name = params[:user_name]
    @users = User.where('name LIKE ?',"%#{name}%" )
    respond_to do |format|
      format.json
    end
  end
end
