---
title: ofen use linux shell logs in 2017
modify: 2017-11-20 09:36:03
tags:
 - linux
---

记录下常用的linux命令~

<!-- more -->

## 查找文件或者文件夹

在跟路径下查找包含关键字tomcat的文件夹

```
find / -name '*ids3.0*' -type d
```



参数说明：

-print                          #将查找到的文件输出到标准输出

-name   filename        #查找名为filename的文件

-type     b/d/c/p/l/f       #查是块设备、目录、字符设备、管道、符号链接、普通文件



## **删除文件夹下所有的指定文件**

```
find ./ -name README.md -exec rm -rf {} \;
```



## 运行shell脚本

```
nohup ./my-shell-script.sh &
```



备注：

1 使用&符号在后台执行命令或脚本后，如果你退出登录，这个命令就会被自动终止掉。要避免这种情况，你可以使用nohup。

2  ./startup.sh使用第一行定义的shell程序来执行此脚本。而sh startup.sh是使用系统目录中的sh命令来运行shell脚本。

## 杀死包含关键字的进程

```
kill -9 `ps -ef|grep "apache-tomcat-7.0.47"|grep -v "grep"|awk '{print $2}'`
```



## 查看硬盘大小占用情况

```
df -l
```



查看各目录下硬盘占用情况

```
du -h --max-depth=1
```