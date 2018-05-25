var mongoose = require("mongoose");
var setCityModel = require('./userCityModel');
var config = require('./config');


function setCity(sender_uid, area, callback) {
    check(sender_uid, function (err, num) {
        if (num) {
            callback(1, config.cityInfoExist);
        } else {
            var user = new setCityModel({
                sender_uid: sender_uid,
                area: area
            });
            user.save(function (err, res) {
                if (err) {
                    console.log(err);
                    callback(1, err);
                } else {
                    callback(0, config.cityInfoStoreSuccess);
                }
            });
        }
    });
}

function check(sender_uid, callback) {
    setCityModel.find({
        sender_uid: sender_uid
    }, function (error, docs) {
        var num = docs.length;
        callback(error, num);
    });
}

module.exports = setCity;