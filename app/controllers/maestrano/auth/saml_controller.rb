class Maestrano::Auth::SamlController < Maestrano::Rails::SamlBaseController
  #== POST '/maestrano/auth/saml/consume'
  # Final phase of the Single Sign-On handshake. Find or create
  # the required resources (user and group) and sign the user
  # in
  #
  # This action is left to you to customize based on your application
  # requirements. Below is presented a potential way of writing
  # the action.
  #
  # Assuming you have enabled maestrano on a user model
  # called 'User' and a group model called 'Organization'
  # the action could be written the following way
  def consume
    tenant = params[:tenant] || 'default'
    user = User.find_or_create_for_maestrano(user_auth_hash, tenant)
    company = Company.find_or_create_for_maestrano(group_auth_hash, tenant)
    if user && company
      company.add_member(user) unless company.member?(user)
      sign_in(user)
    end

    redirect_to root_path
  end
end
