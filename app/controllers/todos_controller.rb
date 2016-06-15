class TodosController < ApplicationController
  def index
    angular_view('TodosCtrl')
  end

  def pipeline
    angular_view('TodosCtrl')
  end
end
