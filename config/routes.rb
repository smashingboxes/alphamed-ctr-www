Rails.application.routes.draw do

  
  resources :mail_templates
  get 'homepage/index'
  devise_for :users do
    get '/users/sign_out' => 'devise/sessions#destroy'
    post '/users/sign_in' => 'sessions#create'
    # post '/users/sign_up' => 'registrations#create'
  end

  resources :roles
  resources :comments
  resources :emails
  resources :results
  resources :posts
  namespace :api do
    resources :users, only: [] do
      collection do
        post 'update', to: 'users#update'
        # post 'sign_in', to: 'devise/sessions#create'
      end
    end
    resources :results, only: [] do 
      collection do
        get 'overview', to: 'results#overview'
        post :update
      end
    end
    resources :mail_templates, only: [:index]
  end  

  resources :results, as: "published_result"
  
  root 'homepage#index'
  get '*path', to: 'homepage#index'
end
