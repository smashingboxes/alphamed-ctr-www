class Result
  include Mongoid::Document
  include Mongoid::Attributes::Dynamic
  # include Mongoid::FullTextSearch
  # include Mongoid::Slug
  include Mongoid::Timestamps

  before_create :set_initial_state

  embeds_many :emails
  belongs_to :author, class_name: "User", inverse_of: :results, optional: true
  
  field :title
  field :running_head
  field :identifier
  field :sponsor
  field :irb_approved, type: Boolean, default: false

  field :coauthors, type: Array, default: [{ "email" => "", "order" => 0 }]

  field :state, type: String
  field :time_spent, type: Hash, default: {}
  field :state_history, type: Array, default: []

  field :author_id

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

  private
    def set_initial_state
      # TODO: Look into whether this needs to be here, since we have initial: :started
      self.state = "started"
      self.state_history = [{ state => Time.now }]
    end
end