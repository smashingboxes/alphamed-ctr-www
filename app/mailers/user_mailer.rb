# frozen_string_literal: true

class UserMailer
  def self.send_form_request(result, author, token = nil, actor = nil)
    template = MailTemplate.where(type: "Co-Author Form Request").first
    view = { last_name: author["last_name"], author_name: result.author_name,
             title: result.title, link: "#{result.domain}/go/#{token}" }

    subject = Mustache.render(template.subject, view)
    html = Mustache.render(template.content, view)
    text = Mustache.render(template.text_content, view)

    send([author["email"]], nil, nil, subject, html, text, result, actor, "Co-Author Form Request")
  end

  # to, cc, bcc: Arrays of recipients
  # subject: string
  # html: string of html text
  # text: text alternative for email clients that don't support html
  # result: adds a new email activity to this result
  # actor: person responsible for triggering this email
  # template: logs which email template was used
  # rubocop:disable Naming/UncommunicativeMethodParamName
  def self.send(to, cc, bcc, subject, html, text = "", result = nil, actor = nil, template = nil)
    data = Hash.new { |h, k| h[k] = [] }
    reply_to_email="editorialoffice@ctr.theoncologist.com"
    reply_to_email="sample@email.com"
    # data[:from] = Settings.from_email
    data[:from] = "THE ONCOLOGIST Clinical Trial Results <#{reply_to_email}>"
    # data["h:Reply-To"] = Settings.admin_email
    data["h:Reply-To"] = "#{reply_to_email}"
    # if Settings.intercept_email
    # if "ctr-staging@smashingboxes.com"
    #   # data[:to] = Settings.intercept_email
    #   data[:to] = "ctr-staging@smashingboxes.com"
    #   recipients = []
    #   recipients << "To: #{to.to_sentence}" if to
    #   recipients << "CC: #{cc.to_sentence}" if cc
    #   recipients << "BCC: #{bcc.to_sentence}" if bcc
    #   data[:subject] = "[#{recipients.to_sentence}] " + subject
    # else
      data[:to] = to.join(", ") if to.present?
      data[:cc] = cc.join(", ") if cc.present?
      data[:bcc] = bcc.join(", ") if bcc.present?
      data[:subject] = subject
    # end
    fs = Rails::Html::FullSanitizer.new
    data[:html] = html.empty? ? " " : html
    data[:text] = text.empty? ? fs.sanitize(data[:html]) : text
    if result
      attrs = { key: "email", email_template: template }
      %w[from to subject html text].each do |t|
        attrs["email_#{t}".to_sym] = data[t.to_sym]
      end
      if actor
        attrs[:user_id] = actor.id
        attrs[:user_name] = actor.name
      end
      result.activities.create(attrs)
    end
    # RestClient.post(Settings.mailgun_api_url, data)
    RestClient.post("https://api:key-7q13705llt7dzaknps6qxp1ca-tujv02@api.mailgun.net/v2/ctr.theoncologist.com/messages", data)
  end
  # rubocop:enable Naming/UncommunicativeMethodParamName

  def self.send_template(to, template_name, view)
    template = MailTemplate.where(type: template_name).first
    if template
      Rails.logger.fatal template.inspect
      subject = Mustache.render(template.subject, view)
      html = Mustache.render(template.content, view)
      text = Mustache.render(template.text_content, view)
      send(to, nil, nil, subject, html, text)
    else
      Rails.logger.fatal "Template #{template_name} not found"
    end
  end
end
