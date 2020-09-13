# frozen_string_literal: true

class Activity
  include Mongoid::Document
  include Mongoid::Timestamps::Created::Short # For c_at only.
  embedded_in :result

  field :key
  field :user_id
  field :user_name

  # State change
  field :state

  # Tracked change
  field :change_original
  field :change_modified
  field :change_modifier_id
  field :change_modifier_name

  # Email
  field :email_from
  field :email_to
  field :email_subject
  field :email_html
  field :email_text
  field :email_template

  # Form
  field :form_id
  field :form_type
  field :form_signer_id
  field :form_signer_name

  KEY_TYPES = %w[state change email form].freeze
end
