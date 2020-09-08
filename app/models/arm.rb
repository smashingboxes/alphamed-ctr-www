# frozen_string_literal: true

class Arm
  include Mongoid::Document
  # include Mongoid::Slug
  include Mongoid::Attributes::Dynamic

  embedded_in :result, inverse_of: :arms
  embeds_many :drugs
  embeds_many :events_tables, cascade_callbacks: true

  accepts_nested_attributes_for :drugs, allow_destroy: true
  accepts_nested_attributes_for :events_tables, allow_destroy: true

  # Experimental, Control, custom name, or empty for non-randomized trials
  field :name, default: "Experimental"
  # I, I/II, II, or III
  field :phase, default: "I"
  # slug :phase, :name, scope: :result

  field :patient_male, default: 0
  field :patient_female, default: 0
  field :patient_stage
  field :patient_age
  field :patient_median_therapies
  field :patient_performance, type: Hash, default: { "0"=>"","1"=>"","2"=>"","3"=>"","unknown"=>"" }
  field :patient_other
  field :patient_cancer_types, type: Array,
                               default: [{ "name" => "", "number" => "" }]

  # Drug information page
  field :drug_table

  # Dose Escalating Toxicities
  field :det, type: Hash,
    default: {
      columns: [
  							{ id: "dose",
                  name: "Dose",
                  field: "dose" },
      					{ id: "dose_level",
                  name: "Dose Level",
                  field: "dose_level" },
                { id: "enrolled",
                  name: "Number Enrolled",
                  field: "enrolled" },
                { id: "evaluable",
                  name: "Number Evaluable for Toxicity",
                  field: "evaluable" }],
      rows: []
    }

  field :dose_limiting_toxicities, type: Hash, default: {}

  field :dlt, type: Hash,
    default: {
      columns: [{ id: "dose_level",
                  name: "Dose Level",
                  field: "dose_level" },
                { id: "enrolled",
                  name: "Number Enrolled",
                  field: "enrolled" },
                { id: "evaluable",
                  name: "Number Evaluable for Toxicity",
                  field: "evaluable" },
                { id: "number",
                  name: "Number with a Dose Limiting Toxicity",
                  field: "number" },
                { id: "limiting",
                  name: "Dose Limiting Toxicity Information",
                  field: "limiting" }],
      rows: []
    }

  # Adverse Events page
  AE_SUBTITLE_OPTIONS = [
    "Cycle 1", "All Cycles", "All Dose Levels, Cycle 1", "All Dose Levels, All Cycles",
    "Of Special Interest, Cycle 1", "Of Special Interest, All Cycles"
  ].freeze

  field :adverse_cycle_type, type: String, default: "1"
  field :ctcae_category_id
  field :ctcae_version, default: 4
  field :adverse_events_number, default: "Number of Patients" # number of patients or cycles
  field :adverse_events_legend
  field :adverse_events_subtitle, default: AE_SUBTITLE_OPTIONS[2]

  def drug_information_json
  	{
  		id:self.id.to_s,
      name:self.name,
      phase:self.phase,
      drug_table:self.drug_table,
      det:self.det,
      drugs:self.drugs.order(:created_at=>:asc).map{|d|d.drug_information_json}
  	}
  end

  def patient_characteristics_json
  	{
  		id:self.id.to_s,
  		patient_male:self.patient_male,
  		patient_female:self.patient_female,
  		patient_stage:self.patient_stage,
  		patient_age:self.patient_age,
  		patient_median_therapies:self.patient_median_therapies,
  		patient_performance:self.patient_performance,
  		patient_other:self.patient_other,
  		patient_cancer_types:self.patient_cancer_types
  	}
  end

  def pharmacokinetics_pharmacodynamics_json
  	{
  		id:self.id.to_s,
  		dose_limiting_toxicities:self.dose_limiting_toxicities
  	}
  end

  def adverse_events_json
  	{
  		id:self.id.to_s,
  		ctcae_version:self.ctcae_version,
  		adverse_events_subtitle:self.adverse_events_subtitle,
  		adverse_events_number:self.adverse_events_number,
  		adverse_events_legend:self.adverse_events_legend,
  		dlt:self.dlt,
  		events_tables:self.events_tables.order(:created_at=>:asc).map{|et|et.adverse_events_json},
  		category_list: Category.Data,
  		adverse_events_list: AdverseEvent.Data
  	}
  end

  def set_arm_drug_information arm
  	self.name=arm[:name]
  	self.phase=arm[:phase]
  	self.drug_table=arm[:drug_table]

  	arr=[]
  	arm[:det][:rows].each do |row|
  		arr << {dose:row[:dose],dose_level:row[:dose_level],enrolled:row[:enrolled],evaluable:row[:evaluable]}
  	end
  	self.det={
      columns: [{ id: "dose",
                  name: "Dose",
                  field: "dose" },
                { id: "dose_level",
                  name: "Dose Level",
                  field: "dose_level" },
                { id: "enrolled",
                  name: "Number Enrolled",
                  field: "enrolled" },
                { id: "evaluable",
                  name: "Number Evaluable for Toxicity",
                  field: "evaluable" }],
      rows: arr
    }
  	arm[:drugs].each do |drug_obj|
  		drug=self.drugs.find_by(id:drug_obj[:id]) || self.drugs.new
  		drug.set_drug_drug_information(drug_obj)
  		drug.save
  	end
  end

  def set_arm_patient_characteristics arm
  	self.patient_male=arm[:patient_male]
		self.patient_female=arm[:patient_female]
		self.patient_stage=arm[:patient_stage]
		self.patient_age=arm[:patient_age]
		self.patient_median_therapies=arm[:patient_median_therapies]
		self.patient_other=arm[:patient_other]
		self.patient_performance={
      "0" => arm[:patient_performance]["0"],
      "1" => arm[:patient_performance]["1"],
      "2" => arm[:patient_performance]["2"],
      "3" => arm[:patient_performance]["3"],
      "unknown" => arm[:patient_performance]["unknown"]
    }
    arr = []
    arm[:patient_cancer_types].each do |cancer_type|
      arr<<{"name"=>cancer_type[:name], "number"=>cancer_type[:number]}
    end
    self.patient_cancer_types=arr
  end

  def set_arm_pharmacokinetics_pharmacodynamics arm
  	self.dose_limiting_toxicities={}
  	arm[:dose_limiting_toxicities].each_pair { |key, value|
  		self.dose_limiting_toxicities[key]=value
  	}
  end

  def set_arm_adverse_events arm
  	self.ctcae_version=arm[:ctcae_version]
		self.adverse_events_subtitle=arm[:adverse_events_subtitle]
		self.adverse_events_number=arm[:adverse_events_number]
		self.adverse_events_legend=arm[:adverse_events_legend]
		arr=[]
  	arm[:dlt][:rows].each do |row|
  		arr << {dose_level:row[:dose_level],enrolled:row[:enrolled],evaluable:row[:evaluable],number:row[:number],limiting:row[:limiting]}
  	end
  	self.dlt={
      columns: [{ id: "dose_level",
                  name: "Dose Level",
                  field: "dose_level" },
                { id: "enrolled",
                  name: "Number Enrolled",
                  field: "enrolled" },
                { id: "evaluable",
                  name: "Number Evaluable for Toxicity",
                  field: "evaluable" },
                { id: "number",
                  name: "Number with a Dose Limiting Toxicity",
                  field: "number" },
                { id: "limiting",
                  name: "Dose Limiting Toxicity Information",
                  field: "limiting" }],
      rows: arr
    }
    arm[:events_tables].each do |event_obj|
  		event=self.events_tables.find_by(id:event_obj[:id]) || self.events_tables.new
  		event.set_adverse_events(event_obj)
  		event.save
  	end
  end
end