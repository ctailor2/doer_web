Rails.application.routes.draw do
  root 'todos#index'

  get :login, to: 'sessions#new'
end
