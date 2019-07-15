class Weather < ApplicationRecord

  enum name: {
    "北海道": "Hokkaidō", 
    "東京": "Tokyo", 
    "神奈川": "Kanagawa-ken", 
    "沖縄": "Okinawa", 
  }

end
