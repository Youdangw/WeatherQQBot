# WeatherQQBot

这是一个基于Mojo-WebQQ项目的QQ天气机器人简易实现，主要功能由Nodejs完成。

### 安装说明：

- 确保已正确安装NodeJs与Perl环境以及MongoDB数据库，并且安装好`Mojo::Webqq`与`Webqq::Encryption`模块。（Perl以及其相关模块的安装请参照[这里](https://github.com/sjdy521/Mojo-Webqq#%E5%AE%89%E8%A3%85%E6%96%B9%E6%B3%95)以及[这里](https://github.com/sjdy521/Webqq-Encryption)。

- 执行以下命令获取程序及其相关依赖。

  ```sh
  git clone https://github.com/zsakvo/WeatherQQBot.git
  cd WeatherQQBot
  npm install
  ```

- 程序不自带相关的key，所以请自行注册获取（[点我跳转注册](https://console.heweather.com/register)）。

- 按照需求自行编辑`src/config.js`文件，其中主要项目对应如下：

  > port：与`qqbot.pl`中`$post_api`相对应
  > 
  > mongoUrl：你要连接的MongoDB数据库地址
  > 
  > APIUrl：和风天气API的主地址，无需修改
  > 
  > APIKey：自行申请后将控制台内你的key值填入此处（必填）
  > 
  > openQQUrl：openQQ的API地址，其中端口与`qqbot.pl`中的`$port`相对应

- 编辑`qqbot.pl`文件，按照提示修改或直接填入自己的QQ号以及对应密码的32位MD5值。

- 在终端中执行命令`node src/qqbot.js` （推荐`forever start src/qqbot.js`）

- 新开一个终端，执行`perl qqbot.pl`，按屏幕提示扫描二维码登录即可

### 注意事项：

- 出于消息发送的精准性考虑，本程序需要获取到好友QQ号才能完成位置绑定，而smartQQ本身不支持此功能，所以需要填入QQ号与其密码的MD5值在qun.qq.com进行登录以获取必要信息。但是如果异地登录会出现验证码导致登录失败，具体的解决方案请参照https://github.com/sjdy521/Mojo-Webqq/issues/183

- 本程序的天气自动推送时间为早7点以及下午1点，具体逻辑在autoWeather.js的scheduleCronstyle函数中实现，请按需自行修改。

- QQ号相关的位置信息经urlencode后保存在MongoDB数据库中，所以推荐自行搭建而不是共用（不介意的另说）

### 部分参数：

- /setcity,城市名  给当前发信QQ号绑定位置信息

- /modcity,城市名  修改当前QQ的位置信息

- /w  立即查询当前天气状况

- 注意，上面命令中的逗号均为半角（即英文状态下输入）！

### TODO：

- 更多的身份识别方式（在QQ号获取失败的情况下作为辅助方案）

- 降水及其他异常天气的提前通知（相中的API依旧没申请到QAQ）

- 优化逻辑
