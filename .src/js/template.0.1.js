/*
* name:     js模版引擎
* author:   qping
* desc:     构建一款自己的js模版引擎，实现模版的嵌套
* ------------------- 版本更新记录 ---------------------
* 0.1 实现基础的each、if模版记录
*
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

            prevToken = new Token(TOKEN_TYPE_EXPRESSION, match[1], prevToken);
            prevToken.script = toScript.apply(context, match);

            index = match.index + match[0].length;
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
            case "/each":
                code = "})";
                break;
            case "/if":
                code = "}";
                break;
            default:
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

    function parse(template, data){
        console.log(template)

        var tokens = parseToken(template);
        console.log(tokens)

        var codes = []
        codes.push("var output = ''");
        $each(tokens, function(item){
            if(item.type == TOKEN_TYPE_STRING){
                if(item.value){
                    codes.push("output += " + JSON.stringify(item.value));
                }
            }else if(item.type == TOKEN_TYPE_EXPRESSION){
                if(item.script.output){
                    codes.push("output += " + item.value )
                }else{
                    codes.push(item.script.code)
                }
            }
        })
        codes.push("return output")

        var renderCode = codes.join("\n");
        console.log(renderCode)

        var result = new Function("$data", "$each", "with($data){" + renderCode + " }")(data, $each);
        console.log(result)

        return result;
    }


    function $each(data, callback){
        if (Array.isArray(data)) {
            for (let i = 0, len = data.length; i < len; i++) {
                callback(data[i], i);
            }
        } else {
            for (let i in data) {
                callback(data[i], i);
            }
        }
    };

    window.template = function (template, data) {
        return parse(template, data)
    }
})()
