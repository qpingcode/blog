/* 博客头部菜单栏 */
(function(){

	var tpl =
		'<ul class="menubar">' +
        '    <li class="menuitem {{if $data.articleId != \'friend_links\' && $data.articleId != \'about_me\'}} active{{/if}}""><a href="/">QPing\'s 博客</a></li>' +
        '    <li class="menuitem {{if $data.articleId == \'friend_links\'}} active{{/if}}"><a href="/post/page/friend_links.html">友情链接</a></li>' +
        '    <li class="menuitem {{if $data.articleId == \'about_me\'}} active{{/if}}"><a href="/post/page/about_me.html">关于我</a></li>' +
        '</ul>';

	pluginManager.register("plugin-menubar", {
		default:{
            articleId: ""
		},
		call(dom, params, domId){
		    template.compile(tpl)
            var html = template.run({articleId: params.articleId})
            $(dom).html(html)
		}
	})

})()



