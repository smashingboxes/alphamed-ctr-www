class ResultsController < ApplicationController
  before_action :set_result, only: [:show, :edit, :update, :destroy]
  skip_before_action :verify_authenticity_token

  # GET /results
  # GET /results.json
  def index
    # @results = Result.all
    if @user = User.find_by(authentication_token: params[:auth_token])

      # @role = @user.role
      @results = @user.fetch_results(params[:state])
      @page=params[:page] || 1
      @limit=params[:per_page] || 10

      @results = @results.page(@page).limit(@limit)

      respond_to do |format|
        format.json { render json: @results }
        format.html
      end
    else
      respond_to do |format|
        format.json { render json: @results }
        format.html
      end
    end   
  end

  # GET /results/1
  # GET /results/1.json
  def show
  end

  # GET /results/new
  def new
    @result = Result.new
  end

  # GET /results/1/edit
  def edit
  end

  # POST /results
  # POST /results.json
  def create
    @result = Result.new(result_params)

    respond_to do |format|
      if @result.save
        format.html { redirect_to @result, notice: 'Result was successfully created.' }
        format.json { render :show, status: :created, location: @result }
      else
        format.html { render :new }
        format.json { render json: @result.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /results/1
  # PATCH/PUT /results/1.json
  def update
    respond_to do |format|
      if @result.update(result_params)
        format.html { redirect_to @result, notice: 'Result was successfully updated.' }
        format.json { render :show, status: :ok, location: @result }
      else
        format.html { render :edit }
        format.json { render json: @result.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /results/1
  # DELETE /results/1.json
  def destroy
    if @result
      @result.destroy
      respond_to do |format|
        format.html { redirect_to results_url, notice: 'Result was successfully destroyed.' }
        format.json { head :no_content }
      end
    else
      render json: {message:"CTR not found."}, status: 401
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_result
      @result = Result.find_by(id:params[:id])
    end

    # Only allow a list of trusted parameters through.
    def result_params
      params.fetch(:result, {})
    end
end
