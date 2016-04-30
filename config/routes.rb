Rails.application.routes.draw do
  root 'todos#index'

  get :login, to: 'sessions#new'

  get :settings, to: 'users#settings'
  get :register, to: 'users#new'
end
