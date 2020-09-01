class Devise::RegistrationsController < ActionController::Base
  skip_before_action :verify_authenticity_token, only: [:create]

  respond_to :json
  def create

    if params[:user][:password] != params[:user][:password_confirmation]
      render json: {password: ["does not match."]}, status: 422
    elsif User.email_duplicate? params[:user][:email]
        render json: {message: "Email already exists."}, status: 422
    else
      user = User.new(user_params)
      if user.save!
        render json: user, status: 201
        return
      else
        warden.custom_failure!
        render json: user.errors, status: 422
      end
    end
  end

  private
    def user_params
      params.require(:user).permit(:email, :first_name, :last_name, :password, :password_confirmation, :salt, :encrypted_password)
    end
end