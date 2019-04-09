---
title: LaTex and Mathjax
modify: 2019-04-09 10:01:00
tags:
 - LaTex
 - Mathjax
---

LaTeX 是一种基于 TeX 的排版系统，每一个 LaTeX 命令实际上最后都会被转换解释成几个甚至上百个 TeX 命令。而 TeX 由高德纳 ( Donald Knuth ) 发明并创造，他最早开始自行编写 TeX 的原因，是因为当时的计算机排版技术十分粗糙，已经影响到他的巨著《计算机程序设计艺术》的印刷质量。他以典型的黑客思维模式，决定自行编写一个排版软件，其后花费十年编写完成，TeX 很成功，受到了很多科学团队的青睐。

MathJax 是一个开源的 JavaScript 引擎，使用 MathJax 可以方便的在浏览器中显示数学公式，不需要使用图片。目前，MathJax 可以解析 LaTeX、MathML 和 ASCIIMathML 的标记语言。

<!-- more -->

由于 LaTex 特别复杂，这里只介绍一部分基础而常用的功能。



# 呈现方式

LaTeX 按呈现方式可分为两类：行内公式和行间公式。

1. 行内公式嵌在正文内，格式为： `$ ... $` ，例如我可以在这句话中表达 $E=MC^2$  和 $ \frac{1}{2} $ 。
2. 行间公式与正文分开，在两行之间显示，格式为：`$$ ... ​$$`



# 上标和下标

上标的命令是 `^{...}` ，下标的命令是 `_{...}` ，大括号中是角标内容，当角标是单个字符时可以不用大括号。例子：

```
$ a^2 $
$ a^{2b} $
$ x_{n} $
$ x^2_n $
```

效果：
$$
a^2 \ 
a^{2b} \  
x_{n} \ 
x^2_n \
$$
如果在左右上下都需要角标，可以使用 `\sideset` 命令。比如：`\sideset{^1_2}{^3_4}\bigotimes`  

效果：$\sideset{^1_2}{^3_4}\bigotimes$



# 平均值

命令为：`\bar x` 或者 `\bar{x}` ，效果为：$\bar{x} $

其他类似的还有：`\hat` ，`\widehat `  ，`\overline` ，`\vec` ，`\overrightarrow` ，`\dot` ，`\ddot`。

效果：
$$
\hat x \
\widehat{xyz} \
\overline{xyz} \
\vec x \
\overrightarrow{xyz} \
\dot{x} \ 
\ddot x \
$$


# 分式

分式命令为： `\frac{分子}{分母}`

比如：`\frac{1}{x+y}` ，效果：$ \frac{1}{x+y} $

比如：`\frac{1}{x+\frac{1}{y}}` ，效果：$ \frac{1}{x+\frac{1}{y}} $

还可以使用 `\over` ，比如： `$ a+1 \over b+1 $` ，效果为：$a+1\over b+1​$

比较简单的分式可以使用 `1/2` 的方式



# 开方

开根号命令为：`\sqrt[n]{...}` 

比如： `\sqart{x+y}` ，效果：$\sqrt{x+y}$

比如： `\sqart[3]{x+y}` ，效果：$\sqrt[3]{x+y}$



# 求和与积分

求和命令为：`\sum` ，下标表示求和下限，上标表示上限。

比如：`\sum_1^n` ，效果：$\sum_1^n$

积分的命令为：`\int`，同样地，其上下标表示积分的上下限。

比如：`\int_1^\infty` ，效果：$\int_1^\infty$ 

与此类似的符号还有，`\prod`  $\prod​$ ，`\bigcup` $\bigcup​$，`\bigcap`  $\bigcap​$，`\iint`   $\iint​$。



# 括号

小括号`()`和中括号`[]`都是普通的符号，比如： $ (2+3)[4+4] $

如果想要显示大括号，需要转义 `\{\}` 



# 空格

LaTeX 能够自动处理公式中的大多数字符之间的空格，但是有时候需要自己手动进行控制。

| 类型         | 例子         | 效果         | 宽度           |
| ------------ | ------------ | ------------ | -------------- |
| 紧贴         | `$a\!b$`     | $a\!b$       | 缩进 1/6m 宽度 |
| 没有空格     | `ab`         | $ab$         |                |
| 小空格       | `a\,b`       | $a\,b$       | 1/6m 宽度      |
| 中等空格     | `a\;b`       | $a\;b$       | 2/7m 宽度      |
| 大空格       | `a\ b`       | $a\ b$       | 1/3m 宽度      |
| quad空格     | `a \quad b`  | $a \quad b$  | 一个 m 的宽度  |
| 两个quad空格 | `a \qquad b` | $a \qquad b$ | 两个 m 的宽度  |



# 定界符

这里所谓的定界符是指包围或分割公式的一些符号。

包括： `(` , `)` , `[` , `]` , `\{` , `\}` , `|` , `\|`

在上述这些定界符之前冠以 \left（修饰左定界符）或 \right（修饰右定界符），可以得到自适应缩放的定界符，它们会根据定界符所包围的公式大小自适应缩放。

比如：

```
$$\left( \frac{1}{x+y} \right)$$
```

效果：$$\left( \frac{1}{x+y} \right)$$



# 矩阵

对于少于 10 列的矩阵，可使用 matrix，pmatrix，bmatrix，Bmatrix，vmatrix 和 Vmatrix 等环境。

```
$\begin{matrix}1 & 2 \\ 3 &4\end{matrix}$
$\begin{pmatrix}1 & 2 \\ 3 &4\end{pmatrix}$
$\begin{bmatrix}1 & 2 \\ 3 &4\end{bmatrix}$
$\begin{Bmatrix}1 & 2 \\ 3 &4\end{Bmatrix}$
$\begin{vmatrix}1 & 2 \\ 3 &4\end{vmatrix}$
$\begin{Vmatrix}1 & 2 \\ 3 &4\end{Vmatrix}$
```

效果：
$$
\begin{matrix}1 & 2 \\\\ 3 & 4\end{matrix}   \
\begin{pmatrix}1 & 2 \\\\ 3 & 4\end{pmatrix} \
\begin{bmatrix}1 & 2 \\\\ 3 & 4\end{bmatrix} \
\begin{Bmatrix}1 & 2 \\\\ 3 & 4\end{Bmatrix} \
\begin{vmatrix}1 & 2 \\\\ 3 & 4\end{vmatrix} \
\begin{Vmatrix}1 & 2 \\\\ 3 & 4\end{Vmatrix} \
$$


矩阵中常常需要用到各种省略号，其中

1. `\dots` 生成横着的省略号
2. `\vdots` 生成竖直的省略号
3. `\ddots ` 生成倾斜的省略号



当矩阵规模超过 10 列，或者上述矩阵类型不敷需求，可使用 `array` 环境。该环境可把一些元素排列成横竖都对齐的矩形阵列。

比如：

```
$$
\mathbf{X} =
\left( \begin{array}{cccc}
x_{11} & x_{12} & \ldots & x_{1n}\\
x_{21} & x_{22} & \ldots & x_{2n}\\
\vdots & \vdots & \ddots &			 \\
x_{n1} & x_{n2} & 			 & x_{nn}
\end{array} \right)
\tag{公式1}
$$
```

其中 `{cccc}` 为每行4列，使用居中对齐。`\\` 为换行。数组中的元素使用 `&` 连接。 效果：
$$
\mathbf{X} =
\left( \begin{array}{cccr}
x_{11} & x_{12} & \ldots & x_{1n}\\\\
x_{21} & x_{22} & \ldots & x_{2n}\\\\
\vdots & \vdots & \ddots &			 \\\\
x_{n1} & x_{n2} & 			 & x_{nn}
\end{array} \right)
\tag{公式1}
$$


你也可以在array 环境中画线，如分隔矩阵中元素。

```
\left(\begin{array}{c|c}
1 & 2 \\
\hline
3 & 4
\end{array}\right)

\left(\begin{array}{cc|c}
1 & 2 & 3 \\
4 & 5 & 6
\end{array}\right)
```

$$
\left(\begin{array}{c|c}
1 & 2 \\\\
\hline
3 & 4
\end{array}\right)

\left(\begin{array}{cc|c}
1 & 2 & 3 \\\\
4 & 5 & 6
\end{array}\right)
$$



# 不带上下限的数学算子

例子：

```
$ \log $
$ \lg $
$ \ln $
$ \sin $
$ \cos $
$ \tan $
$ \cot $
$ \dim $
```

效果：
$$
\log \
\lg \
\ln \
\sin \
\cos \
\tan \
\cot \
\dim \
$$


# 希腊字母参考表

|  名称   | 大写 |   Tex    | 小写 |   Tex    |
| :-----: | :--: | :------: | :--: | :------: |
|  alpha  |  A   |    A     |  α   |  \alpha  |
|  beta   |  B   |    B     |  β   |  \beta   |
|  gamma  |  Γ   |  \Gamma  |  γ   |  \gamma  |
|  delta  |  Δ   |  \Delta  |  δ   |  \delta  |
| epsilon |  E   |    E     |  ϵ   | \epsilon |
|  zeta   |  Z   |    Z     |  ζ   |  \zeta   |
|   eta   |  H   |    H     |  η   |   \eta   |
|  theta  |  Θ   |  \Theta  |  θ   |  \theta  |
|  iota   |  I   |    I     |  ι   |  \iota   |
|  kappa  |  K   |    K     |  κ   |  \kappa  |
| lambda  |  Λ   | \Lambda  |  λ   | \lambda  |
|   mu    |  M   |    M     |  μ   |   \mu    |
|   nu    |  N   |    N     |  ν   |   \nu    |
|   xi    |  Ξ   |   \Xi    |  ξ   |   \xi    |
| omicron |  O   |    O     |  ο   | \omicron |
|   pi    |  Π   |   \Pi    |  π   |   \pi    |
|   rho   |  P   |    P     |  ρ   |   \rho   |
|  sigma  |  Σ   |  \Sigma  |  σ   |  \sigma  |
|   tau   |  T   |    T     |  τ   |   \tau   |
| upsilon |  Υ   | \Upsilon |  υ   | \upsilon |
|   phi   |  Φ   |   \Phi   |  ϕ   |   \phi   |
|   chi   |  X   |    X     |  χ   |   \chi   |
|   psi   |  Ψ   |   \Psi   |  ψ   |   \psi   |
|  omega  |  Ω   |  \Omega  |  ω   |  \omega  |



# 参考链接

<https://colobu.com/2014/08/17/MathJax-quick-reference/>

<https://zh.wikibooks.org/zh-hans/LaTeX/%E6%95%B0%E5%AD%A6%E5%85%AC%E5%BC%8F#External_links>

<https://www.cnblogs.com/houkai/p/3399646.html>

<http://mohu.org/info/symbols/symbols.htm>

<https://www.kancloud.cn/thinkphp/latex/41806>

<https://zhuanlan.zhihu.com/p/24502400>

<http://3iter.com/2015/10/14/Mathjax%E4%B8%8ELaTex%E5%85%AC%E5%BC%8F%E7%AE%80%E4%BB%8B>



