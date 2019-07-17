const API_KEY = '95a0ca26d002f09d2a110a24c49433e1';
const ABS_TMP_DIFF = 273;


$(document).on('turbolinks:load', function () {
  $('.weather').submit(function(e) {
    e.preventDefault();
    var submit = $('.weather__main__button--submit')
    submit.prop('disabled', false);

    var cityName = $(this).find('#name').prop('value');
    var requestUrl = 'http://api.openweathermap.org/data/2.5/forecast?APPID=';
        requestUrl += API_KEY + '&q=' + cityName;
    $.ajax(requestUrl)
      .done(function(data) {
        if (data.cod == 200) {
          var date = Date(data.list[0].dt)

          var result_top = $('.weather__result')
          build_result_top = build_result_top(date, cityName)

          function build_weather_list(i,time,weather,temp) {
          var html = 
            `<p style="padding-top: 5px;">【forecast after <b>${time}</b> hours】</p>
            <p style="padding-left: 50px;">
              Weather : <b id="result-weather-1"> ${weather} </b> <i class="result-icon-${i}" style="font-size: 20px;"></i>.<br>
              Temperature : <b id="result-temp-1" style="font-size: 16px;"> ${temp} </b> °C. <br>
            </p>`
          return html;
        }
          result_top.append(build_result_top)
          
          $("#result-city-name").text(cityName)
          $("#result-datetime").text(date)

          // var time = 0
          // for (var i = 0; i<9; i++) {
          //   var temp = Math.round(data.list[i].main.temp - ABS_TMP_DIFF)
          //   var weather = data.list[i].weather[0].main
          //   // var date = Date(data.list[i].dt)
          //   // var date = data.list[i].dt_txt
          //   //取得データ結果表示の呼び出し
          //   var result = build_weather_list(i,time,weather,temp)
          //   formResult.append(result)
          //   time += 3
          //   // アイコン追加
          //   var resultIcon = '.result-icon-' + i
          //   if (data.list[i].weather[0].main == "Rain") {
          //     $(resultIcon).addClass("fa")
          //     $(resultIcon).addClass("fa-umbrella")
          //   }
          //   if (data.list[i].weather[0].main == "Clouds") {
          //     $(resultIcon).addClass("fa")
          //     $(resultIcon).addClass("fa-cloud")
          //   }
          //   if (data.list[i].weather[0].main == "Clear") {
          //     $(resultIcon).addClass("fa")
          //     $(resultIcon).addClass("fa-sun-o")
          //   }
          // }

        } else {
          // formSpinner.css('display', 'none');
          // formError.css('display', 'block');
          // formResult.css('display', 'none');
        }
      })
      .fail(function() {
        // formSpinner.css('display', 'none');
        // alert('Something wrong occurred.');
      });

  });
});
