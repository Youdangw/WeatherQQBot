const express = require("express");
var bodyParser = require("body-parser");
var getWether = require("./getWeather");
var setCity = require("./setCity");
var modCity = require("./modCity");
var getCity = require("./getCity");
var j = require("./autoWeather");
var config = require('./config');

var app = express();
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());
app.listen(config.port);

app.post("/qqbot", function (req, appRes) {
  var body = req.body;
  if (body.post_type === "receive_message") {
    var sender_uid = body.sender_uid;
    var sender = body.sender;
    var content = body.content;
    var params = content.split(",");
    switch (params[0]) {
      case "/setcity":
        var city = encodeURIComponent(params[1]);
        var sender_uid = body.sender_uid;
        if (sender_uid === null) {
          appRes.json({
            reply: config.getQNumFailed,
            code: 0
          });
        } else {
          setCity(sender_uid, city, function (err, res) {
            if (err) {
              appRes.json({
                reply: config.setCityFailed,
                code: 0
              });
            } else {
              appRes.json({
                reply: res,
                code: 0
              });
            }
          });
        }
        break;
      case "/modcity":
        var city = encodeURIComponent(params[1]);
        var sender_uid = body.sender_uid;
        if (sender_uid === null) {
          appRes.json({
            reply: config.getQNumFailed,
            code: 0
          });
        } else {
          modCity(sender_uid, city, function (err, res) {
            if (!err) {
              appRes.json({
                reply: config.modCityFailed,
                code: 0
              });
            } else {
              appRes.json({
                reply: res,
                code: 0
              });
            }
          });
        }
        break;
      case "/w":
        var sender_uid = body.sender_uid;
        getCity(sender_uid, function (err, res) {
          if (err) {
            getWether(res, function (err, weatherInfo) {
              if (err) {
                appRes.json({
                  reply: config.getWeatherFailed,
                  code: 0
                });
              } else {
                appRes.json({
                  reply: weatherInfo,
                  code: 0
                });
              }
            });
          } else {
            appRes.json({
              reply: config.getWeatherFailed,
              code: 0
            });
          }
        });
        break;
      default:
        appRes.send("ok");
        break;
    }
  } else {
    appRes.send("ok");
    // console.log(body);
  }
});