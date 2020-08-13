Rails.application.routes.draw do

  namespace :api do
    devise_for :users do
      get '/users/sign_out' => 'devise/sessions#destroy'
    end
    resources :recipes, :only=>[:index, :show]
  end  
  
  resources :results, as: "published_result"
  root to: "results#index"
end
