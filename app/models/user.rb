class User < ActiveRecord::Base
  attr_accessible :country_code, :email, :first_name, :last_name
end
