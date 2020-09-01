class CommentsController < ApplicationController
  before_action :set_comment, only: [:show, :edit, :update, :destroy]
  skip_before_action :verify_authenticity_token

  # GET /comments
  # GET /comments.json
  def index
    @comments = Comment.all
  end

  # GET /comments/1
  # GET /comments/1.json
  def show
  end

  # GET /comments/new
  def new
    @comment = Comment.new
  end

  # GET /comments/1/edit
  def edit
  end

  def create
    @user=User.find_for_database_authentication(authentication_token: params[:auth_token])
    @result=Result.find(params[:result_id])
    @comment=@result.comments.new(comment_params)
    @comment.user=@user


    if @comment.save!
      render json:{comment: @comment.to_json},status: 201
    else
      render json:{message:@comment.errors},status: 422
    end
  end

  def update
    if @comment
      if @comment.update(comment_params)
        render json:{comment: @comment.to_json},status: 201
      else
        render json:{message:@comment.errors},status: 422
      end
    else
      render json:{message:"Comment not found"},status:422
    end
  end

  # DELETE /comments/1
  # DELETE /comments/1.json
  def destroy
    @comment.destroy
    respond_to do |format|
      format.html { redirect_to comments_url, notice: 'Comment was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_comment
      @result = Result.find(params[:result_id])
      if @result
        @comment = @result.comments.find(params[:comment_id])
      else
        render json:{message:"CTR not found."},status:402
      end
    end

    # Only allow a list of trusted parameters through.
    def comment_params
      params.require(:comment).permit(:content, :step)
    end
end
