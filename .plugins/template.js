
(function(){

	// 获取插件全局变量
	let $ = window.GlobalPluginFactory
	// 获取基础服务url
	let baseUrl = $.baseUrl
	// 注册插件
	$.register("template", {
		/**
		 * call方法会传入plugin对象，包含页面调用插件时的定义内容
		 * plugin {
		 *		id: 'test', 			// 插件DOM的ID，可能为空，为空时 id默认等于name
		 *		name: 'test', 			// 插件的名字
		 *		params:{color:"red"},	// 插件配置信息
		 * }
		 *
		 */
		call(plugin){
			let id = plugin.id
			let params = plugin.params
			// do you logic

		}
	})


})()