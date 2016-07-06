Rails.application.routes.draw do
  mount JasmineRails::Engine => '/specs' if defined?(JasmineRails)
  root 'todos#index'

  get :login, to: 'sessions#new'

  get :pipeline, to: 'todos#pipeline'
  get :settings, to: 'users#settings'
  get :register, to: 'users#new'
end
