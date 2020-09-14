# frozen_string_literal: true

module DateHelper
  def summary_date(result, params)
    case result.state
    when "published"
      "First Published Online #{display_date(result, true, "published", params)}"
    else
      "First Submitted Online #{display_date(result, true, "submitted", params)}"
    end
  end

  def display_date(result, full = false, state = "started", params)
    date_format = full ? "%B %d, %Y" : "%x"
    if params[:state].present?
      key = result.state_history.select { |h| h.key?(params[:state]) }.last
      if current_user.is_a?(Admin) && key
        key[state].try(:strftime, date_format)
      else
        key = result.state_history.select { |h| h.key?("submitted") }.last
        if %w[submitted in_review revision].include?(state) && key
          key["submitted"].try(:strftime, date_format)
        else
          "Unknown"
        end
      end
    elsif params[:context] == "editorial"
      if params[:edit] == "publication"
        result.state.to_s.capitalize
      else
        state_date(result, "submitted", date_format)
      end
    elsif params[:context] == "review"
      state_date(result, "submitted", date_format)
    elsif params[:context] == "search"
      state_date(result, "published", date_format)
    else
      state_date(result, state, date_format)
    end
  end

  def state_date(result, state, date_format)
    date = result.state_history.select { |h| h.key?(state) }.first
    if date
      date[state].try(:strftime, date_format)
    else
      "Unknown"
    end
  end
end
