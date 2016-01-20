class Maestrano::Account::BillsController < ApplicationController
  def index
    tenant = current_user.tenant
    @bills = Maestrano::Account::Bill[tenant].all
  end
end
