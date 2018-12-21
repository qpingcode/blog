<!-- {title_en:'Kubernetes design concept', comment:true, modify:'2018-12-17', tags:['k8s','架构'], summary:''} -->

Kubernetes API 设计理念

1. 所有命令都是声明式，所有的操作都是稳定的，所有的命令的对象都是名词。
2. 以系统调度管理容器作为基础来设计。

控制机设计原则

1. 假定任何错误的可能，做容错处理
2. 每个模块在出错后可以自动恢复
3. 每个模块在必要的时候可以优雅降级，在系统设计时清晰划分基本功能和高级功能，保证基本功能不依赖于高级功能，不会因为高级功能的奔溃影响基本功能

Kubernetes 网络

1. CNI（Container Network Interface）： Flannel、Calico、Weave
2. Pod网络：每个Pod网络互联互通

Kubernetes scheduler - preselect 预选规则，决定哪个pod调度到哪个node上

1. NodiskConflict 没有挂载冲突
2. CheckNodeMemoryPressure 只有内存压力为0的节点可以调度
3. NodeSelector 可以指定hostname或者某些标签的节点
4. FitResource Node必须满足CPU、GPU的要求
5. Affinity 一个POD最好和另外一个POD运行在一起，一个POD最好不要和另外一个POD运行在一起等

Kubernetes scheduler - optimize-select 优选规则

1. SelectorSpreadPriority 同一个Service或者Controller尽量分布在不同的机器上
2. LeaseRequestedPriority 节点空闲越高，分数越大
3. AffinityPriority 

