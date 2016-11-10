DemoappRails::Application.routes.draw do
  maestrano_routes

  # Home page with login / logout via SSO
  root to: 'pages#home'

  namespace :maestrano do
    # Account API
    namespace :account do
      resources :bills, only: [:index]
    end

    # Connec! API
    namespace :connec do
      get '', to: 'connec#collections'
      scope ':resource' do
        resources '', as: :resource, controller: 'connec', only: [:index, :show, :create, :update]
      end
    end
  end

  get '/logout', to: 'pages#logout'
  get '/version', to: 'version#index'
end
