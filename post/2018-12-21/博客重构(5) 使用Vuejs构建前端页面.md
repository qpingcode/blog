<!-- {title_en:'blog code refactoring build front page with vuejs', comment:true, modify:'2018-12-21', tags:['博客','架构'], summary:''} -->

# 博客重构(5) 使用Vuejs构建前端页面

Vuejs 是一个优秀的国产 MVVM 框架，搭配 Element UI 来构建一个单页面的博客系统非常容易。vue-cli 是一个脚手架程序，用于生成基本项目的文件目录、配置文件等等。

  



# 错误记录

1、使用vue-cli创建完项目运行项目提示：`ENOENT: no such file or directory, uv_cwd`

解决方法：新开一个 Terminal 启动项目



2、 Access to XMLHttpRequest at 'localhost:8888/api/blog' from origin 'http://localhost:8081' has been blocked by CORS policy: Cross origin requests are only supported for protocol schemes: http, data, chrome, chrome-extension, https.

解决方法：springboot的controller方法加上注解 @CrossOrigin 仍报错，原因是因为请求前面没有加 http:// 前缀。'localhost:8888/api/blog' 改为 'http://localhost:8888/api/blog' 即可。



3、java.lang.IllegalStateException: Optional long parameter 'page' is present but cannot be translated into a null value due to being declared as a primitive type. Consider declaring it as object wrapper for the corresponding primitive type

解决方法：json的格式接收时后台需要使用@RequestBody来接收，如果是想要自动转化为入参属性。axios发送请求的时候需要将 json 对象转为链接参数，处理如下：

``` js
const service = axios.create({
    baseURL: "", // api的base_url
    timeout: 45000, // 请求超时时间
    transformRequest:[function (data) {
        let ret = ''
        for (let it in data) {
            ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
        }
        return ret
    }]
});

service.interceptors.request.use(config => {
    config.headers['Content-Type'] = 'application/x-www-form-urlencoded' //'application/x-www-form-urlencoded'; //'application/json';
    return config;
});

```

