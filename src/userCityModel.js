var mongoose = require("mongoose");
var config = require('./config');

mongoose.connect(config.mongoUrl);
var db = mongoose.connection.on('open', function () {
    console.log('数据库连接成功！');
});

var userCityModel = db.model('userCity', {
    sender_uid: Number,
    area: String
});

module.exports = userCityModel;