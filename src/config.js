var config = {
    port: 9007,
    mongoUrl: 'mongodb://localhost:10001/qqbot',
    APIUrl: 'https://free-api.heweather.com/s6',
    APIKey: '*************************',
    openQQUrl: 'http://localhost:5000/openqq',

    getQNumFailed: '获取身份失败，这是由于账号密码登录失败引起的，详情参见 https://github.com/sjdy521/Mojo-Webqq/issues/183',
    getCityFailed: '获取位置信息失败，请联系主人获取帮助',
    getWeatherFailed: '获取天气信息失败，请联系主人获取帮助',
    modCityFailed: '修改位置信息失败，请联系主人获取帮助',
    setCityFailed: '设置位置信息失败，请联系主人获取帮助',

    noCity: '此账号尚未绑定位置，请先使用/setcity命令绑定之',
    modCitySuccess: '位置信息修改成功！',
    cityInfoStoreSuccess: '位置信息存储成功！',
    cityInfoExist: '您已经存储过位置信息，请使用 /modcity,城市名称 命令修改之',
}

module.exports = config;