<!-- {title_en:'blog code refactoring github webhook', comment:true, modify:'2018-12-16', tags:["博客","架构"]} -->

# 博客重构(2): github webhook的安全验证

webhook 总体流程是在github中配置回调 url，每次 push，github 会向刚刚配置的url发送一个请求。后台接受请求处理部分很简单，但要验证下是否真的是 github 发来的请求，防止被攻击。

文档中是用 ruby 来写的，大致是将 payload 按 HMAC-SHA1 算法验证签名，翻译成 java 代码就如下所示。

```java
@RequestMapping("/callback/github")
@ResponseBody
public String github(@RequestParam("payload") String payload, 
                     @RequestHeader("X-Hub-Signature") String signature){
 	  return isValidRequest(signature, payload); 
}

public boolean isValidRequest(String signature, String payload) {
    // hmacSHA1
    try {
        if(payload == null || signature == null){
            return false;
        }
        SecretKeySpec keySpec = new SecretKeySpec(SECRET_TOKEN.getBytes(), "HmacSHA1");
        Mac mac = Mac.getInstance("HmacSHA1");
        mac.init(keySpec);
        String calc = "sha1=" + Hex.encodeHexString(mac.doFinal(payload.getBytes()));
        return calc.equals(signature);
    } catch (Exception e) {
        e.printStackTrace();
    }
    return false;
}
```

测试的时候发现我计算出来的 signature 和 github 传过来的对不上，最后发现官方文档里接收入参的 ruby 写法是 `payload_body = request.body.read `, 猜想是不是需要直接读取原始的 http body，将 @RequestParam("payload")  改成 ` @RequestBody ` 果然就可以了。

```java
@RequestMapping("/callback/github")
@ResponseBody
public String github(@RequestBody("payload") String payload, 
                     @RequestHeader("X-Hub-Signature") String signature){
    // do something if isValidRequest return true
    return isValidRequest(signature, payload); 
}
```

文档里说 SECRET_TOKEN 最好是设置为系统的环境变量，不要写死在代码里。按下面的写法就可以了。（如果你也是MacOS，也用的 Intellij IDEA ，再配置完 .bash_profile 以后，需要重启下Intellij IDEA，否则得不到刚刚配置的环境变量）

```java
public static String SECRET_TOKEN = System.getenv("GITHUB_WEBHOOK_TOKEN");
```



## 参考文档

[github webhook 官方文档](https://developer.github.com/webhooks/securing/)

