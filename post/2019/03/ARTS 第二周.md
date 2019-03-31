---
title: ARTS 2
modify: 2019-03-31 19:49:00
tags:
 - ARTS
---

打卡，上一周处于不断加班中，断了一周，这周继续。

<!-- more -->

# Algorithm

[322. Coin Change](https://leetcode.com/problems/coin-change)：You are given coins of different denominations and a total amount of money *amount*. Write a function to compute the fewest number of coins that you need to make up that amount. If that amount of money cannot be made up by any combination of the coins, return `-1`.

**Example 1:**

```
Input: coins = [1, 2, 5], amount = 11
Output: 3 
Explanation: 11 = 5 + 5 + 1
```

**Example 2:**

```
Input: coins = [2], amount = 3
Output: -1
```

**Note**:
You may assume that you have an infinite number of each kind of coin.

题目的意思是有不同面值的硬币，比如 1块、5块、10块，给一张整钱，比如100块，兑换成等额的零钱，且硬币数量最少。

```
 思考：
 1、类似于数学问题
          函数： a1 * m1 + a2 * m2 + ...... + an * mn = amount
          给定 m1、m2、....、mn 和 amount
          求 a1 + a2 + .... + an 的最小值

 2、优先使用大额度的钞票，output才会是最小
    比如 coins = [1, 2, 5]  amount = 15
    可以得出： (3) * 5 = 15 ==> output = 3

 3、如果大额的钞票不能凑整，则使用小额面值
    比如 coins = [1, 2, 5] amount = 14
    可以得出： (2) * 5 + (2) * 2 ==> output = 4

 4、如果优先使用大额钞票后，剩下的无法凑成amount的问题，则 大额钞票数 -1 继续运算。
    比如 coins = [3, 13, 14] amount = 30
    可以得出： 30 除以 14 等于 2 余 2，无法凑整
    可以使用： (1) * 14 + (1) * 13 + (1) * 3 ==> output = 3

 5、如果钞票面额相差过于接近，比如 coins = [15,14,1]  amount=28 ，
    优先使用大额，结果为 (1) * 15 + (13) * 1，期望结果应该是 (2) * 14，
    为解决这个问题，需要遍历所有的情况才能得出最终结果

 6、如果当前计算的 output 大于之前计算的 output，可以终止循环，节省时间
```

[最终代码实现](<https://github.com/qpingcode/leetcode-java/blob/master/src/main/java/me/qping/learning/CoinChage.java>)

# Review



# Tip



# Share

分享一只盯着眼睛看的猫头鹰

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

