class UserCompanyRel < ActiveRecord::Base
  attr_accessible :user, :company
  #===================================
  # Associations
  #===================================
  belongs_to :user
  belongs_to :company
end
