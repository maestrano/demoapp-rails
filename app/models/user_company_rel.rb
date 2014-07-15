class UserCompanyRel < ActiveRecord::Base
  attr_accessible :company_id, :user_id
  
  #===================================
  # Associations
  #===================================
  belongs_to :user
  belongs_to :company
end
