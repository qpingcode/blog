---
title: solve problem that intellij idea caton while open several projects
modify: 2018-08-24 09:32:23
tags:
 - intellij
---

明明内存还有很多，硬盘、CPU使用率都不高，但IDEA中就特别卡，昨天一整天打一个字卡一下，今天找了下解决办法。

<!-- more -->

环境信息：

​    系统：Mac

​    内存：16G

解决办法：

在应用程序中找到 Intellij IDEA，然后显示包内容，进入文件夹Contents/bin

修改 idea.vmoptions 中以下项：

```properties
-Xms1024m
-Xmx4096m
-XX:MaxMetaspaceSize=512m
```



说明：
1.Xms1024m,最小内存设置1G
2.Xmx4096m,最大内存设置4G,原因本人工作用电脑内存8G
3.MaxMetaspaceSize=512m,元数据区,jdk8前是方法区内存大小

重启Intellij IDEA