---
title: dockerfile command add relative path
modify: 2019-01-15 14:26:00
tags:
 - docker
---

在 Dockerfile 中可以使用 add命令将原路径下的文件拷贝到目标路径下，在使用中提示 ADD failed: no source files were specified 错误。

<!-- more -->

字面意思是 ADD 的时候找不到 jar 包文件，看了下 ADD 命令的介绍。

ADD \<源路径> \<目标路径>

* <源路径> 是构建时上下文的路径

* <目标路径> 可以是容器内的绝对路径，也可以是相对于工作目录的相对路径（工作目录可以用 WORKDIR 指令来指定）



那什么是构建上下文的路径呢？

我的工程目录结构是这样的：

```
+ service-test
  + docker
      build.sh
      Dockerfile
  + src
  + target
      service-test-1.0-SNAPSHOT.jar
```

在执行 docker build 时，最后那个点  `.` 就是构建上下文路径，即 bash 执行时所在的当前路径。 上面示例的上下文路径就是  `/service-test/docker/` 

```
docker build -t service-test:v1 -f Dockerfile .
```

在 ADD 命令中源路径不能通过 `../` 来获取上一级目录。如果需要访问上一级目录的资源，可以在 build 时指定上下文路径为上一级  `..`。

最终 build.sh：

```bash
#!/usr/bin/env bash
docker build -t service-test:v1 -f Dockerfile ..
```

最终 Dockerfile:

```bash
FROM java:8
WORKDIR /
ADD target/service-test-*.jar app.jar
CMD java -server -jar -Xms128m -Xmx256m app.jar
```

