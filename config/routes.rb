Rails.application.routes.draw do
  devise_for :users
  root 'groups#new'
  resources :messages, only: [:index, :create]
  resources :groups, only: [:index, :new, :create, :update, :edit, :show]
  resources :users, only: [:index]
end
