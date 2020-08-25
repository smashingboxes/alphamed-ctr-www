class Api::MailTemplatesController < ApplicationController
  skip_before_action :verify_authenticity_token

  def index
    @page = params[:page] || 1
    @limit = params[:per_page] || 10

    @mail_templates = MailTemplate.all.page(@page).limit(@limit)

    render json: @mail_templates, status: 201
  end
end