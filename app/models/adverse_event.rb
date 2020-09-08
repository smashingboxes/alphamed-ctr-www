# frozen_string_literal: true

class AdverseEvent
  include Singleton

  DATA = YAML.load_file(Rails.root.join("config", "adverse_events.yml")).freeze
  DATA_BY_ID = DATA.map { |data| [data[:id], data] }.to_h.freeze
  DATA_BY_CATEGORY_ID = DATA.group_by { |data| data[:category_id] }.freeze
  DATA_BY_VERSION = DATA.group_by { |data| Category.find(data[:category_id]).version }.freeze

  def self.Data
    DATA
  end

  def find(id)
    DATA_BY_ID[id.to_i]
  end

  def by_category(category_id)
    DATA_BY_CATEGORY_ID[category_id]
  end

  def by_version(version)
    DATA_BY_VERSION[version]
  end
end
