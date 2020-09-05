# frozen_string_literal: true

class Arm
  include Mongoid::Document
  # include Mongoid::Slug
  include Mongoid::Attributes::Dynamic

  embedded_in :result, inverse_of: :arms
  embeds_many :drugs

  accepts_nested_attributes_for :drugs, allow_destroy: true

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
end