class Form
  include Mongoid::Document
  after_update :record_activity

  embedded_in :result

  field :title

  belongs_to :signer, class_name: "User", inverse_of: :results, optional: true

  # For Disclosure form
  field :relationships
  field :employment, type: Hash, default: -> { relationship_defaults }
  field :property, type: Hash, default: -> { relationship_defaults }
  field :consultant, type: Hash, default: -> { relationship_defaults }
  field :honoraria, type: Hash, default: -> { relationship_defaults }
  field :funding, type: Hash, default: -> { relationship_defaults }
  field :ownership, type: Hash, default: -> { relationship_defaults }
  field :expert, type: Hash, default: -> { relationship_defaults }
  field :other, type: Hash, default: -> { relationship_defaults }
  field :unbiased

	field :type
  field :signature           # form field
  field :signed_at           # time of signing
  field :signer_email        # user's email
  field :signer_id           # user's id
  field :signer_institutions # user's institutions
  field :signer_name         # user's name

  def relationship_defaults
    { "relationship" => false, "interests" => "", "compensated" => nil }
  end

  def record_activity
    result.activities.create(
      key: "form",
      form_id: id,
      form_type: type,
      form_signer_id: signer_id,
      form_signer_name: signer_name,
      user_id: signer_id,
      user_name: signer_name
    )
  end

  def author_forms_json
  	{
  		id:self.id.to_s,
  		type:self.type,
  		title:self.result.title,
  		form_date:self.signed_at ? self.signed_at.strftime("%x") : "N/A"
  	}
  end

  def disclosure_json
  	{
  		id:self.id.to_s,
  		relationships:self.relationships,
  		signature:self.signature,
  		type:self.type,
  		signed_at:self.signed_at,
  		employment:self.employment,
  		property:self.property,
  		consultant:self.consultant,
  		honoraria:self.honoraria,
  		funding:self.funding,
  		ownership:self.ownership,
  		expert:self.expert,
  		other:self.other
  	}
  end

  def disclosure_form_json
    {
      id:self.id.to_s,
      name:"#{self.signer_name} (#{self.signer_email})",
      form_date:self.signed_at ? self.signed_at.strftime("%d/%m/%y") : "N/A"
    }
  end

  def set_disclosure form_obj
  	self.relationships=form_obj[:relationships]
  	self.signature=form_obj[:signature]
  	self.type="disclosure"
  	self.signed_at=DateTime.now
  	self.employment=set_disclosure_hash(form_obj[:employment])
  	self.property=set_disclosure_hash(form_obj[:property])
  	self.consultant=set_disclosure_hash(form_obj[:consultant])
  	self.honoraria=set_disclosure_hash(form_obj[:honoraria])
  	self.funding=set_disclosure_hash(form_obj[:funding])
  	self.ownership=set_disclosure_hash(form_obj[:ownership])
  	self.expert=set_disclosure_hash(form_obj[:expert])
  	self.other=set_disclosure_hash(form_obj[:other])
    signer=self.result.author
    self.signer_name="#{signer.first_name} #{signer.middle_name} #{signer.last_name}"
    self.signer_email=signer.email
  end

  def set_disclosure_hash hash_obj
  	if hash_obj
  		{ relationship:hash_obj[:relationship],interests:hash_obj[:interests],compensated:hash_obj[:compensated] }
  	else
  		relationship_defaults
  	end
  end
end