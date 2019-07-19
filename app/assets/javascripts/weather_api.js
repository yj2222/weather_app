// APIキー
const API_KEY = '95a0ca26d002f09d2a110a24c49433e1';
// ケルビン変換用
const ABS_TMP_DIFF = 273;

$(document).on('turbolinks:load', function () {
  // セレクトのname属性指定
  var select = $('select[name="name"]')
  // 結果表示欄の、初期値をセット
  var defaultHTML = document.getElementById('result').innerHTML;
  // セレクトが変更されたら、submitボタンを有効かする
  select.change(function(){
    var submit = $('.weather__main__button--submit')
    submit.prop('disabled', false);
  });
  // submitボタンが押されたら、処理を止め以降の処理を実行する。
  $('.weather').submit(function(e) {
    e.preventDefault();
    // 結果表示欄を、初期値に戻す。
    document.getElementById('result').innerHTML = defaultHTML;
    // submitボタンの有効化。
    var submitButton = $('.weather__main__button--submit')
    submitButton.prop('disabled', false);
    // APIにselectのvalueを送り検索をかける
    var cityName = $(this).find('#name').prop('value');
    var requestUrl = 'http://api.openweathermap.org/data/2.5/forecast?APPID=';
        requestUrl += API_KEY + '&q=' + cityName;
    // ajax通信を行う
    $.ajax(requestUrl)
      .done(function(data) {
        if (data.cod == 200) {
          var result_top = $('.weather__result')
          var date = Date(data.list[0].dt)
          // 結果表示用のビューを生成
          build_result_top = build_result_top(date, cityName)
          function build_result_top(date, cityName) {
            var html = 
              `<div class="weather__result__head">
                <div class="weather__result__head--time">
                  <p>Current time :<b>${date}</b></p>
                </div>
                <div class="weather__result__head--text">
                  <p>The weather in<b>${cityName}</b>is ・・・</p>
                </div>
              </div>`
            return html;
          }
          result_top.append(build_result_top)
          // 
          var result_main = $('.weather__result__main')
          result_main.before($(".weather__result__head"));

          var time = 0
          for (var i = 0; i<9; i++) {
          var temp = Math.round(data.list[i].main.temp - ABS_TMP_DIFF)
          var weather = data.list[i].weather[0].main

          // アイコン追加
          if (data.list[i].weather[0].main == "Clear") {
            var resultIcon = 'fa-sun icon-sun'
          }
          if (data.list[i].weather[0].main == "Clouds") {
            var resultIcon = 'fa-cloud icon-cloud'
          }
          if (data.list[i].weather[0].main == "Rain") {
            var resultIcon = 'fa-umbrella icon-rain'
          }

          build_result_main = build_result_main(time, temp, weather, resultIcon)

          function build_result_main(time, temp, weather, resultIcon) {
            var html = 
              `<div class="weather__result__main--time">
                <p>【 Forecast after<b>${time}</b>hours 】</p>
              </div>
              <div class="weather__result__main__weather-temp">
                <div class="weather--result">
                  <p>Weather :<b>${weather}</b><i class="fas ${resultIcon}"></i></p>
                </div>
                <div class="temp--result">
                  <p>Temperature :<b>${temp}</b>°c</p>
                </div>
              </div>`
            return html;
          }
          result_main.append(build_result_main)
          time += 3
          }
          
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
