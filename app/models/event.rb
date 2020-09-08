# frozen_string_literal: true

class Event
  include Mongoid::Document
  include Mongoid::Attributes::Dynamic

  NUMERICS = %w[no_change grade_1 grade_2 grade_3 grade_4 grade_5].freeze
  before_save :zero_if_blank

  embedded_in :events_table

  # arm can be experimental, control, or empty for non-randomized trials
  field :adverse_event_id, type: Integer
  field :all_grades, type: Integer, default: 0
  field :arm
  field :grade_1, type: Integer, default: 0
  field :grade_2, type: Integer, default: 0
  field :grade_3, type: Integer, default: 0
  field :grade_4, type: Integer, default: 0
  field :grade_5, type: Integer, default: 0
  field :name, default: ""
  field :no_change, type: Integer, default: 0
  field :position, type: Integer
  field :provide_table, type: Boolean, default: false
  field :specify, type: String, default: ""
  field :total, type: Integer, default: 0

  scope :experimental, -> { self.or({ arm: "Experimental" }, { arm: "" }, arm: nil) }
  scope :control, -> { where(arm: "Control") }

  def adverse_events_json
    {
      id:self.id.to_s,
      adverse_event_id:self.adverse_event_id.to_s,
      no_change:self.no_change,
      all_grades:self.all_grades,
      grade_1:self.grade_1,
      grade_2:self.grade_2,
      grade_3:self.grade_3,
      grade_4:self.grade_4,
      grade_5:self.grade_5,
      name:self.name,
      no_change:self.no_change,
      position:self.position,
      provide_table:self.provide_table,
      total:self.total
    }
  end

  def set_adverse_events event
    self.no_change=event[:no_change]
    self.all_grades=event[:all_grades]
    self.grade_1=event[:grade_1]
    self.grade_2=event[:grade_2]
    self.grade_3=event[:grade_3]
    self.grade_4=event[:grade_4]
    self.grade_5=event[:grade_5]
    self.name=event[:name]
    self.position=event[:position]
    self.provide_table=event[:provide_table]
    self.total=event[:total]
  end
  
  protected

  def zero_if_blank
    NUMERICS.each { |attr| self[attr] = 0 if self[attr].blank? }
  end
end
