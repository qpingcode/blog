/* 运动活动图插件，显示几个月内是否跑步*/
(function(){
 	var SvgBrush = {
	    c: "red",
	    colors: {
	        "red": ["#ebedf0", "#f0afb7", "#fa5b48", "#ce0203", "#5c002b",],
	        "green": ["#ebedf0", "#52d376", "#007531", "#003c1e", "#000"]
	    },
	    l: "zh_CN",
	    languages: {
	        "zh_CN": {
	            months: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"],
	            weekdays: ["周日", "周一", "周二", "周三", "周四", "周五", "周六"]
	        },
	        "en": {
	            months: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
	            weekdays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
	        }
	    },
	    _g_holder: null,
	    _index: 0,
	    _monthPos: [],
	    _basePos: {x: 10, y: 10},
	    _inited: false,
	    draw: function (dom, config) {
	    	var that = this;
	        var data = config.data;
	        var popup = config.popup;
	        var dateAttr = config.dateAttr;
	        if (!that._inited) {
	            that._initCSS();
	            _inited = true;
	        }
            that.l = config.lang;
            that.c = config.color;
	        that._g_holder = null;
	        that._index = 0;
	        that._monthPos = [];

	        if (!data || data.length == 0) {
	            return;
	        }

	        // 画方块
	        var base_container = that._createG("base");


	        // 循环生成map:日期->对应跑步记录
	        var total = data.length;
	        var dateMap = {};
	        var beginDate = that._toDate(data[0][dateAttr].substring(0, 10));
	        var endDate = that._toDate(data[total - 1][dateAttr].substring(0, 10)); 
	        for(var j = 0; j < total; j++){
	        	var record = data[j];
	        	var dateStr = record[dateAttr].substring(0, 10)
	        	dateMap[dateStr] = record
	        }
	        // 将第一天所属那一周前面的几天补齐
	        var day_before = beginDate.getDay();
        	 for (j = 0; j < day_before; j++) {
        	 	var tempdate = new Date(beginDate);
				tempdate.setDate(tempdate.getDate() - day_before + j);
				that._addOneRect(base_container, tempdate, 0, "0步");
        	 }
				
	        // 生成第一天到最后一天的小方块
	        while(beginDate <= endDate){
	        	var dateStr = that._toString(beginDate)
	        	var record = dateMap[dateStr]
	        	var degree = 0
	        	var distance = 0
	        	if(record){
	        		distance = record.distance ? record.distance : 0;
	        		degree = distance / 3000 + 1;
		            degree = degree > 5 ? 5 : degree
	        	}

	        	// 画当前的方块
	            that._addOneRect(base_container, beginDate, parseInt(degree), parseInt(distance) + "步");

	        	// 下一天
	        	beginDate = new Date(beginDate.getTime() + 86400000)
	        }

	        // 显示星期
	        var weekLang = that.languages[that.l].weekdays;
	        var text_container = that._createG();
	        for(var i = 0; i < 3; i++){
	        	 text_container.appendChild(that._createText(weekLang[1+i*2], this._basePos.x, this._basePos.y + 50 + 24 * i));
	        }
	       
	        // 显示月份
	        var monthLang = that.languages[that.l].months;
	        for (var i = 0; i < that._monthPos.length; i++) {
	            if (i == that._monthPos.length - 1) {
	                break;
	            }
	            var m_idx = that._monthPos[i].month;
	            var col_idx = that._monthPos[i].col_index;
	            text_container.appendChild(that._createText(monthLang[m_idx], (this._basePos.x + 42 + 12 * col_idx), this._basePos.y + 22));
	        }

	        // 绑定hover事件
	        var clear = function () {
	            var e = document.querySelector(".svg-tip");
	            e && e.remove()
	        }
	        base_container.onmouseover = function (e) {

	            if (that._matches(e.target, "rect.day")) {
	                clear();

	                var svg_tip = document.createElement("div");
	                svg_tip.setAttribute("class", "svg-tip");

	                var date = e.target.getAttribute("data-date");
	                var degree = e.target.getAttribute("data-degree");
	                var text = e.target.getAttribute("data-text");
	                svg_tip.textContent = popup(date, degree, text);

	                document.querySelector("body").appendChild(svg_tip);

	                var rect = e.target.getBoundingClientRect();
	                var tip_left = rect.left - (svg_tip.offsetWidth / 2) + (rect.width / 2);
	                var tip_top = rect.bottom + window.pageYOffset - svg_tip.offsetHeight - 2 * rect.height;
	                svg_tip.style.top = tip_top + "px";
	                svg_tip.style.left = tip_left + "px";
	            }

	        }
	        base_container.onmouseout = function (e) {
	            var e = document.querySelector(".svg-tip");
	            e && that._remove(e)
	        }
	        // 渲染到网页
	        var svg_container = that._createSvg();
	        svg_container.appendChild(base_container);
	        svg_container.appendChild(text_container);
	        dom.appendChild(svg_container);
	    },
	    _remove: function (obj) {
	        var isIE = function () {
	            if (!!window.ActiveXObject || "ActiveXObject" in window) {
	                return true;
	            } else {
	                return false;
	            }
	        }
	        var isIE11 = function () {
	            if ((/Trident\/7\./).test(navigator.userAgent)) {
	                return true;
	            } else {
	                return false;
	            }
	        }
	        if (isIE() || isIE11()) {
	            obj.removeNode(true);
	        } else {
	            obj.remove();
	        }
	    },
	    _matches: function (element, selector) {
	        if (element.matches) {
	            return element.matches(selector);
	        } else if (element.matchesSelector) {
	            return element.matchesSelector(selector);
	        } else if (element.webkitMatchesSelector) {
	            return element.webkitMatchesSelector(selector);
	        } else if (element.msMatchesSelector) {
	            return element.msMatchesSelector(selector);
	        } else if (element.mozMatchesSelector) {
	            return element.mozMatchesSelector(selector);
	        } else if (element.oMatchesSelector) {
	            return element.oMatchesSelector(selector);
	        } else if (element.querySelectorAll) {
	            var matches = (element.document || element.ownerDocument).querySelectorAll(selector),
	                i = 0;
	            while (matches[i] && matches[i] !== element) i++;
	            return matches[i] ? true : false;
	        }
	        throw new Error('Your browser version is too old,please upgrade your browser');
	    },
	    _addOneRect: function (container, date, degree, text) {

	        var col_index = this._index % 7;
	        var row_index = Math.floor(this._index / 7);
	        if (col_index == 0) {
	            this._g_holder = this._createG("data", row_index);
	            container.appendChild(this._g_holder)
	        }

	        var rect = this._createRect(col_index, this._toString(date), degree, text);
	        this._g_holder.appendChild(rect);

	        // 记录下每个月1号所在的位置
	        if (date.getDate() == 1) {
	            this._monthPos.push({month: date.getMonth(), col_index: row_index})
	        }

	        this._index++;

	    },
	    _toString:function(date){
	    	var year = date.getFullYear();
	    	var month = date.getMonth() + 1;
	    	var day =  date.getDate();
	    	return year + "-" + (month < 10 ? "0" + month : month) + "-" + (day < 10 ? "0" + day : day)
	    },
	    _toDate: function (str) {
	        //str = str.substring(0,10).replace(/-/g, '/');
	        return new Date(str);
	    },
	    _createSvg: function () {
	        var svg = document.createElementNS('http://www.w3.org/2000/svg', "svg");
	        svg.setAttribute("width", "800")
	        svg.setAttribute("height", "200")
	        return svg;
	    },

	    _createG: function (type, index) {
	        var g = document.createElementNS('http://www.w3.org/2000/svg', "g");
	        if (type == "base") {
	            var x = this._basePos.x + 30;
	            var y = this._basePos.y + 30;
	            g.setAttribute("transform", "translate(" + x + "," + y + ")");
	        } else if (type == "data") {
	            g.setAttribute("transform", "translate(" + 12 * index + ",0)");
	        }
	        return g;
	    },
	    _createText: function (text, dx, dy) {
	        var svg_text = document.createElementNS('http://www.w3.org/2000/svg', "text");
	        svg_text.setAttribute("text-anchor", "start")
	        svg_text.setAttribute("dx", dx);
	        svg_text.setAttribute("dy", dy);
	        svg_text.setAttribute("font-size", "12");
            svg_text.setAttribute("fill", "#888");
	        svg_text.textContent = text;
	        return svg_text;
	    },
	    _createRect: function (index, date, degree, text) {
	        var that = this;
	        var svg_tip;
	        var rect = document.createElementNS('http://www.w3.org/2000/svg', "rect");
	        rect.setAttribute("class", "day")
	        rect.setAttribute("width", "10")
	        rect.setAttribute("height", "10")
	        rect.setAttribute("data-date", date)
	        rect.setAttribute("data-degree", degree)
	        rect.setAttribute("data-text", text)
	        rect.setAttribute("x", "0")
	        rect.setAttribute("y", index * 12);
	        rect.setAttribute("fill", this.colors[this.c][degree]);

	        return rect;
	    },
	    _initCSS: function () {
	        var style1 = document.createElement('style');
	        style1.textContent =
	            '.svg-tip::after {position: absolute;bottom: -10px;left: 50%;width: 5px;height: 5px;box-sizing: border-box;margin: 0 0 0 -5px;content: " ";border: 5px solid transparent;border-top-color: rgba(0,0,0,0.8);}' +
	            '.svg-tip {position: absolute;z-index: 99999;padding: 10px;font-size: 12px;color: #959da5;text-align: center;background: rgba(0,0,0,0.8);border-radius: 3px;}';
	        var body = document.querySelector("body")
	        body.appendChild(style1);
	    }
	}

	pluginManager.register("plugin-activity", {
		default:{
			data:[],
			color: 'red',
			lang: 'zh_CN',
			dateAttr: 'updateTime',
			month: 5,
			popup:function(date, degree, text){return date + " " + text;}
		},
		call(dom, params){
			$.ajax({
				dataType: 'json',
				url : "http://localhost:8082/api/run/range",
				data:{
					month: params.month
				},
				success: function(result){
					console.log(result)
					if(result.code == 1){
						var list = result.data.list
						params.data = list
						SvgBrush.draw(dom, params)
					}
				}
			})
		}
	})

})()

