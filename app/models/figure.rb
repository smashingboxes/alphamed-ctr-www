# frozen_string_literal: true

class Figure
  include Mongoid::Document

  mount_uploader :attachment, AttachmentUploader, mount_on: :attachment_file_name
  # field :attachment

  embedded_in :result

  field :legend
  field :position
  field :type

  validates :legend, presence: true
  validates :attachment, presence: true

  def figures_tables_json
    {
      id:self.id.to_s,
      type:self.type,
      legend:self.legend,
      position:self.position,
      attachment:self.attachment
    }
  end

  def set_figures_tables figure
    self.type=figure[:type]
    self.legend=figure[:legend]
    self.position=figure[:position]
    self.attachment=figure[:attachment]
  end
end
