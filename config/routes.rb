DemoappRails::Application.routes.draw do
  maestrano_routes

  root to: 'pages#home'
  
  get '/logout', to: 'pages#logout'
end
