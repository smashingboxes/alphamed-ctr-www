# frozen_string_literal: true

class CoauthorEmailer
  @queue = :coauthors_queue
  def self.perform(result_id, author = nil, actor_id = nil, suppress_email = nil)
    result = Result.find(result_id)
    return unless result

    actor = actor_id ? User.find(actor_id) : nil
    if author
      # only sending to a single author
      request_forms(result, author, actor, suppress_email)
    else
      # send forms to all authors
      result.coauthors.each do |ca|
        unless ca["email"] == result.author_email
          request_forms(result, ca, actor, suppress_email)
        end
      end
    end
    result.save
  end

  # Create and send an email with a link to fill out forms
  def self.request_forms(result, author, actor, suppress_email)
    # Create user
    user = User.find_or_create_by(email: author["email"].downcase)
    user.save!(validate: false)

    # Create login link
    options = { message: "Please complete all required forms." }
    options[:role] = "coauthor"
    options[:url] = result.domain + "/forms/results"
    token = user.login_links.create(options).token

    if suppress_email.nil?
      UserMailer.send_form_request(result, author, token, actor)
    end

    # Create forms
    result.create_forms_for
  end
end
