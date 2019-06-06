(function () {
    // 加载动画界面全屏遮盖
    $("#loading-full").css("height", document.body.offsetHeight)
    closeLoading();
    function closeLoading(){
        $("#loading-full").addClass("hideSlow")
        setTimeout(function(){
            $("#loading-full").hide()
            $("#loading-full").removeClass("hideSlow")
        }, 1000)
    }

})()
