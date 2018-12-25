<!-- {title_en:'Docker run nginx in docker', comment:true, modify:'2018-12-20', tags:['docker', 'container', '容器'], summary:'Docker是Linux的一种虚拟化容器技术，相比于传统的虚拟机，虚拟化容器并不是完整的操作系统，而是对进程进行隔离，有着启动快、占用资源少、体积少等优点。下面演示下如何在Docker中构建一个简单的web应用。'} -->

# Docker(1) 创建提供web服务的容器

Docker 是 Linux 的一种虚拟化容器技术，相比于传统的虚拟机，虚拟化容器并不是完整的操作系统，而是对进程进行隔离，有着启动快、占用资源少、体积少等优点。有了 Docker 再也不用担心环境问题了。下面演示下如何在Docker 中构建一个简单的 web 应用。

首先下载镜像，然后运行一个名字为 nginx_test 的容器，将容器的 80 端口映射到宿主机的 8085 端口，并打开标准输入输出流。

```bash
> docker pull ubuntu
> docker run -p 8085:80 --name=nginx_test -it ubuntu /bin/bash
```

执行上面的命令后，就进入到容器内部了。这个时候安装 nginx，并在 /var/www/html 下创建 index.html

``` bash
> apt-get install -y nginx
> echo 'hello world' > /var/www/html/index.html
```

在容器内部通过 `Ctrl + P` `Ctrl + Q` 退出。浏览器中打开 http://127.0.0.1:8085 即可看到刚刚创建的 hello world 页面。

其他 Docker 的一些命令介绍：

* 启动容器： docker run nginx_test
* 停止容器： docker stop nginx_test 
* 查看容器详细信息：docker inspect nginx_test
* 查看容器中进程： docker top nginx_test 
* 查看容器端口：docker port nginx_test
* 在容器中执行指定命令： docker exec nginx nginx_test
* 进入容器内部： docker attach nginx_test

可以通过命令`docker commit -m "comment" -a "author" nginx_test image_name:image_version`将容器重新打包为一个镜像,

### 错误记录

1、运行 `apt-get install nginx` 时，提示 Unable to locate package。

解决方法：运行 `apt-get update`

