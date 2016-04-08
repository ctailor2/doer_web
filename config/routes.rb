Rails.application.routes.draw do
  root 'todos#index'

  get :login, to: 'sessions#new'

  get :settings, to: 'users#settings'
end
