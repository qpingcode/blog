---
title: elasticsearch first use install and check
modify: 2019-01-02 08:00:00
tags: 
 - elasticsearch
---

elasticsearch 是一个基于Lucene构建的开源、分布式、restful 接口的全文搜索引擎，elasticsearch还是一个分布式文档数据库，其中每个字段均可被索引，而且每个字段的数据均可被搜索，在PB级数据量级下能提供近实时（秒级）的搜索功能。他可以用来开发商品搜索、日志挖掘等等，比较出名的案例是 github，Github的搜索就是基于 elasticsearch。我会将我学到的内容整理成一个系列，今天先讲安装和初步试用。

<!-- more -->

## 安装

### 中文分词器安装

[下载和你的ES版本匹配的]( https://github.com/medcl/elasticsearch-analysis-ik/releases) release 后解压连文件夹拷贝到 elasticsearch 的 plugins 目录下。



## 初体验

### 查看健康状态

```
127.0.0.1:9200/_cat/health?v
127.0.0.1:9200/_cat/health
```

Status

1. green： 每个 primary shard 和 replica shard 都是 active 状态
2. yellow：每个 primary shard 都是 active 状态，但是部分 replica shard 不是 active 状态，处于不可用状态
3. red：不是所有的 primary shard 都是 active 状态，部分索引数据丢失了

### 创建索引

```
PUT /test_index
DELETE /test_index
```



创建完后可以查看索引状态

```
http://127.0.0.1:9200/_cat/indices?v
```

### 数据的CRUD

数据的创建使用 PUT，PUT 后 elasticsearch 会自动创建 type 和 document 结构

```json
PUT /test_index/blog/1
{
	"name" : "this is a blog",
	"url" : "http://blog.qping.me/test",
	"tags": [	
		"blog", "test"
	]
}
```

查看全部或者查看指定 ID 通过 GET

```
GET /test_index/blog/_search
GET /test_index/blog/1
```

可以重新 PUT 进行整体替换，或者通过 POST 更新

```
POST /test_index/blog/1/_update
{
  "doc":{
    "name": "this is a new blog"
  }
}
```

删除的话直接通过 DELETE

```
DELETE /test_index/blog/1
```



### mapping 结构修改

默认直接 PUT 数据会自动创建结构也可以直接创建指定的mapping

```
PUT test_index
{
	"settings" : {
      "analysis" : {
        "analyzer" : {
          "ik" : {
            "tokenizer" : "ik_max_word"
          }
        }
      }
	},
    "mappings" : {
      "blog" : {
        "dynamic" : true,
          "properties" : {
            "title":{
              "type":"text",
              "analyzer" : "ik_max_word",
              "search_analyzer": "ik_max_word"
			}
          }
       }
    }
}
```



如果是对已创建的进行修改，可以使用以下 JSON

```
PUT test_index/blog/_mapping
{
  "properties": {
    "author":{
      "type":"keyword"
    }
  }
}
```



测试中文分词

```
POST test_index/_analyze
{
	"analyzer": "ik",
	"text": "我是中国人"
}
```



