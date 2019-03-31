---
title: ARTS 2
modify: 2019-03-31 19:49:00
tags:
 - ARTS
---

打卡，上一周处于不断加班中，断了一周，这周继续。

<!-- more -->

# Algorithm

[硬币兑换零钱](https://leetcode.com/problems/coin-change)：有不同面值的硬币，比如 1块、5块、10块，给一张整钱，比如100块，兑换成等额的零钱，且硬币数量最少。[最终代码实现点这里可以看到](https://github.com/qpingcode/leetcode-java/blob/master/src/main/java/me/qping/learning/CoinChage.java)。解题思路如下：

```
思考：
1、类似于数学问题
函数： a1 * m1 + a2 * m2 + ...... + an * mn = amount
给定 m1、m2、....、mn 和 amount
求 a1 + a2 + .... + an 的最小值

2、优先使用面值大的硬币，output才会是最小
比如 coins = [1, 2, 5]  amount = 15
可以得出： (3) * 5 = 15 ==> output = 3

3、如果面值大的硬币不能凑整，则使用面值小的
比如 coins = [1, 2, 5] amount = 14
可以得出： (2) * 5 + (2) * 2 ==> output = 4

4、如果优先使用面值大的硬币后，剩下的无法凑成amount的问题，则 面值大的硬币数 -1 继续运算。
比如 coins = [3, 13, 14] amount = 30
可以得出： 30 除以 14 等于 2 余 2，无法凑整
可以使用： (1) * 14 + (1) * 13 + (1) * 3 ==> output = 3

5、如果硬币面值相差过于接近，比如 coins = [15,14,1]  amount=  28 ，
结果为 (1) * 15 + (13) * 1，期望结果应该是 (2) * 14，
为解决这个问题，需要遍历所有的情况才能得出最终结果

6、如果当前计算的 output 大于之前计算的 output，可以终止循环，节省时间
```



# Review

原文地址： [js模块化演进历史](https://ponyfoo.com/articles/brief-history-of-modularity)

### 闭包

最早的 javascript 都是使用 `<script>` 标签内嵌到 html 中，所有的脚本文件都共享一个全局范围。任何脚本定义的变量都可以绑定在window上，导致冲突和依赖问题。为了解决这个问题，引入了立即调用函数表达式  IIFE  ( Immediately-invoking function expressions  ) 。如下

``` javascript
(function() {
  console.log('IIFE using parenthesis')
})()

~function() {
  console.log('IIFE using a bitwise operator')
}()

void function() {
  console.log('IIFE using the void operator')
}()
```

 IIFE 将变量范围限制在闭包内部，永远不会成为隐式的全局变量，很好的解决了冲突问题。IIFE 也有依赖树的问题，开发人员按精确的顺序引入脚本，一个脚本依赖的模块，必须在它们之前加载。

### RequireJS，AngularJS 和依赖注入

RequireJs 依赖注入的出现很好的解决了依赖树的问题，我们可以明确地命名每个模块的依赖关系。

``` javascript
define(['mathlib/sum'], function(sum) {
  return { sum }
})

require(['mathlib'], function(mathlib) {
  mathlib.sum(1, 2, 3)
  // <- 6
})
```

RequireJS 的问题在于执行业务代码之前，需要像瀑布一样发出几百个网络请求，异步加载依赖的模块。

### Node.js 和 CommonJS 的出现

Node.js 的众多创新之一是 CommonJS ，CommonJS标准更符合传统的模块加载机制。在 CommonJS 中，每个文件都是一个具有自己的范围和上下文的模块。使用 `require` 可以在模块生命周期中的任何时间动态调用的同步函数来加载依赖项，如下所示。

```javascript
const mathlib = require('./mathlib')
```

与 RequireJS 和 AngularJS 非常相似，CommonJS 依赖关系也由路径名引用。主要区别在于模版函数和依赖关系数组现在都已消失，并且模块的接口可以分配给变量绑定，或者可以在任何可以使用JavaScript表达式的地方使用。

在 RequireJS 和 AngularJS 中，每个文件可以有许多动态定义的模块，而 CommonJS 在文件和模块之间有一对一的映射。同时，RequireJS 和 AngularJS 有几种声明模块的方法，而 CommonJS 只有一种声明模块的方式。任何JavaScript文件都是一个模块，调用 `require` 会加载依赖项，分配给 `module.exports` 它的任何东西都是它的接口。

### ES6，Babel 和 Webpack

ES6规范包括 JavaScript 原生的模块系统，通常称为 ESM ( ECMAScript Modules ). ESM 很大程度上受 CommonJS 的影响，提供一个静态声明 API 和一个基于 promise 的动态编程 API.

``` javascript
// static declarative API 
import mathlib from './mathlib'

// a promise-based dynamic programmative API
import('./mathlib').then(mathlib => {
  // …
})
```

在 ESM 中每个文件都是具有自己的范围和上下文的模块。ESM 相对于 CommonJS 的优势在于支持静态引入模块。大家都知道 `import` 必须要写在文件的顶层，这也就是为了能够静态分析你需要加载的模块。

首先他能很好的解决循环依赖的问题。

其次是异步加载。在 CommonJS 中，JS 的加载是同步进行的，也就是说我必须要等待上一个 JS 加载完成，才能够加载下一个 JS，这也就会导致如果 JS 文件过多，系统的启动时间会被大大加长。而在 ESM 中， JS 引擎对脚本静态分析的时候，遇到模块加载命令`import`，就会生成一个只读引用。等到脚本真正执行时，再根据这个只读引用，到被加载的那个模块里面去取值。

具体可以参考阮一峰老师的教程，有详细说明：<http://es6.ruanyifeng.com/#docs/module-loader>



# Tip

当事情很多时，不要焦虑，来一件事就做掉，来一件事就做掉。忙只是一件事接一件事。

from: 陈果



# Share

分享一只猫头鹰，眼睛会看着鼠标

<plugin name="plugin-owl" params="{}"></plugin>

核心代码是计算眼珠的位置

``` javascript
// 计算以x0,y0画一个半径为r的圆，将圆心和(x1,y1)连成一条线，计算线与圆的交点坐标
function getPostion(x1, y1, x0, y0, r){

  // 转变坐标系，将坐标中心点变为眼睛的中心点
  var x2 = x1 - x0
  var y2 = y1 - y0

  // 以眼框为中心画一个圆，计算在圆上离(x2,y2)最近的点位置
  var distance = Math.sqrt(Math.pow(x2, 2) + Math.pow(y2, 2))
  var x3 = x2 * r / distance
  var y3 = y2 * r / distance

  // 将坐标系还原
  var x4 = x3 + x0
  var y4 = y3 + y0

  return [x4, y4]
}
```

