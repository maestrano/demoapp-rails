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
      resources :organizations, only: [:index]
    end
  end
  
  get '/logout', to: 'pages#logout'
end
