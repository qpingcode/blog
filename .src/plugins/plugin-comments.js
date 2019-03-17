/* 博客评论加载插件，获取当前博客的评论，加载为树状结构 */
(function(){
    var commentsTpl = '<ul>'
        + '{{each item in $data}}'
        + '        <li>'
        + '            <div class="post-content">'
        + '                <div class="post-body">'
        + '                    <header class="post-header">'
        + '                        <span class="author">{{item.text}}</span>'
        + '                        <span class="post-meta">'
        + '                             &nbsp;•&nbsp; {{item.remark}} &nbsp;•&nbsp;'
        + '                            <a href="javascript:void(0)" class="reply" data-id="{{item.id}}">回复</a>'
        + '                        </span>'
        + '                    </header>'
        + '                    <div class="post-body-inner">'
        + '                        <p>{{item.value}}</p>'
        + '                    </div>'
        + '                </div>'
        + '            </div>'
        + '            {{if item.children}}'
        + '            {{include commentsTpl item.children}}'
        + '            {{/if}}'
        + '        </li>'
        + '{{/each}}'
        + '</ul>';

    var areaTpl = '<div class="comment-title">'
        + '	<span class="comment-h2-info blue-tag">以下评论区域</span> '
        + '    <span class="comment-h2-info"><span id="comment-count">0</span> Comments</span>'
        + '	<div class="comment-area">'
        + '       {{include commentsTpl $data}}'
        + '    </div>'
        + '</div>'
        + '<form class="qp-form">'
        + '    <input id="refId" type="hidden" value="">'
        + '	<div class="qp-form-item">'
        + '		<label class="label" style="width: 45px;">昵称:</label>'
        + '		<div class="content">'
        + '			<div class="qp-input">'
        + '				<input id="updateName" type="text" autocomplete="off" placeholder="输入您的昵称" class="qp-input-inner">'
        + '			</div>'
        + '		</div>'
        + '	</div> '
        + '	<div class="qp-form-item">'
        + '		<label class="label" style="width: 45px;">邮箱:</label>'
        + '		<div class="content">'
        + '			<div class="qp-input">'
        + '				<input id="updateEmail" type="text" autocomplete="off" placeholder="邮箱不会被公开显示" class="qp-input-inner">'
        + '			</div>'
        + '		</div>'
        + '	</div> '
        + '	<div class="qp-form-item">'
        + '		<label class="label" style="width: 45px;">内容:</label>'
        + '		<div class="content">'
        + '			<div class="qp-textarea">'
        + '				<textarea id="content" autocomplete="off" cols="40" rows="8" placeholder="不制造网络垃圾，从我做起" class="qp-textarea-inner"></textarea>'
        + '			</div>'
        + '		</div> '
        + '	</div> '
        + '	<div class="qp-form-item">'
        + '		<div class="content">'
        + '			<button id="submitBtn" type="button" class="qp-button">'
        + '				<span>立即提交</span>'
        + '			</button>'
        + '		</div>'
        + '	</div>'
        + '</form>';

    template.compile(commentsTpl, "commentsTpl");
    template.compile(areaTpl, "areaTpl");

    function attachClick(params, pluginDomId){
        $("#submitBtn").on("click", function () {
            var refId = $("#refId").val();
            var updateName = $("#updateName").val();
            var updateEmail = $("#updateEmail").val();
            var content = $("#content").val();

            $.ajax({
                url: "http://blog.qping.me:8888/api/blog/" + params.articleId + "/comment",
                method:"put",
                dataType:"json",
                data:{
                    refId: refId,
                    updateName: updateName,
                    updateEmail: updateEmail,
                    content: content,
                    articleId: params.articleId
                },
                success: function (result) {
                    console.log(result)
                    if(result.code == 1){
                        pluginManager.reload(pluginDomId)
                    }else{
                        alert(result.msg)
                    }
                }
            })
        })

        $(".reply").on("click", function(){
            var refId = $(this).data("id")
            $("#refId").val(refId)
            $("#updateName").focus()
        })
    }

	pluginManager.register("plugin-comments", {
		default:{
            articleId: ""
		},
		call(dom, params, domId){
            $.ajax({
                url: "/api/blog/" + params.articleId + "/comment",
                dataType: 'json',
                success: function (result) {
                    console.log(result)
                    if (result.code == 1) {
                        var comments = result.data.rows;
                        var commentsCount = result.data.total;

                        $(dom).html(template.run(comments, "areaTpl"));
                        $("#comment-count").html(commentsCount);

                        // 绑定点击事件
                        attachClick(params, domId);
                    }
                }
            })
		}
	})

})()



