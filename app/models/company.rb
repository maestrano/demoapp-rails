class Company < ActiveRecord::Base
  # Enable Maestrano for this group
  maestrano_group_via :provider, :uid, :tenant do |group, maestrano|
    group.name = (maestrano.company_name.blank? ? "Default Group name" : maestrano.company_name)
    #group.country_alpha2 = maestrano.country
    #group.free_trial_end_at = maestrano.free_trial_end_at
    #group.some_required_field = 'some-appropriate-default-value'
  end

  #===================================
  # Associations
  #===================================
  has_many :user_company_rels
  has_many :users, through: :user_company_rels

  #===================================
  # Validation
  #===================================
  validates :name, presence: true

  def add_member(user)
    unless self.member?(user)
      self.user_company_rels.create(user:user)
    end
  end

  def member?(user)
    self.user_company_rels.where(user_id:user.id).count > 0
  end

  def remove_member(user)
    self.user_company_rels.where(user_id:user.id).delete_all
  end
end
