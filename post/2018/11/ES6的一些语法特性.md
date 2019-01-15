---
title: something about es6
modify: 2018-11-18 08:00:00
tags: 
 - es6
---

记录下最近遇到的几个es6的新语法～

<!-- more -->

# 1、 箭头函数

ES6允许使用箭头 "=>"来定义函数。举个例子：

```javascript
// 传统函数定义的写法：
var test = function(a, b) {
     return a + b
}

// 可以使用箭头函数解写为：
var test = (a, b) => {
    return a + b
}

// 因为代码只有一行，所以还可以再简单一点：
var test = (a, b) => a + b

// 当入参只有一个时，可以不写括号
var test = a => a + 1

// 没有入参时，写一个空括号
var test = () => 4
```

需要注意的是：箭头函数体内的`this`对象，就是定义时所在的对象，而不是使用时所在的对象。

```javascript
function foo() {
  setTimeout(() => {
    console.log('id:', this.id);
  }, 100);
}

var id = 21;

foo.call({ id: 42 });//42
```



# 2、 参数解构

```javascript
// 传统复制方式：
var aa = 1
var bb = 2
var cc = 3

// ES6 允许使用参数解构来赋值：
let [aa,bb,cc] = [1,2,3]

aa // 1
bb // 2
cc // 3
```

对象也可以使用参数解构：

```javascript
// 传统写法：
var context = {name:"test2", val: 13, pre:"test1"}
var name = context.name

// 新的写法：
let {name, val} = {name:"test2", val: 13, pre:"test1"}
console.log(name)

// 实际上，对象的解构赋值是下面形式的简写
let {name: name, val:val} = {name:"test2", val: 13, pre:"test1"}

// 如果想改变变量名可以这么写：
let {name: other} = {name:"test2", val: 13, pre:"test1"}
console.log(other)
```



解构的实际中的用法：

```javascript
// 很多时候，像函数中传递的是个对象，需要使用的时候需要 对象名 + "." + 属性名
function log(context){
    var a = context.a
    var b = context.b
    // do something with a and b
}

// 使用参数解构的话
function log({a,b}){
    console.log(a)
    console.log(b)

}
```