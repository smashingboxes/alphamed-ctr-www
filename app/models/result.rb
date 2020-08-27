class Result
  include Mongoid::Document
  include Mongoid::Attributes::Dynamic
  # include Mongoid::FullTextSearch
  # include Mongoid::Slug
  include Mongoid::Timestamps

  before_create :set_initial_state

  embeds_many :emails
  belongs_to :author, class_name: "User", inverse_of: :results, optional: true
  
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

  def overview_json
    {
      title: self.title.to_s,
      running_head: self.running_head.to_s,
      identifier: self.identifier.to_s,
      sponsor: self.sponsor.to_s,
      irb_approved: self.irb_approved,
      study_phase: self.study_phase.to_s
    }
  end

  def your_information_json
    {
      author_first_name: self.author_first_name.to_s,
      author_middle_name: self.author_middle_name.to_s,
      author_last_name: self.author_last_name.to_s,
      author_degrees: self.author_degrees,
      author_institutions: self.author_institutions,
      author_address_1: self.author_address_1.to_s,
      author_address_2: self.author_address_2.to_s,
      author_city: self.author_city.to_s,
      author_statoid: self.author_statoid.to_s,
      author_zip: self.author_zip.to_s,
      author_country: self.author_country.to_s,
      author_phone: self.author_phone.to_s,
      author_pi: self.author_pi,
      author_ca: self.author_ca,
      author_assisted: self.author_assisted,
      author_submitter: self.author_submitter,
      author_acknowledgements: self.author_acknowledgements
    }
  end

  def author_summary_json 
    {
      abstract_background: self.abstract_background || "",
      abstract_methods: self.abstract_methods || "",
      abstract_results: self.abstract_results || "",
      abstract_conclusions: self.abstract_conclusions || "",
      abstract_discussion: self.abstract_discussion || "",
      abstract_lessons_learned: self.abstract_lessons_learned || ""
    }
  end

  private
    def set_initial_state
      # TODO: Look into whether this needs to be here, since we have initial: :started
      self.state = "started"
      self.state_history = [{ state => Time.now }]
    end
end
