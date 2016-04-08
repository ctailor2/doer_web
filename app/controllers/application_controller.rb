class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  before_filter :authenticate!

  private

  def regular_view
    @body_attrs = {}
    @view_container_attrs = {}
  end

  def angular_view(angular_controller)
    @body_attrs = { data: { no: { turbolink: 'true' } }, ng: { app: 'AngularDoer' } }
    @view_container_attrs = { ng: { controller: angular_controller } }
  end

  def authenticate!
    # All we want is a token. If there are issues retrieving data for the user
    # on subsequent API requests using this token, give the user the option to
    # login again.
    redirect_to login_path and return unless cookies[:token].present?
  end
end
