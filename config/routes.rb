Rails.application.routes.draw do
  devise_for :users
  root 'messages#index'
  resources :messages, only: [:index, :create]
  resources :groups, only: [:index, :new, :create, :update, :edit]
  resources :users, only: [:index]
end
