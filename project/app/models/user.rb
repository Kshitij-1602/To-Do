class User < ApplicationRecord
  has_many :tasks
  validates :name,presence: true
  validates :email,presence: true
  validates :uid,presence: true
  def self.from_omniauth(auth)
      # Creates a new user only if it doesn't exist
      where(email: auth.info.email).first_or_initialize do |user|
        p user
        user.name = auth.info.name
        user.email = auth.info.email
        user.expires_at = Time.at(auth.credentials.expires_at).to_datetime
        user.uid = auth.uid # --> this is a random sesiosn_id
        p user
        # user.token = auth.credentials.token
      end
  end

end
