class ResultsController < ApplicationController

  def index
    @role = current_user ? current_user[:role] : "guest"
    @regulars = User.regular
    @admins = User.admin
    @editors = User.editor
    @co_authors = User.co_author
  end
end
