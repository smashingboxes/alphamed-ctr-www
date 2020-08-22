class Email
  include Mongoid::Document

  embedded_in :result

  field :body
  field :body_text
  field :date, type: DateTime
  field :from, type: Array
  field :headers
  field :subject
  field :mail_template
  field :to, type: Array
end
