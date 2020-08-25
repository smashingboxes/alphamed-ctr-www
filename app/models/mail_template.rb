# frozen_string_literal: true

class MailTemplate
  FORM_TYPES = [
    "Co-Author Form Request", "Accepted", "Rejected", "Reset Password", "Revision",
    "Notify Admin of Decision", "Notify Admin of New Submission"
  ].freeze

  include Mongoid::Document
  include Mongoid::Timestamps

  field :subject
  field :content
  field :text_content
  field :type

  validates :type, inclusion: { in: FORM_TYPES }
  validate :single_template_types, on: :create

  private

  def single_template_types
    FORM_TYPES.each do |ft|
      if type == ft && MailTemplate.where(type: ft).count == 1
        errors.add(:type, "cannot be '#{ft}' because an email template for that action already" \
          " exists. Please edit the existing template.")
      end
    end
  end
end
