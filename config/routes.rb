Rails.application.routes.draw do

  namespace :api do
    devise_for :users do
      get '/users/sign_out' => 'devise/sessions#destroy'
    end
    resources :users, only: [] do
      collection do
        post 'update', to: 'users#update'
      end
    end
  end  
  
  resources :results, as: "published_result"
  root to: "results#index"
end
