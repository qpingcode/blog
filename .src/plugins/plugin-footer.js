/* 博客底部版权信息 */
(function(){

	var tpl = ' © 2017 - 2019 QPing\'s blog - 苏ICP备15004812号. ';

	pluginManager.register("plugin-footer", {
		default:{
            active: ""
		},
		call(dom, params, domId){
            $(dom).html(tpl)
		}
	})

})()



