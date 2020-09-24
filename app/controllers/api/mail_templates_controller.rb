class Api::MailTemplatesController < ApplicationController
  skip_before_action :verify_authenticity_token

  def index
    @page = params[:page] || 1
    @limit = params[:per_page] || 10

    @mail_templates = MailTemplate.all.page(@page).limit(@limit)

    render json: @mail_templates, status: 201
  end

  def create
    if params[:mail_template]
      @mail_template = MailTemplate.new(mail_params)
      if MailTemplate.duplicate_type?(params[:mail_template][:type])
        render json: {message: "Mail Template Type already exists."}, status: 422
      else
        if @mail_template.save
          render json: @mail_template, status: 201
        else
          render json: {message: @mail_template.errors}, status: 422
        end
      end
    else
      render json: {message: "Mail Template parameter is missing."}, status: 422
    end
  end

  def update
    if params[:mail_template_id]
      if @mail_template = MailTemplate.find_by(id: BSON::ObjectId(params[:mail_template_id]))
        if @mail_template.update_attributes(mail_params)
          render json: @mail_template, status: 201
        else
          render json: {message: @mail_template.errors}, status: 422
        end
      else
        render json: {message: "Mail Template does not exist."}, status: 422
      end
    else
      render json: {message: "Mail Template ID parameter is missing."}
    end
  end

  def destroy
    if params[:mail_template_id]
      if @mail_template = MailTemplate.find_by(id: BSON::ObjectId(params[:mail_template_id]))
        if @mail_template.destroy
          render json: {message: "Successfully deleted Mail Template."}, status: 201
        else
          render json: {message: @mail_template.errors}, status: 422
        end
      else
        render json: {message: "Mail Template does not exist."}, status: 422
      end
    else
      render json: {message: "Mail Template ID parameter is missing."}
    end
  end

  def send_email
    mt = MailTemplate.find_by(id: params[:mail_template_id])
    @user = User.find_by(id: params[:user_id])
    UserMailer.send([@user.email], nil, nil, "#{mt.subject}", mt.content)
    flash[:notice] = "Delivered test email to #{@user.email}."
    # redirect_to mail_templates_url
    render json: {message: "Successfully sent email to #{@user.name}."}, status: 201
  end

  private
    def mail_params()
      params.require(:mail_template).permit(:subject, :content, :text_content, :type)
    end
end