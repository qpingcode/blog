<html>
	<head>
        <title>${blog.titleCn}- qping's blog</title>
        <meta charset="utf-8">
        <meta name="description" content="${blog.summary!blog.titleCn}">
        <meta name="keywords" content="<#list blog.tags as item>${item} </#list>">

        <meta name="viewport" content="width=device-width,initial-scale=1.0">
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=8" />

        <link rel="icon" href="/img/favicon.ico">
		<link rel="stylesheet" type="text/css" href="/theme/default/icon/iconfont.css"/>
		<link rel="stylesheet" type="text/css" href="/theme/default/theme.css">
		<link rel="stylesheet" type="text/css" href="/css/markdown.css">
	</head>
	<body>
		<div class="container">
			<header class="header">
                <plugin name="plugin-menubar" params="{articleId:'${blog.key}'}"></plugin>
			</header>

			<main class="main">
				<div class="middle">
					<div class="list">
						<article>

							<#if blog.defaultLayout>
							<div class="blog-title">
								<a href="javascript:void(0)"> ${blog.titleCn} </a>
							</div>
							<div class="blog-meta">
								<span class="time">
                 					<i class="iconfont icon-time-circle"></i> 
                 					<span class="info"> ${blog.modify}</span>
                				</span>
								
		                        <span class="tag">
		                        	<i class="iconfont icon-tags"></i> 
		                        	<span class="info"> <#list blog.tags as item><a ref="${item}">${item}</a> </#list></span>
		                        </span>
		                    </div>
                            </#if>

							<div class="blog-content markdown-body">
							${blog.html}
							</div>
						</article>
					</div>

                    <#if blog.comment>
					<section class="comments">
                        <plugin id="comment-list" name="plugin-comments" params="{articleId:'${blog.key}'}"></plugin>
					</section>
                    </#if>
				</div>
			</main>

			<footer class="footer">
                <plugin name="plugin-footer">
                    © 2017 - ? QPing's blog - 苏ICP备15004812号.
                </plugin>
			</footer>
		</div>

		<div class="toolbox">
			<ul class="toollist">
				<li class="tool" id="upBtn">
					<a title="回到顶部"></a>
				</li>
				<li class="tool" id="lightBtn">
					<a title="切换样式"></a>
				</li>
				<li class="tool" id="markdownBtn">
					<a href="https://github.com/qpingcode/blog/tree/master${blog.path}${blog.titleCn}.md" title="markdown格式文件" target="_blank"></a>
				</li>
			</ul>
		</div>
	</body>

	<script type="text/javascript" src="/js/es6-promise.auto.min.js"></script>
    <script type="text/javascript" src="/js/hammer.js"></script>
	<script type="text/javascript" src="/js/template.latest.js"></script>
    <script type="text/javascript" src="/js/plugin-manager.js"></script>
    <script type="text/javascript" src="/theme/default/theme.js"></script>
    <!-- mathjax begin -->
    <script src='https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.5/MathJax.js?config=TeX-MML-AM_CHTML' async></script>
	<script type="text/x-mathjax-config">
	  MathJax.Hub.Config({tex2jax: {inlineMath: [['$','$']]}});
	</script>
    <!-- mathjax end -->

    <!-- highlight begin -->
    <link rel="stylesheet" type="text/css" href="/js/highlight/styles/railscasts.css">
    <script type="text/javascript" src="/js/highlight/highlight.pack.js"></script>
    <script>hljs.initHighlightingOnLoad();</script>
    <!-- highlight end -->

    <!-- baidu tongji begin -->
    <script>
	var _hmt = _hmt || [];
	(function() {
	  var hm = document.createElement("script");
	  hm.src = "https://hm.baidu.com/hm.js?82a3f5f2414f405a74bcf8584b54c933";
	  var s = document.getElementsByTagName("script")[0]; 
	  s.parentNode.insertBefore(hm, s);
	})();
	</script>
	<!-- baidu tongji end -->

</html>