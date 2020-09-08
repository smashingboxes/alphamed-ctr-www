# frozen_string_literal: true

class EventsTable
  include Mongoid::Document
  include Mongoid::Attributes::Dynamic

  embedded_in :arm
  embedded_in :result

  embeds_many :events, cascade_callbacks: true
  accepts_nested_attributes_for :events, allow_destroy: true

  # Adverse Events page
  # TODO: Consider sharing this list with Arm::AE_SUBTITLE_OPTIONS
  AE_SUBTITLE_OPTIONS = [
    "Cycle 1", "All Cycles", "All Dose Levels, Cycle 1", "All Dose Levels, All Cycles",
    "Of Special Interest, Cycle 1", "Of Special Interest, All Cycles"
  ].freeze
  field :ctcae_category_id, default: ""
  field :ctcae_version, default: 4
  field :number, default: "" # number of patients or cycles
  field :legend, default: ""
  field :has_sae, type: Boolean, default: false
  field :sae, type: Hash, default: { "0" => {} } # Serious Adverse Events
  field :serious_adverse_events_legend, default: ""
  field :subtitle, default: AE_SUBTITLE_OPTIONS[1]

  def self.title_list
    ['Cycle 1','All Cycles','All Dose Levels, Cycle 1','All Dose Levels, All Cycles','Of Special Interest, Cycle 1','Of Special Interest, All Cycles']
  end

  def self.ctcae_version_list
    ["CTCAE v3.0","CTCAE v4.3","CTCAE v5.0"]
  end

  def adverse_events_json
    {
      id:self.id.to_s,
      ctcae_category_id:self.ctcae_category_id,
      ctcae_version:self.ctcae_version,
      number:self.number,
      legend:self.legend,
      has_sae:self.has_sae,
      sae:self.sae,
      serious_adverse_events_legend:self.serious_adverse_events_legend,
      events:self.events.order(:created_at=>:asc).map{|e|e.adverse_events_json}
    }
  end

  def set_adverse_events event
    self.ctcae_category_id=event[:ctcae_category_id]
    self.ctcae_version=event[:ctcae_version]
    self.number=event[:number]
    self.legend=event[:legend]
    self.has_sae=event[:has_sae]
    self.serious_adverse_events_legend=event[:serious_adverse_events_legend]
    sae
    arr=[]
    ctr=0
    event[:sae].each do |s|
      self.sae["#{ctr}"]={"name"=>s[:name], "grade"=>s[:grade], "attribution"=>s[:attribution]}
      ctr=ctr+1
    end
    event[:events].each do |event_obj|
      event=self.events.find_by(id:event_obj[:id]) || self.events.new
      event.set_adverse_events(event_obj)
      event.save
    end
    # events:self.events.order(:created_at=>:asc).map{|e|e.adverse_events_json}
  end
end
