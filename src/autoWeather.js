var schedule = require("node-schedule");
var request = require('request');
var mongoose = require("mongoose");
var getCityModel = require('./userCityModel');

var config = require('./config');


function scheduleCronstyle() {
    schedule.scheduleJob('0 0 7,13 * * *', function () {
        getWeather();
    });
}

scheduleCronstyle();

// var rule = new schedule.RecurrenceRule();
// rule.dayOfWeek = [0, new schedule.Range(1, 6)];
// rule.hour = 10;
// rule.minute = 08;
// module.exports = schedule.scheduleJob(rule, function () {
//     getWeather();
// });

function getWeather() {
    getCityModel.find({}, function (error, docs) {
        var num = docs.length;
        docs.forEach(element => {
            var city = element.area;
            var qnum = element.sender_uid;
            var url = config.APIUrl + '/weather/now?location=' + city + '&key=' + config.APIKey;
            request(url, function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    var result = JSON.parse(body).HeWeather6[0];
                    var wnow = result.now;
                    if (result.status === 'ok') {
                        var suggestion;
                        if (wnow.cond_code <= 204) {
                            suggestion = '，是个适合出行的好日子哦~';
                        } else if (204 < wnow.cond_code <= 213) {
                            suggestion = '风有点大，小心被吹跑了哦~';
                        } else if (213 < wnow.cond_code <= 313) {
                            suggestion = '外面也许会下雨，出去时拿把伞吧~';
                        } else if (313 < wnow.cond_code <= 407) {
                            suggestion = '大概会下雪，不过貌似不用专门准备什么~';
                        } else if (407 < wnow.cond_code) {
                            suggestion = '天气有点遭，尽量不要出去乱逛了吧~';
                        }
                        var message = '当前天气' + wnow.cond_txt + '，' + wnow.wind_dir + wnow.wind_sc + '级，气温' + wnow.tmp + '℃' + suggestion;
                        var url = config.openQQUrl + '/send_friend_message?uid=' + qnum + '&content=' + encodeURIComponent(message);
                        sendMessage(url);
                    } else {
                        console.log('发送失败');
                    }
                } else {
                    console.log('发送失败');
                }
            })
        });
    });
}

function sendMessage(url) {
    request(url, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            var status = JSON.parse(body).status;
            if (status === '发送成功') {

            } else {
                console.log('发送失败');
            }
        } else {
            console.log('发送失败');
        }
    })
}