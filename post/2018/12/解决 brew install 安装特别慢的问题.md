---
title: solve problem that brew update timeout
modify: 2018-12-14 08:00:00
tags: 
 - brew
---

homebrew安装软件前都会调用 brew update，你就会发现一直卡在那里，等半天也没反应。网上查到的解决方法是更换homebrew的源，比如按下面的命令更换为清华大学的源。

<!-- more -->

```bash
cd "$(brew --repo)"
git remote set-url origin https://mirrors.tuna.tsinghua.edu.cn/git/homebrew/brew.git
cd "$(brew --repo)/Library/Taps/homebrew/homebrew-core"
git remote set-url origin https://mirrors.tuna.tsinghua.edu.cn/git/homebrew/homebrew-core.git
```

# 1、 让终端走代理

但还是很慢，慢的想砸电脑。干脆让终端走ss代理。

```bash
export ALL_PROXY=socks5://127.0.0.1:1086
```

如果想永久的让终端走代理，需要将这个环境变量写入到配置中。

```bash
echo export ALL_PROXY=socks5://127.0.0.1:1086 >> ~/.bash_profile
```

# 2、使用 SSH 代理

上面配置以后，所有的命令都会走代理，如果不想这样的话，也可以配置ssh协议走代理。首先让homebrew的源都使用ssh协议:

```bash
cd "$(brew --repo)"
git remote set-url origin git@github.com:Homebrew/brew.git
cd "$(brew --repo)/Library/Taps/homebrew/homebrew-core"
git remote set-url origin git@github.com:Homebrew/homebrew-core.git
```

然后设置SSH代理，只有连接 github.com 时才走代理 ：

```bash
sudo vim /etc/ssh/ssh_config
```

在最后增加：

```
Host github.com *.github.com
   ProxyCommand nc -v -x  127.0.0.1:1086 %h %p  
   IdentityFile ~/.ssh/id_rsa
   User qping
```

# 3、让 Git 使用 HTTP 代理

还有一种方法是git可以使用http代理

```bash
git config --global http.proxy 'socks5://127.0.0.1:1086'
git config --global https.proxy 'socks5://127.0.0.1:1086'
```

设置完后，可以查看一下

```bash
git config --list
```

如果以后不想要了，可以取消掉http代理

```bash
git config --global --unset http.proxy
git config --global --unset https.proxy
```

# 4、总结

第一种方法设置后还是总是很卡。

第二种只有ssh连接github才走代理，影响最小，很完美。

第三种git使用http协议的操作时，都会走代理。

综上还是第二种比较好。