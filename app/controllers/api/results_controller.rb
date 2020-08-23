class Api::ResultsController < ApplicationController
  skip_before_action :verify_authenticity_token, only: [:update]

  def overview
    if @user = User.find_for_database_authentication(authentication_token: params[:auth_token])
      @result = @user.current_result || Result.new
      render json: @result.overview_json, status: 201
    else
      render json: {message: "Invalid authentication token"}, status: 422
    end
  end

  def update
    if params[:result]
      if @user = User.find_for_database_authentication(authentication_token: params[:authentication_token])
        #params[:section] = overview || information || co_author information || author_summary
        @section = params[:section]
        @result = @user.current_result || @user.results.new
        if @section == "overview"
          @result.set_overview(params[:result])
        end
        if @result.save
          render json: @result, status: 201
        else
          render json: {message: "Something went wrong when saving CTR"}, status: 422
        end
      else
        render json: {message: "Invalid authentication token"}, status: 422
      end
    else
      render json: {message: "Result parameter is missing."}, status: 422
    end
  end
end