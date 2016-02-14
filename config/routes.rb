Rails.application.routes.draw do
  root to: 'registrations#index'

  get 'signup' => 'registrations#index'
end
