Rails.application.routes.draw do
  # Authentication endpoints
  scope :authentication do
    post "/login", to: "authentication#login"
    post "/refresh", to: "authentication#refresh"
    patch "/change_password", to: "authentication#change_password"
    post "/signup", to: "authentication#signup"
  end

  resources :redemptions, only: [:index, :show, :create]
  resources :rewards
  resources :users

  if Rails.env.development?
    mount Rswag::Ui::Engine => "/api-docs"
    mount Rswag::Api::Engine => "/api-docs"
  end
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  # Defines the root path route ("/")
  root "rewards#index"
end
