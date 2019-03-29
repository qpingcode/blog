#### Redis （或其他缓存系统）

redis 工作模型、redis 持久化、redis 过期淘汰机制、redis 分布式集群的常见形式、分布式锁、缓存击穿、缓存雪崩、缓存一致性问题

推荐书籍：《*Redis* 设计与实现》

推荐文章：

<https://github.com/farmerjohngit/myblog/issues/1>

<https://github.com/farmerjohngit/myblog/issues/2>

<https://github.com/farmerjohngit/myblog/issues/5>

#### 常见问题

- redis 性能为什么高?
- 单线程的 redis 如何利用多核 cpu 机器？
- redis 的缓存淘汰策略？
- redis 如何持久化数据？
- redis 有哪几种数据结构？
- redis 集群有哪几种形式？
- 有海量 key 和 value 都比较小的数据，在 redis 中如何存储才更省内存？
- 如何保证 redis 和 DB 中的数据一致性？
- 如何解决缓存穿透和缓存雪崩？
- 如何用 redis 实现分布式锁？