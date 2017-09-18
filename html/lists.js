require(["../js/config"],function(){
	require(["jquery","test","common","goods"],function($){
		$ = jQuery;
		$("#head_insert").load("head.html");
		$("#footer_insert").load("footer.html");
		$(function(){
			var url = "http://localhost:8020/d1/Jsonp/Jsonp.js";
			jsonp(url);
			var url1 = "http://localhost:8020/d1/Jsonp/goodsJsonp.js";
			jsonp_goods(url1);
			var pagemax = 20;
			setTimeout(function(){
				$(".shop_list li").each(function(){
					if($(this).index()>=pagemax){
						$(this).css({
							display:"none"
						})
					}
				})
				$(".goods_num_btn a").click(function(){
					if($(this).index()==0){
						$(this).get(0).parentNode.previousElementSibling.children[0].value ++;
					}else if($(this).index()==2&&$(this).get(0).parentNode.previousElementSibling.children[0].value>1){
						$(this).get(0).parentNode.previousElementSibling.children[0].value --;
					}
				})
				
				
				var new_a_first = document.createElement("a");
				$(".pagefooter").append(new_a_first);
				new_a_first.innerText = "首页";
				new_a_first.href = "#";
				new_a_first.style.display = "none";
				var new_a_previous = document.createElement("a");
				$(".pagefooter").append(new_a_previous);
				new_a_previous.innerText = "上一页";
				new_a_previous.href = "#";
				new_a_previous.style.display = "none";
				var span_curr = document.createElement("a");
				$(".pagefooter").append(span_curr);
				span_curr.innerText = 1;
				span_curr.className = "curr";
				span_curr.href ="#";
				var page = Math.ceil($(".shop_list li").length/pagemax);
				for(var j=1;j<page;j++){
					var new_a = document.createElement("a");
					$(".pagefooter").append(new_a);
					new_a.innerText = j+1;
					new_a.href = "#";
				}
				var new_a_nextpage = document.createElement("a");
				$(".pagefooter").append(new_a_nextpage);
				new_a_nextpage.innerText = "下一页";
				new_a_nextpage.href = "#";
				var new_a_lastpage = document.createElement("a");
				$(".pagefooter").append(new_a_lastpage);
				new_a_lastpage.innerText = "尾页";
				new_a_lastpage.href = "#";
				$(".pagefooter a").click(function(){
					if($(this).text()==1){
						new_a_previous.style.display = "none";
						new_a_first.style.display = "none";
						new_a_nextpage.style.display = "inline-block";
						new_a_lastpage.style.display = "inline-block";
						
					}else if($(this).text()==page){
						new_a_previous.style.display = "inline-block";
						new_a_first.style.display = "inline-block";
						new_a_nextpage.style.display = "none";
						new_a_lastpage.style.display = "none";
					}else{
						new_a_previous.style.display = "inline-block";
						new_a_first.style.display = "inline-block";
						new_a_nextpage.style.display = "inline-block";
						new_a_lastpage.style.display = "inline-block";
					}
					var btn_index = $(this).text();
					$cilick = $(this);
					if(btn_index=="首页"){
						btn_index = 1;
						$cilick = $(".pagefooter a").eq(2);
						
					}else if(btn_index=="尾页"){
						btn_index = 1;
						$cilick = $(".pagefooter a").eq(1+page);
					}else if(btn_index=="上一页"){
						btn_index = $(".curr").text()-1;
						$cilick = $(".pagefooter a").eq($(".curr").index()-2);
					}else if(btn_index=="下一页"){
						btn_index = parseInt($(".curr").text())+1;
						$cilick = $(".pagefooter a").eq($(".curr").index());
					}
					if($cilick.text()==1){
						new_a_previous.style.display = "none";
						new_a_first.style.display = "none";
						new_a_nextpage.style.display = "inline-block";
						new_a_lastpage.style.display = "inline-block";
					}else if($cilick.text()==page){
						new_a_previous.style.display = "inline-block";
						new_a_first.style.display = "inline-block";
						new_a_nextpage.style.display = "none";
						new_a_lastpage.style.display = "none";
					}
					if(parseInt(btn_index)){
						
						$cilick.addClass("curr").siblings().removeClass("curr");
						$(".shop_list li").each(function(){
							console.log($(this).index(),pagemax*btn_index)
							if($(this).index()>=pagemax*btn_index||$(this).index()<pagemax*(btn_index-1)){
								$(this).css({
									display:"none"
								})
							}else{
								$(this).css({
									display:"block"
								})
							}
						})
					}
					
				})
				
			},300)
			
		})
	})
})
