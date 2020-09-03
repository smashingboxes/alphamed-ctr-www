Rails.application.routes.draw do

  
  resources :mail_templates
  get 'homepage/index'
  devise_for :users do
    get '/users/sign_out' => 'devise/sessions#destroy'
    post '/users/sign_in' => 'sessions#create'
    # post '/users/sign_up' => 'registrations#create'
  end

  resources :roles
  resources :comments, only: [] do
    collection do
      post :create
      post 'update', to: 'comments#update'
    end
  end
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
        get 'your_information', to: 'results#your_information'
        get 'author_summary', to: 'results#author_summary'
        get 'trial_information', to: 'results#trial_information'
        get 'coauthor_information', to: 'results#coauthor_information'
        get 'drug_information', to: 'results#drug_information'
        get 'get_trial_information_lists', to: 'results#get_trial_information_lists'
        post :update
      end
    end
    resources :mail_templates, only: [:index, :create] do
      collection do
        post "update", to: 'mail_templates#update'
        delete "destroy", to: 'mail_templates#destroy'
        post :send_test_email
      end
    end
  end  

  resources :results, as: "published_result"
  
  root 'homepage#index'
  get '*path', to: 'homepage#index'
end
