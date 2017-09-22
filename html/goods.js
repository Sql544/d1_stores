require(["../js/config"],function(){
	require(["jquery","test","common","goods","jquery_ui","head"],function($){
		$ = jQuery;
		$("#head_insert").load("head.html",function(){
			test();
		});
		$("#footer_insert").load("footer.html");
		$(function(){
			$(".fdImg a").click(function(){
				$(this).attr("href",$(".wrap a img").attr("src").slice(0,-8)+".jpg");
			})
//			var url = "http://localhost:8020/d1/Jsonp/test.json";
//			jsonp(url);
			$.ajax({
				type:"get",
//				dataType:jsonp,
				url:"http://localhost:8080/Jsonp/test.json",
				async:true,
				success:function(msg){
					var result = {};
					for(var i=0;i<msg.length;i++){
						for(var j in msg[i]){
							if(msg[i].gdsid==location.href.slice(location.href.indexOf("id=")+3)){
								result = msg[i];
								break;
								
							}
						}
					}
					msg = result;
					console.log()
					callback1(result);
					if(result.msedate){
						setInterval(function(){//倒计时
							var nowdata = new Date();
							var thatdate = new Date(msg.msedate.slice(0,10));
							var leftTime = -(nowdata.getTime()-thatdate.getTime());
							leftTime = leftTime/1000;
							var day = parseInt(leftTime/86400);
							var hour = parseInt((leftTime-day*86400)/3600);
							var minutes = parseInt(((leftTime-day*86400)-hour*3600)/60);
							var seconds = parseInt(leftTime%60);
							$("#leftTime").text("剩余时间"+day+"天"+change(hour)+":"+change(minutes)+":"+change(seconds));
						},1000)
					}
					titletab();//切换标题
					bigImg();//放大镜
					SmallImgHover();//小图片映射
					goods_num();//增加或减少商品数量
					insertIntoCart();//加入购物车
					closebox();//关闭弹出框
					backTotop();//回到顶部
				}
			});
			
		})
		function backTotop(){
			$(".fixed_box").click(function(e){
				if(e.offsetY>62){
					$("html").stop().animate({
						scrollTop:0
					},500)
				}
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
			$(".mg_l img").click(function(){
				obj.src = $(".wrap a img").attr("src");
				obj.title = $(".goods_right_title h1 font").text().trim();
				obj.id = $(".shop_id").text();
				obj.size = "无";
				obj.vipprice = $(".big_price").text().slice(1,$(".big_price").text().indexOf("."));
				obj.getprice = obj.vipprice;
				obj.num = $("#buy_num_input").val();
				obj.total = obj.vipprice*obj.num;
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
		function change(data){
			if(data<10){
				data = "0"+data.toString();
			}
			return data;
		}
		function titletab(){
			$(".goods_show_img_right_nav a").click(function(){
				$(this).addClass("choose").siblings().removeClass("choose");
				$(".content_list").children().not("div").not(":last").eq($(this).index()).css({
					display : "block"
				}).siblings().not(":last").css({
					display:"none"
				})
			})
		}
		function goods_num(){
			$(".cut").click(function(){
				if($("#buy_num_input").val()>1){
					$("#buy_num_input").val($("#buy_num_input").val()-1);
				}
			});
			$(".add").click(function(){
				$("#buy_num_input").val(parseInt($("#buy_num_input").val())+1);
			});
		}
		function SmallImgHover(){
			$(".goods_show ul li img").mouseover(function(){
				$(this).css({
					border : "2px solid #e4393c",
					padding : 0
				})
				$src = $(this).attr("src");
				$(".wrap a img").attr("src",$src);
			})
			$(".goods_show ul li img").mouseout(function(){
				$(this).css({
					border : "1px solid #dfdfdf",
					padding : "1px"
				})
			})
		}
		function bigImg(){
			$(".wrap .mouse_wrap").mousemove(function(e){
				$(".wrap .small_box").stop().fadeIn(100);
				$(".wrap .big_box").stop().fadeIn(100);
				mouse_position = {
					x : e.clientX + $(window).scrollLeft(),
					y : e.clientY + $(window).scrollTop()
				}
				box_position = {
					x : Math.min($(this).width()-$(".wrap .small_box").width(),Math.max(0,mouse_position.x - $(this).offset().left - $(".wrap .small_box").width()/2)),
					y : Math.min($(this).height()-$(".wrap .small_box").height(),Math.max(0,mouse_position.y - $(this).offset().top - $(".wrap .small_box").height()/2)),
				}
				$(".wrap .small_box").css({
					left : box_position.x,
					top : box_position.y
				});
				if($(".wrap a img").attr("src").slice(-1)=="/"){
					$src = $(".wrap a img").attr("src").slice(0,-9)+".jpg";
				}else{
					$src = $(".wrap a img").attr("src").slice(0,-8)+".jpg";
				}
				$(".wrap .big_box").css({
					backgroundPositionX : -box_position.x*2,
					backgroundPositionY : -box_position.y*2,
					backgroundImage : "url("+$src+")"
				})
			})
			$(".wrap .mouse_wrap").mouseout(function(e){
				$(".wrap .small_box").stop().fadeOut(100);
				$(".wrap .big_box").stop().fadeOut(100);	
			})
		}
	})
})