class User
  include Mongoid::Document
  include Nameable
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  after_create :generate_token

  # has_and_belongs_to_many :roles
  has_many :results, foreign_key: :author_id, dependent: :nullify, inverse_of: :author

  field :user_type, type: Integer, default: 3

  field :email, type: String, default: ""
  field :encrypted_password, type: String, default: ""

  ## Recoverable
  field :reset_password_token,   type: String
  field :reset_password_sent_at, type: Time
  
  ## Rememberable
  field :remember_created_at, type: Time
  field :remember_token,      type: String

  field :authentication_token, type: String, default: ""

  field :first_name, type: String
  field :last_name, type: String
  field :middle_name, type: String
  field :institutions, type: Hash, default: { "0" => "" }
  field :pi

  ## Trackable
  field :sign_in_count,      type: Integer, default: 0
  field :current_sign_in_at, type: Time
  field :last_sign_in_at,    type: Time
  field :current_sign_in_ip, type: String
  field :last_sign_in_ip,    type: String

  def generate_token
    self.authentication_token = loop do
      random_token = SecureRandom.urlsafe_base64(nil, false)
      break random_token unless User.where(authentication_token: random_token).length > 0
    end
  end

  def name
    "#{self.first_name} #{self.last_name}"
  end

  def will_save_change_to_email? 
  end

  ROLE = ["regular", "admin", "section editor", "corresponding author", "coauthor"]

  def role(*args)
    if args.size == 0 
      # "value"
      ROLE[user_type]
    elsif args.size == 1
      self.user_type = args.first
    else
      "Invalid function"
    end
  end

  def self.validate_password user
    message = nil

    if user[:password] != user[:password_confirmation]
      message = "does not match."
    elsif user[:password].length < 8
      message = "is too short (minimum is 8 characters)."
    end

    message
  end

  def self.email_duplicate? email
    User.where(email: email).length > 0
  end

  def email_exists? email
    User.where(email: email).not.where(id: self.id).length > 0
  end

  def current_result
    self.results.where(state: "started").first
  end

  def fetch_results state
    if self.role == "user" || self.role == "corresponding author"
      if state == "submitted"
        self.results.submitted_all
      elsif state == "revision"
        self.results.revision_all
      elsif state == "published"
        self.results.published_all
      else
        self.results.started_all
      end
    elsif self.role == "admin"
      if state == "submitted"
        Result.submitted_all
      elsif state == "in_review"
        Result.in_review_all
      elsif state == "revision"
        Result.revision_all
      elsif state == "accepted"
        Result.accepted_all
      elsif state == "rejected"
        Result.rejected_all
      elsif state == "published"
        Result.published_all
      else
        Result.started_all
      end
    elsif self.role == "section editor"
      if state == "revision"
        Result.revision_all
      else
        Result.submitted_all
      end
    end
  end

  def user_json
    {
      "_id": {
          "$oid": "5f37d66fd765b8061dd647f0"
      },
      "authentication_token": "HLFkocYV4A6Ar9DfrfQicg",
      "email": "sam1.antha@gmail.com",
      "first_name": "Sam",
      "last_name": "Antha",
      "middle_name": null,
      "user_type": null
    }
  end

  def self.create_coauthors users
    users.each do |user|
      user=User.find_by(email:user[:email]) || User.new(email:user[:email])
      user.first_name=user[:first_name]
      user.middle_name=user[:middle_name]
      user.last_name=user[:last_name]
      user.password="password"
      user.user_type=user[:ca] ? 3 : 4
      user.pi=user[:pi]
      inst_obj={}
      ctr=0
      user[:institutions].each do |institution|
        inst_obj["#{ctr}"]=institution
        ctr+=1
      end
      user.institutions=inst_obj
      user.save
      # user.princi=user[:]
      # user.=user[:]
    end
  end
end
