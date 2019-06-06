(function(){
	// 切换样式
	var currentColor = $.getCookie("color") ? $.getCookie("color") : "dark";
	console.log("[theme info] name:default, color:" + currentColor)

	if(currentColor == 'white'){
        loadColor('white');
	}

	$("#lightBtn").on("click", function(){
		loadColor(currentColor == "dark" ? "white" : "dark")
	})

	function loadColor(color){
		if(color == "dark"){
            var link = document.createElement('link');
		    link.type = 'text/css';
		    link.id = "theme-css-dark";
		    link.rel = 'stylesheet';
		    link.href = '/theme/default/dark.css';
		    document.getElementsByTagName("head")[0].appendChild(link);
		}else{
			$('#theme-css-dark').remove();
		}
		currentColor = color;
		$.setCookie("color", currentColor, {path:"/"});
	}

	// 回到顶部
	function smoothscroll(){
		var currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
	    if (currentScroll > 0) {
	         window.requestAnimationFrame(smoothscroll);
	         window.scrollTo (0,currentScroll - (currentScroll/5));
	    }
	}
	$("#upBtn").on("click", function(){
		smoothscroll()
	})
})()