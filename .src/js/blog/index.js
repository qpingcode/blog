(function () {
    var pageSize = 10;

    // 加载动画界面全屏遮盖
    $("#loading-full").css("height", document.body.offsetHeight)

    // 加载列表数据
    var pn = $.getUrlParams()["pn"] ? parseInt($.getUrlParams()["pn"]) : 1;
    function loadList(){
        $.ajax({
            url: "http://blog.qping.me:8888/api/blog",
            data: "page=" + (pn || 1) + "&size=" + pageSize,
            dataType: 'json',
            success: function (result) {
                console.log(result);
                closeLoading();
                if (result.code == 1) {

                    var total = result.data.total;
                    var rows = result.data.rows

                    template.compile($("#test").html())
                    var html = template.run(rows);

                    $("#list").html(html);

                    genPager(pn, pageSize, total)
                }else{
                    alert(result.msg)
                }
            }
        })
    }

    function genPager(pageNum, pageSize, totalSize){
        var totalPage = Math.ceil(totalSize / pageSize);

        if(pageNum < 1){
            pageNum = 1;
        }

        if(pageNum > totalPage){
            pageNum = totalPage;
        }

        var pageBegin = pageNum - 2;
        var pageEnd = pageNum + 2;

        if(pageNum < 3){
            pageBegin = 1;
            pageEnd = totalPage < 5 ? totalPage : 5;
        }else if((totalPage - pageNum) < 3){
            pageBegin = totalPage < 5 ? 1 : (totalPage - 4);
            pageEnd = totalPage;
        }

        console.log("[pager info] pageNum: " + pageNum + " totalSize:" + totalSize + " pageSize:" + pageSize + " totalPage:" + totalPage + " pageBegin:"+ pageBegin + " pageEnd:" + pageEnd)

        var html = "";
        for(var i = pageBegin; i < (pageEnd + 1); i++){
            if(i == pageNum){
                html += '<li class="number active">' + i + '</li>';
            }else{
                html += '<li class="number"><a href="/?pn=' + i + '">' + i + '</a></li>';
            }
        }

        $("#pager").html(html)


        if(pageNum > 1){
            $("#prev").on("click", function () {
                location.href = "/?pn=" + (pageNum - 1) ;
            })
        }else{
            $("#prev").attr("disabled", "disabled")
        }

        if(pageNum < totalPage){
            $("#next").on("click", function () {
                location.href = "/?pn=" + (pageNum + 1) ;
            })
        }else{
            $("#next").attr("disabled", "disabled")
        }

        $("#jump").val(pageNum)

        $("#jump").on("blur", function () {
            if(this.value != pageNum){
                location.href = "/?pn=" + this.value ;
            }
        })

    }

    function closeLoading(){
        $("#loading-full").addClass("hideSlow")
        setTimeout(function(){
            $("#loading-full").hide()
            $("#loading-full").removeClass("hideSlow")
        }, 1000)
    }

    loadList();
})()
