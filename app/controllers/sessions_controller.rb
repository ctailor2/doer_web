class SessionsController < ApplicationController
  skip_before_filter :authenticate!

  def new
    regular_view
  end
end

