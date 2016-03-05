//分页工具
function _UiPagination(id, total, cb){
	var ctrlSize = 5;
	total = total > ctrlSize ? ctrlSize : total;

	var htmlStr = "";
	htmlStr += '<ul class="pagination" data-total="'+total+'" data-cur="1" data-start="1">';
	htmlStr += '<li class="pre-ctrl disabled"><a href="javascript:;" aria-label="Previous"><span aria-hidden="true">«</span></a></li>';
	htmlStr += '<li class="active"><a href="javascript:;" class="page_num">1</a></li>';
	for(var i=2; i<total+1; i++) htmlStr += ('<li><a href="javascript:;" class="page_num">'+i+'</a></li>');
	htmlStr += '<li class="next-ctrl'+(total<ctrlSize?' disabled':'')+'"><a href="javascript:;" aria-label="Next"><span aria-hidden="true">»</span></a></li>';
	htmlStr += '</ul>';
	$("#"+id).html(htmlStr);
	
	$("#"+id+" > .pagination a").on('click', function(){
		var ignore = false;
		var ctx = $("#"+id+" > .pagination");
		var cur = parseInt(ctx.data("cur")) || 1;
		var total = parseInt(ctx.data("total")) || 1;
		var start = parseInt(ctx.data("start")) || 1;

		var tmpPageNum = -1;
		var aTag = $(this);
		var numList = ctx.find("a.page_num");
		//更新页码列表，并设置翻页按键是否可点击
		var ariaLabel = aTag.attr("aria-label");
		if(ariaLabel){
			//忽略不可点击事件
			if(aTag.parent("li").hasClass("disabled")){
				return;
			}
			numList.each(function(idx, item){
				var tmp = $(item);
				tmpPageNum = parseInt(tmp.text())
				if (ariaLabel == "Previous") {
					//显示隐藏的
					tmp.show();
					tmpPageNum -= ctrlSize;
					if(tmpPageNum > 0){
						if(idx == 0){
							ctx.data("start", tmpPageNum);
							cur = tmpPageNum;
						}
						tmp.text(tmpPageNum);
					}else{
						$(".pagination .pre-ctrl").addClass("disabled");
						ignore = true;
					}
				}else{
					tmpPageNum += ctrlSize;
					if(tmpPageNum <= total){
						if(idx == 0){
							ctx.data("start", tmpPageNum);
							cur = tmpPageNum;
						}
						tmp.text(tmpPageNum);
					}else{
						tmp.hide();
						$(".pagination .next-ctrl").addClass("disabled");
						ignore = true;
					}
				}
			});
		}else{
			//更新选中效果
			ctx.find(".active").removeClass("active");
			$(this).parent("li").addClass("active");
			//更新页码值
			cur = parseInt(aTag.text()) || 1;
		}
		//翻页可用
		if (tmpPageNum >= 1) {
			$(".pagination .pre-ctrl").removeClass("disabled");
		}
		if(tmpPageNum <= total && total > ctrlSize){
			$(".pagination .next-ctrl").removeClass("disabled");
		}

		if(!ignore) {
			ctx.data("cur", cur);
			cb(cur);
		}
	});
}
