var mongoose = require("mongoose");
var getCityModel = require('./userCityModel');
var config = require('./config');

function getCity(sender_uid, callback) {
    check(sender_uid, function (err, num) {
        if (num === 0) {
            callback(0, config.noCity);
        } else {
            getCityModel.find({
                sender_uid: sender_uid
            }, function (error, docs) {
                callback(1, docs[0].area);
            });
        }
    });
}

function check(sender_uid, callback) {
    getCityModel.find({
        sender_uid: sender_uid
    }, function (error, docs) {
        var num = docs.length;
        callback(error, num);
    });
}

module.exports = getCity;