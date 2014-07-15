class Company < ActiveRecord::Base
  attr_accessible :name
  
  #===================================
  # Associations
  #===================================
  has_many :user_company_rels
  has_many :users, through: :user_company_rels
  
  #===================================
  # Validation
  #===================================
  validate :name, presence: true
end
