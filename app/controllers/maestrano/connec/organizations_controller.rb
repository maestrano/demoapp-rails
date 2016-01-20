class Maestrano::Connec::OrganizationsController < ApplicationController
  def index
    tenant = current_user.tenant
    company = current_user.companies.first
    connec_client = Maestrano::Connec::Client[tenant].new(company.uid)
    @organizations = connec_client.get('/organizations')['organizations']
  end
end
