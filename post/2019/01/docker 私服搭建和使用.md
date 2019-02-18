---
title: docker registry run and use
modify: 2019-01-15 14:27:00
tags:
 - docker
---

在 https://hub.docker.com/ 注册一个账号并上传镜像，上传后所有人都可以搜索和看到，如果有些镜像只想自己用，可以搭建自己的私服。

<!-- more -->

# 安装

```
docker run -d -p 5000:5000 --restart=always --name registry -v /opt/data/registry:/var/lib/registry registry 
```



# 使用

上传镜像

```
# 标记
docker tag blog:v2.1 docker.qping.me:5000/blog:v2.1
# 推送到私服
docker push docker.qping.me:5000/blog:v2.1
```

查看仓库中镜像：

```
 curl docker.qping.me:5000/v2/_catalog
```

查看仓库中某个镜像的标签列表：

```
curl docker.qping.me:5000/v2/blog/tags/list
```

拉取镜像

```
docker pull docker.qping.me:5000/blog:v2.1
```

因为 docker 默认不允许非 https 推送镜像，我们可以通过 Docker 的配置选项来取消这个限制。在 ubuntu 16 中，在 `/etc/docker/daemon.json` 中写入如下内容 ：

```json
{
  "registry-mirror": [
    "https://registry.docker-cn.com"
  ],
  "insecure-registries": [
    "docker.qping.me:5000"
  ]
}
```

（这个是在客户端修改的，不是registry那台服务器需要修改，mac版本可以在 preference > daemon > Insecure registries 增加 docker.qping.me:5000）

# 参考

[私服搭建教程](https://yeasy.gitbooks.io/docker_practice/repository/registry.html)