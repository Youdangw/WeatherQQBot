var request = require('request');
var config = require('./config');

function getWether(param0, callback) {
    var url = config.APIUrl + '/weather/now?location=' + param0 + '&key=' + config.APIKey;
    request(url, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            var result = JSON.parse(body).HeWeather6[0];
            var wnow = result.now;
            if (result.status === 'ok') {
                var message = '您所在位置' + wnow.cond_txt + '，' + wnow.wind_dir + wnow.wind_sc + '级，气温' + wnow.tmp + '℃。';
                callback(0, message);
            } else {
                callback(1, result.status);
            }
        } else {
            callback(1, null);
        }
    })
}

module.exports = getWether;