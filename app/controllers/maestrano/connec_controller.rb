class Maestrano::ConnecController < ApplicationController
  def collections
    @collections = JSON.parse(connec_client.get('').body)['_links']
  end

  def index
    @resource_name = params['resource']
    json_schema(@resource_name)
    resources(@resource_name)
  end

  def resources(name)
    @resources ||= connec_client.get("/#{name}")[name]
  end

  def json_schema(name)
    @json_schema ||= JSON.parse(Maestrano::Connec::Client[current_user.tenant].new('json_schema').get("/#{name}").body).to_json
    @json_schema
  end

  def connec_client
    @connec_client ||= begin
      tenant = current_user.tenant
      company = current_user.companies.first
      Maestrano::Connec::Client[tenant].new(company.uid)
    end
  end
end
