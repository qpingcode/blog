/**
 * 插件管理中心
 * 需要 hammer.js 支撑
 * @constructor
 */
function PluginManager(){
    // 插件js所在相对路径
    var relativePath = "/plugins/";
    var baseUrl = "";
    // js脚步加载中心
    var scriptCenter = {
        scripts:{},
        loadScript: function(src) {
            var that = this;
            return new Promise(function(resolve, reject){
                if(that.scripts[src]){
                    resolve();
                }
                var script = document.createElement("script");
                script.src = baseUrl + src;
                $.on(script, "load",function(){
                    that.scripts[src] = true;
                    resolve();
                })
                document.body.appendChild(script);
            })
        }
    }
    // 插件管理中心
    var pluginCenter = {
        cache:{},
        register: function(name, plugin) {
            pluginCenter.cache[name] = plugin;
        },
        require: function(plugin_names) {
            var endIndex = 0
            if($.isArray(plugin_names)){
                endIndex = plugin_names.length - 1;
            }else{
                plugin_names = [plugin_names];
            }
            return new Promise(function(resolve, reject){
                try{
                    for(var i = 0; i < plugin_names.length; i++){
                        var pluginName = plugin_names[i];
                        console.log("[plugin manager info] scan: " + pluginName + ".js will be loaded");
                        var src = relativePath + pluginName + ".js";
                        if(i != endIndex){
                            scriptCenter.loadScript(src);
                            continue;
                        }
                        scriptCenter.loadScript(src).then(function(){
                            resolve(pluginCenter.cache);
                        })
                    }
                }catch (e) {
                    reject(e)
                }
            })
        },

    }

    var callCenter = {
        instances:{},
        register: function(domId, instance){
            callCenter.instances[domId] = instance
        },
        /* 重新调用一遍插件的call方法 */
        reload: function (domId) {
            if(callCenter.instances[domId]){
                callCenter.instances[domId]();
            }
        }
    }

    function $each(data, callback){
        for (let i = 0, len = data.length; i < len; i++) {
            callback(data[i], i);
        }
    }


    // 插件扫描初始化调用方法
    var scan = function () {
        var pluginProxies = document.querySelectorAll("plugin");
        $each(pluginProxies, function(v){
            var params_str = v.getAttribute("params") || "{}";
            var plugin_name = v.getAttribute("name");
            var domId = v.getAttribute("id");
            pluginCenter.require(plugin_name).then(function(plugin_holder){
                var plugin = plugin_holder[plugin_name];
                if(!plugin) return;
                var params = $.extend(true, {}, plugin.default, eval("(" + params_str + ")"));

                function load(){
                    plugin.call(v, params, domId, relativePath);
                }

                if(domId){
                    callCenter.register(domId, load);
                }

                load();
            })
        })
    }
    return {
        scan: scan,
        require: pluginCenter.require,
        register: pluginCenter.register,
        reload: callCenter.reload
    }
}

window.pluginManager = new PluginManager()
pluginManager.scan()