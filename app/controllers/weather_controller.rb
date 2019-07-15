class WeatherController < ApplicationController
  def index
    @weather = Weather.new
  end
end
