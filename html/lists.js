require(["../js/config"],function(){
	require(["jquery","test","common","jquery_ui","goods","head"],function($){
		$ = jQuery;
		$("#head_insert").load("head.html",function(){
			setTimeout(function(){
				test();
			},300)
		});
		$("#footer_insert").load("footer.html");
		$(function(){
			var url = "/Jsonp/Jsonp.js";
			jsonp(url);
			var url1 = "/Jsonp/goodsJsonp.js";
			jsonp_goods(url1);
			var pagemax = 20;
			setTimeout(function(){
				accordingToprice_show();
				$(".shop_list li").each(function(){
					if($(this).index()>=pagemax){
						$(this).css({
							display:"none"
						})
					}
				})
				shops_num_btn();
				var page = Math.ceil($(".shop_list li").length/pagemax);
				pagejump(page);//分页
				$(".pagefooter font").eq(0).text(page); 
				insertIntoCart();//加入购物车
				closebox();//关闭提示框
				
			},300)
			
		})
		function shops_num_btn(){
			$(".goods_num_btn a").click(function(){
				if($(this).index()==0){
					$(this).get(0).parentNode.previousElementSibling.children[0].value ++;
				}else if($(this).index()==2&&$(this).get(0).parentNode.previousElementSibling.children[0].value>1){
					$(this).get(0).parentNode.previousElementSibling.children[0].value --;
				}
			})
		}
		function accordingToprice_show(){
			$(".shoptitle").each(function(){
				if($(this).text().trim()=="价格"){
					$price = $(this).siblings().find("a")
			    }
			})
			$price.click(function(){
				var click_range = $(this).text();
				var block_num = 0;
				if(click_range.indexOf("-")!=-1){
					var left_range = click_range.slice(0,click_range.indexOf("-"));
					var right_range = click_range.slice(click_range.indexOf("-")+1);
				}
				else{
					var range = parseInt(click_range);
					
				}
				$(".shop_list li").find(".my_price").each(function(){
					if(range){
						if($(this).find("font").text()<range){
							$(this).get(0).parentNode.parentNode.parentNode.remove();
						}
					}else{
						if(parseInt($(this).find("font").text())>parseInt(right_range)||parseInt($(this).find("font").text())<parseInt(left_range)){
							$(this).get(0).parentNode.parentNode.parentNode.style.display = "none";
						}else{
							$(this).get(0).parentNode.parentNode.parentNode.style.display = "block";
							block_num++;
						}
					}
					$(".pagefooter").remove();
				})
				
			})
		}
		function insertIntoCart(){
			var obj = {
				src : "",
				title : "",
				id : "",
				size : "",
				vipprice : "",
				getprice : "",
				num : "",
				total : ""
			}
			var LoginMessage = Cookie.getCookie("loginmessage");
			if(LoginMessage==0){
				var loginUser = "passerby";
			}else{
				var loginUser = JSON.parse(LoginMessage)[0].username;
			}
			$(".addintoct img").click(function(){
				$target_locate_box = $(this).parent().parent().parent()
				obj.src = $target_locate_box.find(".goods_img img").attr("src");
				obj.title = $target_locate_box.find(".goods_title .goods_name a").text().trim();
				obj.id = $target_locate_box.find(".goods_id span").text();
				obj.vipprice = $target_locate_box.find(".my_price font").text();
				obj.getprice = obj.vipprice;
				obj.num = $target_locate_box.find(".goods_incart input").val();
				obj.total = obj.num*obj.vipprice;
				var CookieGoods = Cookie.getCookie("goods");
				CookieGoods = JSON.parse(CookieGoods);
				CookieGoods = Array.from(CookieGoods);
				for(var i=0;i<CookieGoods.length;i++){
					if(CookieGoods[i].name==loginUser){
						for(var j=0;j<CookieGoods[i].goods.length;j++){
							if(CookieGoods[i].goods[j].id==obj.id){
								CookieGoods[i].goods[j].num = parseInt(CookieGoods[i].goods[j].num)+parseInt(obj.num);
								CookieGoods[i].goods[j].total = CookieGoods[i].goods[j].num*CookieGoods[i].goods[j].getprice;
								break;
							}
						}
						if(CookieGoods[i].goods.length==0||j==CookieGoods[i].goods.length){
							CookieGoods[i].goods.push(obj);
						}
						break;
					}
				}
				Cookie.insertCookie("goods",JSON.stringify(CookieGoods),3600*24*5,"/");
				test();
				$(".insert_into_cart").css({
					display : "block",
					top : ($(window).height()/2+$(window).scrollTop())+"px"
				})
				for(var i=0;i<CookieGoods.length;i++){
					if(CookieGoods[i].name==loginUser){
						var mygoods = CookieGoods[i].goods;
						break;
					}
				}
				var count = 0;
				var alltotal = 0;
				for(var i in mygoods){
					alltotal += parseInt(mygoods[i].total);
					count += parseInt(mygoods[i].num);
				}
				$(".hint_message span").first().text(count);
				$(".hint_message span").last().text(alltotal);
			})
		}
		function closebox(){
			$(".btn_close").click(function(){
				$(".insert_into_cart").css({
					display : "none"
				})
			})
			$(".continueShopping").click(function(){
				$(".insert_into_cart").css({
					display : "none"
				})
			})
		}
		function pagejump(page){
			var pagemax = 20;
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
					btn_index = page;
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
				$(".pagefooter font").eq(1).text($cilick.text());
				if(parseInt(btn_index)){
					$cilick.addClass("curr").siblings().removeClass("curr");
					$(".shop_list li").each(function(){
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
		}
	})
})
