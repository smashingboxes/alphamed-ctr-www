# frozen_string_literal: true

module Nameable
  def full_name
    [first_name, middle_name, last_name].map(&:presence).compact.join(" ").presence
  end

  def display_name
    full_name || email
  end
end
