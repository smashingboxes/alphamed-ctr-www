class Api::ResultsController < ApplicationController
  skip_before_action :verify_authenticity_token, only: [:update]

  def overview
    #fetch result via result_id
    if @user = User.find_for_database_authentication(authentication_token: params[:auth_token])
      # @result = Result.find_by(id:params[:result_id]) || @user.current_result || Result.new
      @result = Result.find_by(id:params[:result_id]) || Result.new
      render json: @result.overview_json, status: 201
    else
      render json: {message: "Invalid authentication token"}, status: 422
    end
  end

  def your_information
    if @user = User.find_for_database_authentication(authentication_token: params[:auth_token])
      @result = Result.find_by(id:params[:result_id]) || Result.new
      render json: @result.your_information_json, status: 201
    else
      render json: {message: "Invalid authentication token"}, status: 422
    end
  end

  def author_summary
    if @user = User.find_for_database_authentication(authentication_token: params[:auth_token])
      @result = Result.find_by(id:params[:result_id]) || Result.new
      render json: @result.author_summary_json, status: 201
    else
      render json: {message: "Invalid authentication token"}, status: 422
    end
  end

  def trial_information
    if @user = User.find_for_database_authentication(authentication_token: params[:auth_token])
      @result = Result.find_by(id:params[:result_id]) || Result.new
      render json: @result.trial_information_json, status: 201
    else
      render json: {message: "Invalid authentication token"}, status: 422
    end
  end

  def coauthor_information
    if @user = User.find_for_database_authentication(authentication_token: params[:auth_token])
      @result = Result.find_by(id:params[:result_id]) || Result.new
      render json: @result.coauthor_information_json, status: 201
    else
      render json: {message: "Invalid authentication token"}, status: 422
    end
  end

  def drug_information
    if @user = User.find_for_database_authentication(authentication_token: params[:auth_token])
      @result = Result.find_by(id:params[:result_id]) || Result.new
      render json: @result.drug_information_json, status: 201
    else
      render json: {message: "Invalid authentication token"}, status: 422
    end
  end

  def get_trial_information_lists
    render json: Result.trial_information_constants_json, status: 201
  end

  def update
    if params[:result]
      if @user = User.find_for_database_authentication(authentication_token: params[:authentication_token])
        #params[:section] = overview || information || co_author information || author_summary
        @section = params[:section]
        @result = Result.find_by(id:params[:result_id]) || @user.current_result || @user.results.new
        if @section == "overview"
          @result.set_overview(params[:result])
        elsif @section == "your_information"
          @result.set_your_information(params[:result])
        elsif @section == "author_summary"
          @result.set_author_summary(params[:result])
        elsif @section == "trial_information"
          @result.set_trial_information(params[:result])
        elsif @section == "coauthor_information"
          @result.set_coauthor_information(params[:result])
          User.create_coauthors(params[:result][:users]) if params[:result][:users]
        elsif @section == "drug_information"
          @result.set_drug_information(params[:result])
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