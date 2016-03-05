class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  before_filter :authenticate!

  private

  def angular_view
    @body_attrs = { ng: { app: 'AngularDoer' } }
    @view_container_attrs = { ng: { view: '' } }
  end

  def regular_view
    @body_attrs = { data: { no: { turbolink: 'true' } } }
    @view_container_attrs = {}
  end

  def authenticate!
    redirect_to login_path and return unless session[:token].present?
  end
end
