
(function(){

	// 获取插件全局变量
	let $m = window.pluginManager
	// 获取基础服务url
	let baseUrl = $m.baseUrl
    $m.register("run_activity_list", {
        default:{
            param1:[],
            param2: 'red',
            param3: 5,
            func4:function(date, text){return date + " " + text;}
        },
        /**
         * call方法会传入插件所在的dom对象和参数
         *  dom: 插件所在的位置
         *  params: 插件自定义的参数和default的混合，自定义参数会覆盖default
         */
        call(dom, params){
            /* write code your self*/
        }
    })


})()