class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable, :validatable and :omniauthable
  devise :database_authenticatable, :registerable,
     :recoverable, :rememberable

  enum role: {regular: 0, admin: 1, editor: 2, co_author: 3}

  before_create :generate_token

  validates :name, :email, presence: true
  validates :email, uniqueness: true
  # validates :password, length: { minimum: 8 }

  # private

  def generate_token
    self.authentication_token = loop do
      random_token = SecureRandom.urlsafe_base64(nil, false)
      break random_token unless User.exists?(authentication_token: random_token)
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

  def email_exists? email
    User.where("email = ? and id != ?", email, self.id).length > 0
  end

  def name_exists? name
    User.where("name = ? and id != ?", name, self.id).length > 0
  end
end
