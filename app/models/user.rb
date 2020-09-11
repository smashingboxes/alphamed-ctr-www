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

  LIST_OF_DEGREES = ["", "PhD", "MD", "MD/PhD", "DO", "BSN", "MSN", "MHA",
                     "DHA", "RN", "LPN", "PharmD", "RPh ", "BM", "ACRN", "ANP",
                     "AOCN", "AOCNP", "AOCNS", "APRN", "ASN", "BMed", "BP",
                     "BPharm", "BScPh", "BSPh", "CCNS", "CCRN", "CDN", "CEN",
                     "CGRN", "ChD", "CHPN", "CMSRN", "CNN", "COCN", "CPN",
                     "CPNP", "CPON", "CRN", "CRNA", "CRNFA", "CRNI", "CRRN",
                     "CRRN-A", "CUCNS", "CUNP", "CURN", "CWCN", "DCh", "DChO",
                     "DMT", "DN", "DNC", "DNS", "DOS", "DP", "DP", "DPH",
                     "DPhC", "DPM", "DrMed", "DrPH", "FAAFP", "FAAN", "FACAAI",
                     "FACC", "FACG", "FACOG", "FACP", "FACPM", "FACS", "FAMA",
                     "FAPHA", "FCAP", "FCCP", "FCPS", "FNP", "FRACP", "GNP", "HNC",
                     "LNCC", "LPN, CLTC", "LPN, NCP", "LVN", "LVN, CLTC",
                     "LVN, NCP", "MPh", "MPharm", "MSPharm", "NP", "NP-C",
                     "OCN", "ONC", "PD", "RNA", "RNC", "Other"].freeze

  COUNTRIES = ["United States", "Canada", "Afghanistan", "Albania", "Algeria",
               "American Samoa", "Andorra", "Angola", "Anguilla", "Antarctica",
               "Antigua and Barbuda", "Argentina", "Armenia", "Aruba",
               "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain",
               "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize",
               "Benin", "Bermuda", "Bhutan", "Bolivia",
               "Bosnia and Herzegowina", "Botswana", "Bouvet Island", "Brazil",
               "British Indian Ocean Territory", "Brunei Darussalam",
               "Bulgaria", "Burkina Faso", "Burundi", "Cambodia", "Cameroon",
               "Cape Verde", "Cayman Islands", "Central African Republic",
               "Chad", "Chile", "China", "Christmas Island",
               "Cocos (Keeling) Islands", "Colombia", "Comoros", "Congo",
               "Cook Islands", "Costa Rica", "Cote D'Ivoire", "Croatia", "Cuba",
               "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica",
               "Dominican Republic", "East Timor", "Ecuador", "Egypt",
               "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia",
               "Ethiopia", "Falkland Islands (Malvinas)", "Faroe Islands",
               "Fiji", "Finland", "France", "France, Metropolitan",
               "French Guiana", "French Polynesia",
               "French Southern Territories", "Gabon", "Gambia", "Georgia",
               "Germany", "Ghana", "Gibraltar", "Greece", "Greenland",
               "Grenada", "Guadeloupe", "Guam", "Guatemala", "Guinea",
               "Guinea-bissau", "Guyana", "Haiti",
               "Heard and Mc Donald Islands", "Honduras", "Hong Kong",
               "Hungary", "Iceland", "India", "Indonesia",
               "Iran (Islamic Republic of)", "Iraq", "Ireland", "Israel",
               "Italy", "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya",
               "Kiribati", "Korea, Democratic People's Republic of",
               "Korea, Republic of", "Kuwait", "Kyrgyzstan",
               "Lao People's Democratic Republic", "Latvia", "Lebanon",
               "Lesotho", "Liberia", "Libyan Arab Jamahiriya", "Liechtenstein",
               "Lithuania", "Luxembourg", "Macau",
               "Macedonia, The Former Yugoslav Republic of", "Madagascar",
               "Malawi", "Malaysia", "Maldives", "Mali", "Malta",
               "Marshall Islands", "Martinique", "Mauritania", "Mauritius",
               "Mayotte", "Mexico", "Micronesia, Federated States of",
               "Moldova, Republic of", "Monaco", "Mongolia", "Montserrat",
               "Morocco", "Mozambique", "Myanmar", "Namibia", "Nauru", "Nepal",
               "Netherlands", "Netherlands Antilles", "New Caledonia",
               "New Zealand", "Nicaragua", "Niger", "Nigeria", "Niue",
               "Norfolk Island", "Northern Mariana Islands", "Norway", "Oman",
               "Pakistan", "Palau", "Panama", "Papua New Guinea", "Paraguay",
               "Peru", "Philippines", "Pitcairn", "Poland", "Portugal",
               "Puerto Rico", "Qatar", "Reunion", "Romania",
               "Russian Federation", "Rwanda", "Saint Kitts and Nevis",
               "Saint Lucia", "Saint Vincent and the Grenadines", "Samoa",
               "San Marino", "Sao Tome and Principe", "Saudi Arabia", "Senegal",
               "Seychelles", "Sierra Leone", "Singapore",
               "Slovakia (Slovak Republic)", "Slovenia", "Solomon Islands",
               "Somalia", "South Africa",
               "South Georgia and the South Sandwich Islands", "Spain",
               "Sri Lanka", "St. Helena", "St. Pierre and Miquelon", "Sudan",
               "Suriname", "Svalbard and Jan Mayen Islands", "Swaziland",
               "Sweden", "Switzerland", "Syrian Arab Republic", "Taiwan",
               "Tajikistan", "Tanzania, United Republic of", "Thailand", "Togo",
               "Tokelau", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey",
               "Turkmenistan", "Turks and Caicos Islands", "Tuvalu", "Uganda",
               "Ukraine", "United Arab Emirates", "United Kingdom",
               "United States Minor Outlying Islands", "Uruguay", "Uzbekistan",
               "Vanuatu", "Vatican City State (Holy See)", "Venezuela",
               "Viet Nam", "Virgin Islands (British)", "Virgin Islands (U.S.)",
               "Wallis and Futuna Islands", "Western Sahara", "Yemen",
               "Yugoslavia", "Zaire", "Zambia", "Zimbabwe"].freeze

  # See http://en.wiktionary.org/wiki/statoid
  STATOIDS = ["Alabama", "Alaska", "Arizona", "Arkansas", "California",
              "Colorado", "Connecticut", "Delaware", "District Of Columbia",
              "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana",
              "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland",
              "Massachusetts", "Michigan", "Minnesota", "Mississippi",
              "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire",
              "New Jersey", "New Mexico", "New York", "North Carolina",
              "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania",
              "Rhode Island", "South Carolina", "South Dakota", "Tennessee",
              "Texas", "Utah", "Vermont", "Virginia", "Washington",
              "West Virginia", "Wisconsin", "Wyoming", "Alberta",
              "British Columbia", "Manitoba", "New Brunswick",
              "Newfoundland and Labrador", "Northwest Territories",
              "Nova Scotia", "Nunavut", "Ontario", "Prince Edward Island",
              "Quebec", "Saskatchewan", "Yukon", "England", "Northern Ireland",
              "Scotland", "Wales", "Australian Capital Territory",
              "New South Wales", "Northern Territory", "Queensland",
              "South Australia", "Tasmania", "Victoria", "Western Australia",
              "Aguascalientes", "Baja California Norte", "Baja California Sur",
              "Campeche", "Chiapas", "Chihuahua", "Coahuila", "Colima",
              "Distrito Federal", "Durango", "Guanajuato", "Guerrero",
              "Hidalgo", "Jalisco", "México (Estado de)", "Michoacán",
              "Morelos", "Nayarit", "Nuevo León", "Oaxaca", "Puebla",
              "Querétaro", "Quintana Roo", "San Luis Potosí", "Sinaloa",
              "Sonora", "Tabasco", "Tamaulipas", "Tlaxcala", "Veracruz",
              "Yucatán", "Zacatecas", "Acre", "Alagoas", "Amapá", "Amazonas",
              "Bahía", "Ceará", "Distrito Federal", "Espirito Santo", "Goiás",
              "Maranhão", "Mato Grosso", "Mato Grosso do Sul", "Minas Geraís",
              "Paraná", "Paraíba", "Pará", "Pernambuco", "Piauí",
              "Rio Grande do Norte", "Rio Grande do Sul", "Rio de Janeiro",
              "Rondônia", "Roraima", "Santa Catarina", "Sergipe", "São Paulo",
              "Tocantins", "Anhui", "Beijing", "Fujian", "Gansu", "Guangdong",
              "Guangxi Zhuang", "Guizhou", "Hainan", "Hebei", "Heilongjiang",
              "Henan", "Hubei", "Hunan", "Jiangsu", "Jiangxi", "Jilin",
              "Liaoning", "Nei Mongol", "Ningxia Hui", "Qinghai", "Shaanxi",
              "Shandong", "Shanghai", "Shanxi", "Sichuan", "Tianjin",
              "Xinjiang Uygur", "Xizang", "Yunnan", "Zhejiang"].freeze

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
