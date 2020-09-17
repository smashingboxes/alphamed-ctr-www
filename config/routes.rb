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
  resources :results do
    resources :forms, context: "forms" do
      post :send_request, on: :member
    end
  end
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
        get 'patient_characteristics', to: 'results#patient_characteristics'
        get 'pharmacokinetics_pharmacodynamics', to: 'results#pharmacokinetics_pharmacodynamics'
        get 'adverse_events', to: 'results#adverse_events'
        get 'primary_assessment_method', to: 'results#primary_assessment_method'
        get 'assessment_analysis_discussion', to: 'results#assessment_analysis_discussion'
        get 'figures_tables', to: 'results#figures_tables'
        get 'author_forms', to: 'results#author_forms'
        get 'submission_overview', to: 'results#submission_overview'
        get 'disclosure', to: 'results#disclosure'
        get 'activity_logs', to: 'results#activity_logs'
        get 'get_trial_information_lists', to: 'results#get_trial_information_lists'
        patch :update
        patch 'update_disclosure', to: 'results#update_disclosure'
        delete :destroy
        post :submit
        post :in_review
        post :revision
        post :accepted
        post :rejected
        post :publish
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
