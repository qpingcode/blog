#### JVM

##### GC

垃圾回收基本原理、几种常见的垃圾回收器的特性、重点了解 CMS （或 G1 ）以及一些重要的参数

##### 内存区域

能说清 jvm 的内存划分

#### 常见问题

- CMS GC 回收分为哪几个阶段？分别做了什么事情？
- CMS 有哪些重要参数？
- Concurrent Model Failure 和 ParNew promotion failed 什么情况下会发生？
- CMS 的优缺点？
- 有做过哪些 GC 调优？
- 为什么要划分成年轻代和老年代？
- 年轻代为什么被划分成 eden、survivor 区域？
- 年轻代为什么采用的是复制算法？
- 老年代为什么采用的是标记清除、标记整理算法
- 什么情况下使用堆外内存？要注意些什么？
- 堆外内存如何被回收？
- jvm 内存区域划分是怎样的？

推荐文章：[JVM 垃圾回收历险](https://github.com/farmerjohngit/myblog/issues/3)