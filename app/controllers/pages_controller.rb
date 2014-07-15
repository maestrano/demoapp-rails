class PagesController < ApplicationController
  # GET /
  def home
  end
  
  # GET /logout
  def logout
    sign_out()
    redirect_to root_path 
  end
end
