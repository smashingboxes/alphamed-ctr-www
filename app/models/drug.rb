class Drug
  include Mongoid::Document
  include Mongoid::Timestamps

  embedded_in :arm

  # arm can be experimental, control, or empty for non-randomized trials
  field :arm_name, default: ""
  field :generic_name, default: "New drug"
  field :trade_name, default: ""
  field :company_name, default: ""
  field :drug_type, default: ""
  field :drug_class, default: ""
  field :dose, default: ""
  field :unit, default: ""
  field :per, default: ""
  field :route, default: ""
  field :schedule, default: ""

  scope :experimental, -> { self.or({ arm: "Experimental" }, { arm: "" }, arm: nil) }
  scope :control, -> { where(arm: "Control") }

  def drug_information_json
    {
      id:self.id.to_s,
      arm_name:self.arm_name,
      generic_name:self.generic_name,
      trade_name:self.trade_name,
      company_name:self.company_name,
      drug_type:self.drug_type,
      drug_class:self.drug_class,
      dose:self.dose,
      unit:self.unit,
      per:self.per,
      route:self.route,
      schedule:self.schedule
    }
  end
  def set_drug_drug_information drug
    self.arm_name=drug[:arm_name]
    self.generic_name=drug[:generic_name]
    self.trade_name=drug[:trade_name]
    self.company_name=drug[:company_name]
    self.drug_type=drug[:drug_type]
    self.drug_class=drug[:drug_class]
    self.dose=drug[:dose]
    self.unit=drug[:unit]
    self.per=drug[:per]
    self.route=drug[:route]
    self.schedule=drug[:schedule]
  end
end