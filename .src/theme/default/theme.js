(function(){
	// 切换样式
	var currentColor = $.getCookie("color");
	console.log("[theme info] name:default, color:" + currentColor)

	function loadDark(){
		var link = document.createElement('link');
	    link.type = 'text/css';
	    link.id = "theme-css-dark";
	    link.rel = 'stylesheet';
	    link.href = '/theme/default/dark.css';
	    document.getElementsByTagName("head")[0].appendChild(link);
	    currentColor = "dark";
		$.setCookie("color", currentColor, {path:"/"});
	}

	function loadWhite(){
        $('#theme-css-dark').remove();
        currentColor = "";
        $.setCookie("color", currentColor, {path:"/"});
	}

	if(currentColor == 'dark'){
        loadDark();
	}

	$("#lightBtn").on("click", function(){
		if(currentColor == "dark"){
            loadWhite();
		}else{
			loadDark();
		}
	})

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