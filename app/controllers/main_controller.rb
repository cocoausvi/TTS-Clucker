class MainController < ApplicationController
  def index
  end

  def clucks
  	@clucks = Clucks.all.desc(:post_date)
  end
end
