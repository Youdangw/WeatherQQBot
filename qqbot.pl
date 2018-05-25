 #!/usr/bin/env perl
 use Mojo::Webqq;
 use Webqq::Encryption qw(pwd_encrypt);
 use Digest::MD5 qw(md5_hex);
 my ($host,$port,$post_api);
 
 $host = "0.0.0.0"; #发送消息接口监听地址，没有特殊需要请不要修改
 $port = 5000;      #发送消息接口监听端口，修改为自己希望监听的端口
 $post_api = 'http://127.0.0.1:9007/qqbot';  #接收到的消息上报接口，如果不需要接收消息上报，可以删除或注释此行
 
 my $client = Mojo::Webqq->new(login_type=>"login",account=>'你的QQ号', pwd=>'对应QQ密码的32位md5值');
 $client->load("ShowMsg");
 $client->load("Openqq",data=>{listen=>[{host=>$host,port=>$port}], post_api=>$post_api});
 $client->run();
