/* 博客底部版权信息 */
(function(){

	var tpl = ' © 2017 - 2020 QPing\'s blog - <a href="http://www.beian.miit.gov.cn/">苏ICP备15004812号-1</a>. ';

	pluginManager.register("plugin-footer", {
		default:{
            active: ""
		},
		call(dom, params, domId){
            $(dom).html(tpl)
		}
	})

})()



