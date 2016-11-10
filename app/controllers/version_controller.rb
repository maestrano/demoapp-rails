class VersionController < ApplicationController
  # GET /
  def index
    render json: {GIT_BRANCH: env['GIT_BRANCH'], GIT_COMMIT_ID: env['GIT_COMMIT_ID'], RAILS_ENV: env['RAILS_ENV']}
  end
end
