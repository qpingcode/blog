##### synchronized

了解偏向锁、轻量级锁、重量级锁的概念以及升级机制、以及和 ReentrantLock 的区别

##### CAS

了解 AtomicInteger 实现原理、CAS 适用场景、如何实现乐观锁

##### AQS

了解 AQS 内部实现、及依靠 AQS 的同步类比如 ReentrantLock、Semaphore、CountDownLatch、CyclicBarrier 等的实现

##### ThreadLocal

了解 ThreadLocal 使用场景和内部实现

##### ThreadPoolExecutor

了解线程池的工作原理以及几个重要参数的设置



#### A&Q

- synchronized 与 ReentrantLock 的区别？
- 乐观锁和悲观锁的区别？
- 如何实现一个乐观锁？
- AQS 是如何唤醒下一个线程的？
- ReentrantLock 如何实现公平和非公平锁是如何实现？
- CountDownLatch 和 CyclicBarrier 的区别？各自适用于什么场景？
- 适用 ThreadLocal 时要注意什么？比如说内存泄漏?
- 说一说往线程池里提交一个任务会发生什么？
- 线程池的几个参数如何设置？
- 线程池的非核心线程什么时候会被释放？
- 如何排查死锁？



推荐阅读：

[死磕 Synchronized 底层实现--概论](https://github.com/farmerjohngit/myblog/issues/12)