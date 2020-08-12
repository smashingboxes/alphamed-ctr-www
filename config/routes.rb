Rails.application.routes.draw do
  devise_for :users do
    get '/users/sign_out' => 'devise/sessions#destroy'
  end

  resources :results, as: "published_result"
  root to: "results#index"
end
