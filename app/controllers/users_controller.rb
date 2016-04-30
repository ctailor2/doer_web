class UsersController < ApplicationController
  skip_before_filter :authenticate!, only: [:new]

  def settings
    angular_view('UsersCtrl')
  end

  def new
    regular_view
  end
end
