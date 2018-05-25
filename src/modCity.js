var mongoose = require("mongoose");
var modCityModel = require('./userCityModel');
var config = require('./config');


function modCity(sender_uid, city, callback) {
    check(sender_uid, function (err, num) {
        if (num === 0) {
            callback(0, config.noCity);
        } else {
            modCityModel.update({
                sender_uid: sender_uid
            }, {
                area: city
            }, {
                multi: true
            }, function (err, docs) {
                if (err) {
                    callback(0, err);
                } else {
                    callback(1, config.modCitySuccess);
                }
            })
        }
    });
}

function check(sender_uid, callback) {

    modCityModel.find({
        sender_uid: sender_uid
    }, function (error, docs) {
        var num = docs.length;
        callback(error, num);
    });
}

module.exports = modCity;