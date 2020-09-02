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

  # Drug information page
  field :drug_table

  # Dose Escalating Toxicities
  field :det, type: Hash,
    default: {
      columns: [{ id: "dose_level",
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

  def set_arm_drug_information arm
  	self.name=arm[:name]
  	self.phase=arm[:phase]
  	self.drug_table=arm[:drug_table]
  	self.det={
      columns: [{ id: "dose_level",
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
  	arm[:drugs].each do |drug_obj|
  		drug=self.drugs.find_by(id:drug_obj[:id]) || self.drugs.new
  		drug.set_drug_drug_information(drug_obj)
  		drug.save
  	end
  end
end