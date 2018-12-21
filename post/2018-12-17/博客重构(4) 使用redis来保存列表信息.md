<!-- {title_en:'blog code refactoring use redis to save blog list', comment:true, modify:'2018-12-17', tags:['博客','架构'], summary:'将 github 上的博客文章下载完成以后，将文件列表遍历以后变为一个列表，需要找地方存一下这个列表，当用户通过浏览器访问网站时，生成一个列表页面。考虑到存到内存里没法很方便的管理，我在这里使用了 redis。'} -->

# 博客重构(4) 使用redis来保存列表信息

将 github 上的博客文章下载完成以后，将文件列表遍历以后变为一个列表，需要找地方存一下这个列表，当用户通过浏览器访问网站时，生成一个列表页面。考虑到存到内存里没法很方便的管理，我在这里使用了 redis。

首先引入 redis 依赖。

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-data-redis</artifactId>
    <version>1.4.7.RELEASE</version>
</dependency>
```



Spring 将操作 redis 的方法抽像成了 RedisTemplate 对象，比如需要操作数组相关的，使用 redisTemplate.opsForList() 就可以了，保存方法如下：

```java
redisTemplate.delete("Blogs");
redisTemplate.opsForList().leftPushAll("Blogs", blogs);
```



在调用的时候使用，将分页信息转换为开始位置和结束位置，通过 range 方法获取一页的博客数据。

```java
long total = redisTemplate.opsForList().size("Blogs");
long begin = (page - 1) * size;
long end = page * size > total ? total : page * size;
List<Blog> list = redisTemplate.opsForList().range("Blogs", begin, end);
```

