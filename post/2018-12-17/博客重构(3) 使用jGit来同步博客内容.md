<!-- {title_en:'blog code refactoring use jGit to sync blogs', comment:true, modify:'2018-12-17', tags:['博客','架构'], summary:'在接收到 github 的回调请求后，需求使用 git pull 来下载最新的博客文章。使用 jGit 可以很方便的在 Java 中调用 Git 命令，在 eclipse 中也是使用它来开发的插件。'} -->

# 博客重构(3) 使用 jGit 来同步博客内容

在接收到 github 的回调请求后，需求使用 git pull 来下载最新的博客文章。使用 jGit 可以很方便的在 Java 中调用 Git 命令，在 eclipse 中也是使用它来开发的插件。

首先在项目中引入 Maven 依赖。

```xml
<dependency>
    <groupId>org.eclipse.jgit</groupId>
    <artifactId>org.eclipse.jgit</artifactId>
    <version>5.2.0.201812061821-r</version>
</dependency>
```

主要是使用两个接口，一个是当项目没有初始化的时候调用 git clone，另一个是当项目初始化过但需要更新时调用 git pull。

git clone实现如下：

```java
try (Git result = Git.cloneRepository()
        .setURI(gitRemote)
        .setDirectory(gitLocalFile)
        .call()) {
    // Note: the call() returns an opened repository already which needs to be closed to avoid file handle leaks!
    System.out.println("Having repository: " + result.getRepository().getDirectory());
}
```



git pull实现如下：

```java
Repository existingRepo = new FileRepositoryBuilder()
        .setGitDir(new File(gitLocal + "/.git"))
        .build();

try (Git git = new Git(existingRepo)) {
    PullResult result = git.pull().call();

    FetchResult fetchResult = result.getFetchResult();
    MergeResult mergeResult = result.getMergeResult();

    System.out.println("Merge result: " + mergeResult.getMergeStatus());
}
```



[jgit cookbook](https://github.com/centic9/jgit-cookbook) 列了很多使用场景，直接搜关键字就可以看到示例代码了。



## 参考文档

[jgit cookbook](https://github.com/centic9/jgit-cookbook)





