---
title: install qgis and use
modify: 2019-03-19 08:30:00
tags:
 - gis
---

1、 安装报错，需要python3

https://www.python.org/downloads/mac-osx/

下载python3.6.6安装，`brew install` 的 python 无效

2、中文乱码

Layers > 选择想要的图层右键 > 属性 > Source > Data source encoding 改为 GB18030

![image-20190319165509993](assets/image-20190319165509993.png)

3、过滤南京数据

Layers > 选择想要的图层右键 > fitler > 输入 filter expression > Test 点击后可以看到筛选了多少数据  > OK 确认选择

![image-20190319170942627](assets/image-20190319170942627.png)

4、导出为geojson

Layers > 选择想要的图层右键 > Export > Save Features As >  Format 选择 GeoJSON > OK 确认导出

![image-20190319171305755](assets/image-20190319171305755.png)