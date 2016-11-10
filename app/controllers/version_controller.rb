class VersionController < ApplicationController
  # GET /
  def index
    render json: {GIT_BRANCH: ENV['GIT_BRANCH'], GIT_COMMIT_ID: ENV['GIT_COMMIT_ID'], RAILS_ENV: ENV['RAILS_ENV']}
  end
end
