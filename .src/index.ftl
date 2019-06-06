<html>
	<head>
        <title>qping's blog</title>

        <meta charset="utf-8">
        <meta name="description" content="这个博客用于学习记录和探索发现，分享与实现一些自己IDEA。">
        <meta name="keywords" content="qping,blog">

        <meta name="viewport" content="width=device-width,initial-scale=1.0">
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />

        <link rel="icon" href="/img/favicon.ico">
		<link rel="stylesheet" type="text/css" href="/theme/default/icon/iconfont.css"/>
		<link rel="stylesheet" type="text/css" href="/theme/default/theme.css">
		<link rel="stylesheet" type="text/css" href="/css/loading.css">
		<link id="theme-css-dark" rel="stylesheet" type="text/css" href="/theme/default/dark.css">
	</head>
	<body>
		<div class="container">
			<header class="header">
				<plugin name="plugin-menubar"></plugin>
			</header>

			<main class="main">
				<div class="middle">
					<div id="list" class="list">
					</div>
					<div class="page">
						<span class="page-total">共 28 条</span>
						<button id="prev" type="button" class="btn-prev">
							<i class="iconfont icon-left"></i>
						</button>
						<ul id="pager" class="page-list"></ul>
						<button id="next" type="button" class="btn-next">
							<i class="iconfont icon-right"></i>
						</button>
						<span class="page-jump">
							前往
							<div class="page-editor">
								<input id="jump" autocomplete="off" min="1" class="input-inner" max="3" value="1">
							</div>
							页
						</span>
					</div>
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
			</ul>
		</div>

		<div id="loading-full" class="loading-full">
			 <div class="loader">
			 	<ul class="hexagon-container">
			 	 	<li class="hexagon hex_1"></li>
			 	 	<li class="hexagon hex_2"></li>
			 	 	<li class="hexagon hex_3"></li>
			 	 	<li class="hexagon hex_4"></li>
			 	 	<li class="hexagon hex_5"></li>
			 	 	<li class="hexagon hex_6"></li>
			 	 	<li class="hexagon hex_7"></li>
			 	</ul>
			</div>
		</div>
		
	</body>

	<style>
	
	</style>

	<script id="test" type="text/html">
	{{each blog in $data}}
		<article>
			<div class="blog-title">
				<a href="{{blog.path}}{{blog.key}}.html" target="_blank"> {{blog.titleCn}}</a>
			</div>
			<div class="blog-meta">
                <span class="tag">
                	Tags:
                	<span class="info">
                		{{each tag in blog.tags}}<a ref="{{tag}}">{{tag}}</a>, {{/each}}
                	</span>
                </span>

                <span class="time">
                	Time: 
					{{blog.modify? blog.modify.substring(0,10): "前些时候"}} 
				</span>

            </div>
			<div class="blog-content">
				{{blog.summary}}
			</div>
		</article>
	{{/each}}
	</script>

	<script type="text/javascript" src="/js/es6-promise.auto.min.js"></script>
	<script type="text/javascript" src="/js/hammer.js"></script>
	<script type="text/javascript" src="/js/template.latest.js"></script>
    <script type="text/javascript" src="/js/blog/index.js"></script>
	<script type="text/javascript" src="/theme/default/theme.js"></script>
    <script type="text/javascript" src="/js/plugin-manager.js"></script>

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