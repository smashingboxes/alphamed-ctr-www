class Api::UsersController < ApplicationController
  skip_before_action :verify_authenticity_token, only: [:update]

  respond_to :json
  def update
    if @user = User.find_for_database_authentication(authentication_token: params[:user][:authentication_token])
      has_changes = false
      if params[:user][:password]
        if message = User.validate_password(params[:user])
          render json: {password: [message]}, status: 422
        else
          @user.password = params[:user][:password]
          has_changes = true
        end
      end

      if params[:user][:email]
        if @user.email_exists? params[:user][:email]
          render json: {message: "Email already exists."}, status: 422
        else
          @user.email = params[:user][:email]
          has_changes = true
        end
      end
      if params[:user][:name]
        if @user.name_exists? params[:user][:name]
          render json: {message: "Name already exists."}, status: 422
        else
          @user.name = params[:user][:name]
          has_changes = true
        end
      end

      if has_changes
        if @user.save
          render json: @user.as_json(auth_token: @user.authentication_token, email: @user.email, name: @user.name), status: 201
        else
          render json: @user.errors, status: 422
        end
      end
    else
      render json: {message: "Invalid authentication token"}, status: 422
    end
  end

  private
    def user_params
      params.require(:user).permit(:email, :name, :password, :password_confirmation, :salt, :encrypted_password)
    end
end
