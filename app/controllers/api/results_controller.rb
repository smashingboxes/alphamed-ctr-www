class Api::ResultsController < ApplicationController
  skip_before_action :verify_authenticity_token

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

  def patient_characteristics
    if @user = User.find_for_database_authentication(authentication_token: params[:auth_token])
      @result = Result.find_by(id:params[:result_id]) || Result.new
      render json: @result.patient_characteristics_json, status: 201
    else
      render json: {message: "Invalid authentication token"}, status: 422
    end
  end

  def pharmacokinetics_pharmacodynamics
    if @user = User.find_for_database_authentication(authentication_token: params[:auth_token])
      @result = Result.find_by(id:params[:result_id]) || Result.new
      render json: @result.pharmacokinetics_pharmacodynamics_json, status: 201
    else
      render json: {message: "Invalid authentication token"}, status: 422
    end
  end

  def adverse_events
    if @user = User.find_for_database_authentication(authentication_token: params[:auth_token])
      @result = Result.find_by(id:params[:result_id]) || Result.new
      render json: @result.adverse_events_json, status: 201
    else
      render json: {message: "Invalid authentication token"}, status: 422
    end
  end

  def primary_assessment_method
    if @user = User.find_for_database_authentication(authentication_token: params[:auth_token])
      @result = Result.find_by(id:params[:result_id]) || Result.new
      render json: @result.primary_assessment_method_json, status: 201
    else
      render json: {message: "Invalid authentication token"}, status: 422
    end
  end

  def assessment_analysis_discussion
    if @user = User.find_for_database_authentication(authentication_token: params[:auth_token])
      @result = Result.find_by(id:params[:result_id]) || Result.new
      render json: @result.assessment_analysis_discussion_json, status: 201
    else
      render json: {message: "Invalid authentication token"}, status: 422
    end
  end

  def figures_tables
    if @user = User.find_for_database_authentication(authentication_token: params[:auth_token])
      @result = Result.find_by(id:params[:result_id]) || Result.new
      render json: @result.figures_tables_json, status: 201
    else
      render json: {message: "Invalid authentication token"}, status: 422
    end
  end

  def author_forms
    if @user = User.find_for_database_authentication(authentication_token: params[:auth_token])
      @result = Result.find_by(id:params[:result_id]) || Result.new
      render json: @result.author_forms_json, status: 201
    else
      render json: {message: "Invalid authentication token"}, status: 422
    end
  end

  def submission_overview
    if @user = User.find_for_database_authentication(authentication_token: params[:auth_token])
      @result = Result.find_by(id:params[:result_id]) || Result.new
      render json: @result.submission_overview_json(params), status: 201
    else
      render json: {message: "Invalid authentication token"}, status: 422
    end
  end

  def disclosure
    @result=Result.find_by(id:params[:result_id]) || Result.new
    @disclosure=@result.forms.find_by(id:params[:form_id]) || @result.forms.new
    render json: @disclosure.disclosure_json, status:201
  end

  def disclosure_forms
    if @result=Result.find_by(id:params[:result_id]) || Result.new
      @disclosures=@result.forms.map{|f|f.disclosure_form_json}
      render json:{disclosures:@disclosures}, status:201
    else
      render json: {message: "CTR not found."}, status: 422
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
        @result = Result.find_by(id:params[:result_id]) || @user.results.new
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
        elsif @section == "patient_characteristics"
          @result.set_patient_characteristics(params[:result])
        elsif @section == "pharmacokinetics_pharmacodynamics"
          @result.set_pharmacokinetics_pharmacodynamics(params[:result])
        elsif @section == "adverse_events"
          @result.set_adverse_events(params[:result])
        elsif @section == "primary_assessment_method"
          @result.set_primary_assessment_method(params[:result])
        elsif @section == "assessment_analysis_discussion"
          @result.set_assessment_analysis_discussion(params[:result])
        elsif @section =="figures_tables"
          @result.set_figures_tables(params[:result])
        end
        if @result.save!
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

  def update_disclosure
    @result=Result.find_by(id:params[:result_id]) || Result.new
    @disclosure=@result.forms.find_by(id:params[:form_id]) || @result.forms.new
    @disclosure.set_disclosure(params[:disclosure])
    if @disclosure.save
      render json: @disclosure, status: 201
    else
      render json: {message: "Something went wrong when saving Disclosure"}, status: 422
    end
  end

  def send_coauthor_forms
    if @user = User.find_for_database_authentication(authentication_token: params[:auth_token])
      if @result=Result.find_by(id:params[:result_id])
        @result.generate_coauthor_forms(@user.id)
        render json:{message:"Co-author email sent."}, status:422
      else
        render json: {message: "CTR not found."}, status: 422
      end
    else
      render json: {message: "Invalid authentication token"}, status: 422
    end
  end

  def destroy
    @result = Result.find_by(id:params[:id])
    if @result.destroy
      render json: {message: "Successfully deleted CTR."}, status: 201
    else
      render json: @result.errors, status: 422
    end
  end

  def submit
    if @result = Result.find_by(id:params[:result_id])
      @result.submit_result
      if @result.save
        render json: {message: "Successfully submitted CTR."}, status: 201
      else
        render json: @result.errors, status: 422
      end
    else
        render json: {message: "CTR not found."}, status: 422
    end
  end

  def in_review
    if @result = Result.find_by(id:params[:result_id])
      @result.set_in_review
      if @result.save
        render json: {message: "CTR is now in review."}, status: 201
      else
        render json: @result.errors, status: 422
      end
    else
        render json: {message: "CTR not found."}, status: 422
    end
  end

  def revision
    if @result = Result.find_by(id:params[:result_id])
      @result.set_revision
      if @result.save
        render json: {message: "CTR successfully submitted for revision."}, status: 201
      else
        render json: @result.errors, status: 422
      end
    else
        render json: {message: "CTR not found."}, status: 422
    end
  end

  def accepted
    if @result = Result.find_by(id:params[:result_id])
      @result.set_accepted
      if @result.save
        render json: {message: "Successfully accepted CTR."}, status: 201
      else
        render json: @result.errors, status: 422
      end
    else
        render json: {message: "CTR not found."}, status: 422
    end
  end

  def rejected
    if @result = Result.find_by(id:params[:result_id])
      @result.set_rejected
      if @result.save
        render json: {message: "Successfully rejected CTR."}, status: 201
      else
        render json: @result.errors, status: 422
      end
    else
        render json: {message: "CTR not found."}, status: 422
    end
  end

  def publish
    if @result = Result.find_by(id:params[:result_id])
      @result.set_publish
      if @result.save
        render json: {message: "Successfully published CTR."}, status: 201
      else
        render json: @result.errors, status: 422
      end
    else
        render json: {message: "CTR not found."}, status: 422
    end
  end

  def activity_logs
    if @result = Result.find_by(id:params[:result_id])
      render json: @result.activity_logs, status: 201
    else
      render json: {message: "CTR not found."}, status: 422
    end
  end

  def word_export
    if @result = Result.find_by(id:params[:result_id])
      @exporting = true
      content = render_to_string(template: "results/docx_html", :locals => {:result => @result})
      path = "#{Rails.root}/tmp/#{@result.slug}"
      html = File.open(path + ".html", "w")
      html.puts content
      html.close
      pandoc_success = system "pandoc -f html -t docx -o #{path}.docx #{path}.html" \
                              " --data-dir=/app/.apt/usr/share/pandoc/data/"
      Rails.logger.warn "Pandoc generation failed" unless pandoc_success
      send_file File.join(path + ".docx"), disposition: "attachment"
    else
      render json: {message: "CTR not found."}, status: 422
    end
  end

  def comments
    if @result = Result.find_by(id:params[:result_id])
      @comments=@result.comments.where(step:params[:step]).order(:created_at=>:asc).map{|c|c.to_json}
      render json: {comments:@comments}, status:201
    else
      render json: {message: "CTR not found."}, status: 422
    end
  end

  def search
    @page=params[:page] || 1
    @page=@page.to_i - 1 >=0 ? @page.to_i - 1 : 0
    @limit=params[:per_page] || 10
    @search=params[:query]

    @results=Result.all
    @results=@results.fulltext_search(@search, :index => /ctr\d+-\d+/i.match?(@search) ? 'ctr_number_index' : 'fulltext_index')
    @results=@results[@page, @limit]
    @results=@results.map{|r|
      @date = r.state_history.select { |h| h.key?("submitted") }.last
      @date=@date.present? ? @date[:submitted].try(:strftime, "%m/%d/%y") : "N/A"
      {
        title:"#{r.title}(#{r.ctr_number})",
        authors:r.author_array,
        submitted:@date
      }
    }

    respond_to do |format|
      format.json { render json: @results }
      format.html
    end
  end
end