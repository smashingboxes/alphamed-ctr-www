class Api::RegistrationsController < ActionController::Base
  skip_before_action :verify_authenticity_token, only: [:create]

  respond_to :json
  def create

    if params[:user][:password] != params[:user][:password_confirmation]
      render json: {password: ["does not match."]}, status: 422
    else
      user = User.new(user_params)
      if user.save
        render json: user.as_json(auth_token: user.authentication_token, email: user.email), status: 201
        return
      else
        warden.custom_failure!
        render json: user.errors, status: 422
      end
    end
  end

  private
    def user_params
      params.require(:user).permit(:email, :name, :password, :password_confirmation, :salt, :encrypted_password)
    end
end