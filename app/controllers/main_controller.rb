class MainController < ApplicationController
  def index
  end

  def clucks
  	@clucks = Cluck.all.desc(:post_date)
  end
end
