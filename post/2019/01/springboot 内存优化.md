---
title: optimize springboot memory 
modify: 2019-01-15 10:50:00
tags: 
 - elasticsearch
---



我本机跑 SpringBoot 的项目内存刚启动就达到了 420M，阿里云的服务器一共才 1G 的内存，这只能跑2个微服务项目了。每个微服务都很简单，根本不用这么多内存，今天优化下内存使用。

<!-- more -->

1、tomcat 线程数量优化

Spring boot自带的tomcat线程数默认值为200个，我们没有这么大的并发量，这里修改Spring boot的配置application.properties的内容

``` properties
 server:
 	tomcat:
 		max-threads : 10
```

2、 JIT 优化关闭

JIT 是 JVM 为了优化执行频率比较高的字节码设计的技术，JIT 把字节码编译为机器码，之后执行则不需要解释字节码，直接运行机器码即可。我们的服务没有什么负载，即使不优化也不受影响，这里的优化是把 JIT 关掉，在 Java 启动的参数中添加  `-Djava.compiler=NONE` ，这样就不会再有 CompilerThread 了。

我实际测试了下加了这个参数会减少30M左右的内存，但是方法执行耗时会增加10倍以上。

3、使用 server 模式

```java
java -server -jar springboot-1.0.jar
```

server 模式下启动会变慢，但是执行速度会变快，下面是测试的性能对比。我实际测试了，无法感知差别。

4、指定堆内存

```java
java -server -Xms512m -Xmx768m -XX:ParallelGCThreads=2 -jar springboot-1.0.jar
```

-Xms : 设置Java堆栈的初始化大小

-Xmx : 设置最大的java堆大小

-XX:ParallelGCThreads : 设置 GC 的线程数

5、总结

原本内存占用为 430m，优化后内存为220m，还可以接受。