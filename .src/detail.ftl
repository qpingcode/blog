<html>
	<head>
        <title>${blog.titleCn}- qping's blog</title>
        <meta charset="utf-8">
        <meta name="description" content="${blog.summary!blog.titleCn}">
        <meta name="keywords" content="<#list blog.tags as item>${item} </#list>">

        <meta name="viewport" content="width=device-width,initial-scale=1.0">
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />

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
								<a href="t_detail.html"> ${blog.titleCn} </a>
							</div>
							<div class="blog-meta">
								<i class="iconfont icon-time-circle"></i> ${blog.modify}
		                        <span>
		                        	<i class="iconfont icon-tags"></i> <#list blog.tags as item>${item} </#list>
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

    <script type="text/javascript" src="/js/hammer.js"></script>
	<script type="text/javascript" src="/js/template.latest.js"></script>
    <script type="text/javascript" src="/js/plugin-manager.js"></script>
    <script type="text/javascript" src="/theme/default/theme.js"></script>

    <!-- highlight begin -->
    <link rel="stylesheet" type="text/css" href="/js/highlight/styles/railscasts.css">
    <script type="text/javascript" src="/js/highlight/highlight.pack.js"></script>
    <script>hljs.initHighlightingOnLoad();</script>
    <!-- highlight end -->
</html>