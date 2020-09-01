class Comment
  include Mongoid::Document
  # include Mongoid::Timestamps

  before_create :set_created_at

  belongs_to :user
  embedded_in :result

  field :content
  field :step
  field :created_at

  def set_created_at
    self.created_at=DateTime.now
  end

  def to_json
    {
      id:self.id.to_s,
      content:self.content,
      step:self.step,
      created_at:self.created_at,
      created_at_string:self.created_at ? self.created_at.strftime("%l:%M %p on %B %e, %Y") : "",
      user: {name:self.user.name}
    }
  end

  # step= overview | your_information | author_summary | trial_information | coauthor_information

end
