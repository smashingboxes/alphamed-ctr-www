class Devise::SessionsController < DeviseController
  # prepend_before_action  :require_no_authentication, only: [:create ]
  skip_before_action :verify_authenticity_token, only: [:create]
  
  before_action :ensure_params_exist

  respond_to :json
  
  def create
    # build_resource
    resource = User.find_for_database_authentication(:email=>params[:user_login][:email])
    return invalid_login_attempt unless resource

    if resource.valid_password?(params[:user_login][:password])
      sign_in("user", resource)
      resource.generate_token
      resource.save
      resource.reload
      # render :json=> {:success=>true, :auth_token=>resource.authentication_token, :email=>resource.email}, status: 201
      render json: resource, status: 201
      return
    end
    invalid_login_attempt
  end
  
  def destroy
    sign_out(resource_name)
  end

  protected
  def ensure_params_exist
    return unless params[:user_login].blank?
    render :json=>{:success=>false, :message=>"missing user_login parameter"}, :status=>422
  end

  def invalid_login_attempt
    warden.custom_failure!
    render :json=> {:success=>false, :message=>"Error with your login or password"}, :status=>401
  end
end