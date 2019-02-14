---
title: blog upgrade https
modify: 2017-12-18 08:00:00
tags:
 - https
 - blog
---

最近动手开发微信小程序，服务调用需要https后台支持，今天动手把博客的Http协议升级到Https，把过程和遇到的问题记录一下。

<!-- more -->

首先是获取SSL证书，免费的主要有StartSSL和Let's Encrypt，Let's Encrypt由Mozilla、思科、Akamai、IdenTrust和EFF等组织发起，现在已经得到Google、Facebook等大公司的支持和赞助。而StartSSL是一家证书公司，个人还是比较倾向于开源组织，最终选用了Let's Encrypt。

# 一、安装配置证书

Let's Encrypt有脚本可以自动化配置，可以自动获取证书、安装证书、修改nginx配置，流程如下：

1.获取certbot-auto脚本

```
wget https://dl.eff.org/certbot-auto
```



2.使certbot-auto脚本可执行	

```
sudo chmod a+x ./certbot-auto
```



3.运行certbot-auto，安装Certbot   

```
./certbot-auto
```



4.按照提示一步步配置即可，结束后他提示：

```
You should test your configuration at:
https://www.ssllabs.com/ssltest/analyze.html?d=blog.qping.me
```

访问这个网址，等待一会，就可以看到网站配置是否正确了。





# 二、修改Nginx、Tomcat配置

证书没问题以后，查看博客首页发现不加载JS和CSS，浏览器控制台提示：

```
Mixed Content: The page at ‘https://blog.qping.me/‘ was loaded over HTTPS, but requested an insecure image http://blog.qping.me/static/modules/blog/blog.css’. This content should also be served over HTTPS.
```



这是Nginx的请求被转发到tomcat时，没有标注是否是https协议导致的，

配置 Nginx 的转发选项，在 location 中增加：

```
proxy_set_header       Host $host;  
proxy_set_header  X-Real-IP  $remote_addr;  
proxy_set_header  X-Forwarded-For $proxy_add_x_forwarded_for;  
proxy_set_header X-Forwarded-Proto  $scheme;
```



配置Tomcat server.xml 的 Engine 模块下配置一个 Valve：

```
<Valve className="org.apache.catalina.valves.RemoteIpValve"  
    remoteIpHeader="X-Forwarded-For"  
    protocolHeader="X-Forwarded-Proto"  
    protocolHeaderHttpsValue="https"/>
```





# 三、修改外部引用JS协议为Https

由于我的JQuery的JS是引用百度的CDN地址：http://libs.baidu.com/jquery/1.11.1/jquery.min.js，需要将http修改为https，才可正确加载JQuery。



# 四、参考文章：

<http://www.ruanyifeng.com/blog/2014/02/ssl_tls.html>

<http://www.ruanyifeng.com/blog/2016/08/migrate-from-http-to-https.html>

<http://blog.csdn.net/vfush/article/details/51086274>