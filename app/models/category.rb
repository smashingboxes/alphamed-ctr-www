# frozen_string_literal: true

class Category
  attr_reader :id, :version, :name

  DATA = YAML.load_file(Rails.root.join("config", "categories.yml")).freeze
  DATA_BY_ID = DATA.map { |data| [data[:id], data] }.to_h.freeze
  DATA_BY_VERSION = DATA.group_by { |data| data[:version] }.freeze

  def initialize(args = nil)
    return if args.nil?

    @id = args[:id]
    @version = args[:version]
    @name = args[:name]
  end

  def self.Data
    DATA
  end

  def adverse_events
    AdverseEvent.instance.by_category(id)
  end

  def field_data
    {
      label: name,
      options: adverse_events.map do |adverse_event|
        {
          value: adverse_event[:id],
          label: adverse_event[:name]
        }
      end
    }
  end

  def self.find(id)
    new(DATA_BY_ID[id])
  end

  def self.by_version(version)
    DATA_BY_VERSION[version].map { |data| new(data) }
  end

  def self.all_field_data
    [
      Category.by_version("3").map(&:field_data),
      Category.by_version("4").map(&:field_data)
    ]
  end
end
