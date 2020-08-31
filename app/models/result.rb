class Result
  include Mongoid::Document
  include Mongoid::Attributes::Dynamic
  # include Mongoid::FullTextSearch
  # include Mongoid::Slug
  include Mongoid::Timestamps

  before_create :set_initial_state

  embeds_many :emails
  belongs_to :author, class_name: "User", inverse_of: :results, optional: true

  # TODO: Add more comments so we can understand the fields
  # Result Overview page

  field :title
  field :running_head
  field :identifier
  field :sponsor
  field :irb_approved, type: Boolean, default: false

  field :coauthors, type: Array, default: [{ "email" => "", "order" => 0 }]

  field :state, type: String
  field :time_spent, type: Hash, default: {}
  field :state_history, type: Array, default: []

  # Author Information page
  field :author_id
  field :author_name
  field :author_email
  field :author_honorific
  field :author_first_name
  field :author_middle_name
  field :author_last_name
  field :author_degrees, type: Hash, default: { "first" => "", "second" => "" }
  field :author_institutions, type: Hash, default: { "0" => "" }
  field :author_pi       # BOOLEAN Principal Investigator 
  field :author_ca       # BOOLEAN Corresponding Author
  field :author_assisted # BOOLEAN Were the author assisted...
  field :author_submitter # BOOLEAN Are you the submitter?
  field :author_address_1
  field :author_address_2
  field :author_city
  field :author_statoid
  field :author_zip
  field :author_country
  field :author_phone
  field :author_acknowledgements

  field :study_phase
  field :type_of_study_2

  # Author Summary page
  field :abstract_background
  field :abstract_methods
  field :abstract_results
  field :abstract_conclusions
  field :abstract_discussion
  field :abstract_lessons_learned

  # Result Information page
  field :diseases, type: Array
  field :stage_of_disease_or_treatment
  field :prior_therapy
  field :study_phase
  field :type_of_study_2
  # Statistical analysis, only needed if type_of_study_2 == "Randomized"
  field :statistical_orr, type: Hash
  field :statistical_pfs, type: Hash
  field :statistical_ttp, type: Hash
  field :statistical_os, type: Hash
  field :statistical_response_duration, type: Hash
  field :primary_endpoints, type: Hash, default: { "0" => "" }
  field :secondary_endpoints, type: Hash, default: { "0" => "" }
  field :endpoints_details
  field :investigators_assessment

  # enum state: { started: 0, submitted: 1, in_review: 2, revision: 3, accepted: 4, rejected: 5, published: 6 }

  def self.started_all
    where(state: "started")
  end

  def self.submitted_all
    where(state: "submitted")
  end

  def self.in_review_all
    where(state: "in_review")
  end

  def self.revision_all
    where(state: "revision")
  end

  def self.accepted_all
    where(state: "accepted")
  end

  def self.rejected_all
    where(state: "rejected")
  end

  def self.published_all
    where(state: "published")
  end

  def set_overview result
    self.title=result[:title]
    self.running_head=result[:running_head]
    self.identifier=result[:identifier]
    self.sponsor=result[:sponsor]
    self.irb_approved=result[:irb_approved]
    self.study_phase=result[:study_phase]
  end

  def set_your_information result
    self.author_first_name=result[:author_first_name]
    self.author_middle_name=result[:author_middle_name]
    self.author_last_name=result[:author_last_name]
    self.author_address_1=result[:author_address_1]
    self.author_address_2=result[:author_address_2]
    self.author_city=result[:author_city]
    self.author_statoid=result[:author_statoid]
    self.author_zip=result[:author_zip]
    self.author_country=result[:author_country]
    self.author_phone=result[:author_phone]
    self.author_pi=result[:author_pi]
    self.author_ca=result[:author_ca]
    self.author_assisted=result[:author_assisted]
    self.author_submitter=result[:author_submitter]
    self.author_acknowledgements=result[:author_acknowledgements]
    self.author_degrees={
      "first" => result[:author_degrees][:first],
      "second" => result[:author_degrees][:second]
    }
    inst_obj={}
    ctr=0
    result[:author_institutions].each do |institution|
      inst_obj["#{ctr}"]=institution
      ctr+=1
    end
    self.author_institutions=inst_obj
  end

  def set_author_summary result
    self.abstract_background=result[:abstract_background]
    self.abstract_methods=result[:abstract_methods]
    self.abstract_results=result[:abstract_results]
    self.abstract_conclusions=result[:abstract_conclusions]
    self.abstract_discussion=result[:abstract_discussion]
    self.abstract_lessons_learned=result[:abstract_lessons_learned]
  end

  def set_trial_information result
    self.diseases=result[:diseases]
    self.stage_of_disease_or_treatment=result[:stage_of_disease_or_treatment]
    self.prior_therapy=result[:prior_therapy]
    self.type_of_study_2=result[:type_of_study_2]
    self.endpoints_details=result[:endpoints_details]
    self.investigators_assessment=result[:investigators_assessment]
    inst_obj={}
    ctr=0
    result[:primary_endpoints].each do |endpoint|
      inst_obj["#{ctr}"]=endpoint
      ctr+=1
    end
    self.primary_endpoints=inst_obj
    inst_obj={}
    ctr=0
    result[:secondary_endpoints].each do |endpoint|
      inst_obj["#{ctr}"]=endpoint
      ctr+=1
    end
    self.secondary_endpoints=inst_obj
  end

  def set_coauthor_information result
    arr = []
    result[:coauthors].each do |coauthor|
      arr<<{"email"=>coauthor[:email], "order"=>coauthor[:order]}
    end
    self.coauthors=arr
  end

  def overview_json
    {
      title:self.title.to_s,
      running_head:self.running_head.to_s,
      identifier:self.identifier.to_s,
      sponsor:self.sponsor.to_s,
      irb_approved:self.irb_approved,
      study_phase:self.study_phase.to_s
    }
  end

  def your_information_json
    {
      author_first_name:self.author_first_name.to_s,
      author_middle_name:self.author_middle_name.to_s,
      author_last_name:self.author_last_name.to_s,
      author_degrees:self.author_degrees || {},
      author_institutions:self.author_institutions,
      author_address_1:self.author_address_1.to_s,
      author_address_2:self.author_address_2.to_s,
      author_city:self.author_city.to_s,
      author_statoid:self.author_statoid.to_s,
      author_zip:self.author_zip.to_s,
      author_country:self.author_country.to_s,
      author_phone:self.author_phone.to_s,
      author_pi:self.author_pi,
      author_ca:self.author_ca,
      author_assisted:self.author_assisted,
      author_submitter:self.author_submitter,
      author_acknowledgements:self.author_acknowledgements
    }
  end

  def author_summary_json 
    {
      abstract_background:self.abstract_background || "",
      abstract_methods:self.abstract_methods || "",
      abstract_results:self.abstract_results || "",
      abstract_conclusions:self.abstract_conclusions || "",
      abstract_discussion:self.abstract_discussion || "",
      abstract_lessons_learned:self.abstract_lessons_learned || ""
    }
  end

  def trial_information_json
    {
      diseases:self.diseases || [],
      stage_of_disease_or_treatment:self.stage_of_disease_or_treatment.to_s,
      prior_therapy:self.prior_therapy.to_s,
      type_of_study_2:self.type_of_study_2.to_s,
      primary_endpoints:self.primary_endpoints,
      secondary_endpoints:self.secondary_endpoints,
      endpoints_details:self.endpoints_details || "",
      investigators_assessment:self.investigators_assessment.to_s
    }
  end

  def coauthor_information_json
    {
      coauthors:self.coauthors
    }
  end

  def self.trial_information_constants_json
    {
      disease_list:disease_list,
      stage_disease_list:stage_disease_list,
      prior_therapy_list:prior_therapy_list,
      type_of_study_phase_1_list:type_of_study_phase_1_list,
      type_of_study_phase_2_list:type_of_study_phase_2_list,
      type_of_study_phase_3_list:type_of_study_phase_3_list,
      primary_endpoints_phase_1_list:primary_endpoints_phase_1_list,
      primary_endpoints_phase_2_or_3_list:primary_endpoints_phase_2_or_3_list,
      secondary_endpoints_phase_1_list:secondary_endpoints_phase_1_list,
      secondary_endpoints_phase_2_or_3_list:secondary_endpoints_phase_2_or_3_list,
      investigator_assessment_list:investigator_assessment_list
    }
  end

  def self.disease_list
    ["Adrenocortical cancer", "Advanced cancer", "Advanced cancer/Solid Tumor Only", "Advanced cancer/Hematologic Malignancy Only",
      "Anal Cancer", "Biliary Tract: Gallbladder Cancer and Chloangiocarcinoma", "Bladder Cancer", "Brain cancer — primary",
      "Brain cancer — metastatic", "Breast cancer", "Carcinoid Tumors", "Carcinoma of Unknown Primary", "Cervical cancer",
      "Colorectal cancer", "Endometrial", "Esophageal cancer", "Gastric cancer", "Gestational Trophoblastic Neoplasia",
      "Head and Neck Cancers", "Hepatocellular carcinoma", "HIV-associated lymphoma", "HIV-associated Kaposi's sarcoma",
      "HIV-associated — other", "Kaposi's sarcoma", "Leukemia — acute — ALL (Adult)", "Leukemia — acute — AML", 
      "Leukemia — chronic — CLL", "Leukemia — chronic — CLL", "Leukemia — chronic — CML", "Leukemia — Hairy Cell", 
      "Lung cancer — NSCLC", "Lung cancer — SCLC", "Lymphoma — Hodgkins", "Lymphoma — Non-Hodgkins", "Lymphoma — other", 
      "Melanoma", "Mesothelioma", "Multiple Myeloma", "Neuroendocrine — pancreatic", "Neuroendocrine — other", 
      "Ovarian cancer", "Pancreatic cancer", "Pediatric cancer — ALL", "Pediatric cancer — Ewings", "Pediatric cancer — Neuroblastoma",
      "Pediatric cancer — Osteosarcoma", "Pediatric cancer — Rhabdomyosarcoma", "Pediatric cancer — Other",
      "Pheochromocytoma", "Prostate Cancer", "Renal cell carcinoma — clear cell", "Renal cell carcinoma — not clear cell",
      "Sarcomas — Adult", "Skin cancer — basal cell carcinoma", "Skin cancer — melanoma", "Skin cancer — other",
      "Testicular cancer", "Thymoma", "Thyroid cancer — anaplastic", "Thyroid cancer — well differentiated",
      "Thyroid cancer — medullary", "Vaginal cancer", "Other"]
  end

  def self.stage_disease_list
    ["Prevention", "Neo-adjuvant", "Adjuvant", "Primary", "Metastatic/Advanced"]
  end

  def self.prior_therapy_list
    ["None", "1 prior regimen", "2 prior regimens", "More than 2 prior regimens", "No designated number of regimens"]
  end

  def self.type_of_study_phase_1_list
    ["3+3", "Accelerated Titration", "Adaptive Design", "Modified Fibonacci", "Rolling Six", "Other"]
  end

  def self.type_of_study_phase_2_list
    ["Single arm", "Randomized", "Other"]
  end

  def self.type_of_study_phase_3_list
    ["Single arm", "Randomized", "Other"]
  end

  def self.primary_endpoints_phase_1_list
    ["Toxicity", "Tolerability", "Deliverability", "Safety", "Maximum Tolerated Dose", "Recommended Phase II Dose", 
      "Pharmacodynamic", "Correlative Endpoint", "Other"]
  end

  def self.primary_endpoints_phase_2_or_3_list
    ["Toxicity", "Overall Response Rate", "Complete Response Rate", "Progression-Free Survival", "Time to Progression", 
      "Overall Survival", "Tolerability", "Deliverability", "Safety", "Correlative Endpoint", "Other"]
  end

  def self.secondary_endpoints_phase_1_list
    ["Toxicity", "Tolerability", "Deliverability", "Safety", "Maximum Tolerated Dose", "Recommended Phase II Dose", 
      "Pharmacodynamic", "Correlative Endpoint", "Other"]
  end

  def self.secondary_endpoints_phase_2_or_3_list
    ["Toxicity", "Overall Response Rate", "Complete Response Rate", "Progression-Free Survival", "Time to Progression", 
      "Overall Survival", "Tolerability", "Deliverability", "Safety", "Correlative Endpoint", "Other"]
  end

  def self.investigator_assessment_list
    [
      "Active and should be pursued further",
      "Active but results overtaken by other developments",
      "Active but too toxic as administered in this study",
      "Inactive because results did not meet primary endpoint",
      "Correlative endpoints met but not powered to assess activity",
      "Correlative endpoints not met but clinical activity observed",
      "Evidence of target inhibition but no or minimal anti-tumor activity",
      "Poorly tolerated/not feasible",
      "Level of activity did not meet planned end point",
      "Other" 
    ]
  end

  private
    def set_initial_state
      # TODO: Look into whether this needs to be here, since we have initial: :started
      self.state = "started"
      self.state_history = [{ state => Time.now }]
    end
end
