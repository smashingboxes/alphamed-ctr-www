Rails.application.routes.draw do

  
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
    # devise_for :users, excepted: %w['sessions#new session#destroy'] do
    #   get '/users/sign_out' => 'devise/sessions#destroy'
    # end
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
  end  

  resources :results, as: "published_result"
  
  root 'homepage#index'
  get '*path', to: 'homepage#index'
end
