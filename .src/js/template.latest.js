/*
* name:     js模版引擎
* author:   qping
* desc:     构建一款自己的js模版引擎，实现模版的嵌套
* ------------------- 版本更新记录 ---------------------
* 0.1 实现基础的 each、if 模版渲染
* 0.2 增加模版的嵌套
* 0.3 TODO 区分嵌套上下文，为各个模版方法注入不同作用域的变量
**/
(function () {

    var RULE = /{{[ \t]*([\w\W]*?)[ \t]*}}/g;
    var TOKEN_TYPE_STRING = 0, TOKEN_TYPE_EXPRESSION = 1;
    function Token(type, value, prevToken){
        this.type = type;
        this.value = value;

        if(prevToken){
            this.start = prevToken.end;
            this.end = this.start + value.length;
        }else{
            this.start = 0;
            this.end = value.length;
        }
    }

    function parseToken(str, context){
        var match, index = 0, prevToken, tokens = [];
        while((match = RULE.exec(str)) != null ){
            if(match.index > index){
                prevToken = new Token(TOKEN_TYPE_STRING, str.slice(index, match.index), prevToken);
                index = match.index + match[0].length;
                tokens.push(prevToken);
            }

            prevToken = new Token(TOKEN_TYPE_EXPRESSION, match[0], prevToken);
            prevToken.script = toScript.apply(context, match);

            index = match.index + match[0].length;
            tokens.push(prevToken);
        }
        // 修复最后纯html无法渲染的bug
        if(index < str.length){
            prevToken = new Token(TOKEN_TYPE_STRING, str.slice(index, str.length), prevToken);
            tokens.push(prevToken);
        }
        return tokens;
    }

    function toScript(match_full, match_inner){
        var code = "";
        var output = false;
        var jsTk = new JsToken(match_inner);
        switch (jsTk.get(0)) {
            case "each":
                var value_name = jsTk.get(1);
                var array_name = jsTk.get(3);
                code = "$each(" + array_name + ",function(" + value_name + ", $index){";
                break;
            case "if":
                var code = jsTk.join(" ", 1);
                code = "if(" + code + "){";
                break;
            case "else":
                if(jsTk.length == 1){
                    code = "} else {";
                }else{
                    var code = jsTk.join(" ", 1);
                    code = "} else if (" + code + ") {";
                }
                break;
            case "include":
                var template_name = jsTk.get(1);
                var data_name = jsTk.get(2);
                // if($context.$template[template_name]){
                code = "$template." + template_name + "(" + data_name + "," + "$context)";
                output = true;
                // }
                break;
            case "/each":
                code = "})";
                break;
            case "/if":
                code = "}";
                break;
            default:
                code = match_inner;
                output = true;
        }

        var script = {};
        script.code = code;
        script.output = output;
        return script;

    }

    function JsToken(str){
        var arr = str.split(" ");
        var result = []
        $each(arr, function (item) {
            if(item !== ""){
                result.push(item);
            }
        })

        this.length = result.length;
        this.get = function(index){
            if(index > this.length){
                return null;
            }
            return result[index];
        }
        this.join = function(key, start, end){
            return result.slice(start || 0,  end || this.length).join(key || " ")
        }
    }

    var $context = {
        $each: $each,
        $template: {}
    }
    function compile(template, name){
        var tokens = parseToken(template);

        $each(tokens, function(item){
            if(item.type == TOKEN_TYPE_STRING){
                if(item.value){
                    item.script = {
                        code: "output += " + JSON.stringify(item.value)
                    }
                }
            }else if(item.type == TOKEN_TYPE_EXPRESSION){
                if(item.script.output){
                    item.script.code = "output += " + item.script.code
                }
            }
        })

        var codes = [];
        // 增加上下文信息
        for (var key in $context) {
            codes.push("var " + key + " = $context." + key)
        }
        // var $data = data;
        // importData($data, codes);

        // 增加异常错误信息
        codes.push("var output = ''");
        $each(tokens, function(item){
            if(item.script.output){
                var errorMsg = "error occurs at " + item.start + ","+ item.end + ":" + item.value;
                codes.push("try{");
                codes.push(item.script.code)
                codes.push("}catch(ex){console.log('" + errorMsg + "');}")
            }else{
                codes.push(item.script.code)
            }
        })
        codes.push("return output")

        // var renderCode =  "with($data){" + codes.join("\n") + " }";  //不再使用with，生成上下文代码来传递数据
        var renderCode =  codes.join("\n");

        // 增加递归调用方法
        var $func = new Function("$data", "$context", renderCode);
        $context.$template[name || "self"] = $func;
        return $func;

    }

    function run(data, name){
        var $func = $context.$template[name || "self"]
        if($func){
            return $func(data, $context)
        }
    }

    function template(template, data){
        var $func = compile(template, "self");
        var result = $func(data, $context);
        return result;
    }

    function importContext(context, codes){

    }

    function importData(data, codes){
        if(data && !Array.isArray(data)){
            for (var key in data) {
                codes.push("var " + key + " = $data." + key)
            }
        }
    }

    function $each(data, callback){
        if (Array.isArray(data)) {
            for (var i = 0, len = data.length; i < len; i++) {
                callback(data[i], i);
            }
        } else {
            for (var i in data) {
                callback(data[i], i);
            }
        }
    };

    window.template = {
        compile: compile,
        run: run
    };
})()
