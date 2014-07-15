class User < ActiveRecord::Base
  attr_accessible :country_code, :email, :first_name, :last_name
  
  #===================================
  # Associations
  #===================================
  has_many :user_company_rels
  has_many :companies, through: :user_company_rels
  
  #===================================
  # Validation
  #===================================
  validate :first_name, presence: true
  validate :last_name, presence: true
  validate :email, presence: true
end
