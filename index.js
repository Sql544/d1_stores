require(["js/config"],function(){
	require(["jquery","jquery_ui","head"],function(){
	
		$("#head_insert").load("html/head.html",function(){
			test();
		});//加载头部
		$("#footer_insert").load("html/footer.html");//加载页底
		$(function(){
			var username = location.href.slice(location.href.indexOf("username=")+9);
			
			var ismouseover = false;
			$(".banner").mouseover(function(){//鼠标放在轮播图上轮播图的自动播放停止
				$(".banner .point div").fadeIn(500);
				ismouseover = true;
			})
			$(".banner").mouseleave(function(){//鼠标拿开轮播图再播放
				$(".banner .point div").fadeOut(500);
				ismouseover = false;
			});
			setInterval(function(){//轮播图自动播放
				if(!ismouseover){
					nextpage();
				}
			},3000);
			$(".banner .point div").click(function(){//上一页下一页点击事件
				if($(this).attr("class")=="left_point"){
					prepage();
				}else{
					nextpage();
				}
			})
			banner_listener();//banner图监听事件
			main_listener();//main监听事件
			isFixed();//判断是否超过Title导航的高度
			TitleNavClick();//点击移动导航跳转
			
		})
		function banner_listener(){
			$(".banner ul li").mouseover(function(){//轮播图鼠标放上去事件
				$(this).removeClass("static").addClass("active").siblings().removeClass("active").addClass("static");	
				$(".banner .banner_inner div").eq($(this).text()-1).fadeIn(500).siblings().css({
					display : "none"
				})
			})
			
		}
		function main_listener(){
			$(".theme .theme_shops .item").mouseover(function(){//创意主题模块鼠标放上去的事件
				$(this).css({
					cursor:"pointer"
				})
				$(this).find("img").css({
					opacity : 0.8
				});
				$(this).find("p").css({
					color:"#f44236"
				})
			});
			
			$(".theme .theme_shops .item").mouseleave(function(){//创意主题鼠标移开事件
				$(this).find("img").css({
					opacity : 1
				});
				$(this).find("p").css({
					color:"black"
				})
			})
			
			$(".design .design_shops .item").mouseover(function(){//除了创意主题鼠标放上去事件
				$(this).find("dd").find("p").eq(0).css({
					color : "rgb(205,0,116)"
				}).siblings().css({
					color : "#a1b1bc"
				})
				
				$(this).find("div").css({
					display : "block"
				});
				$(this).find("dd").stop().animate({
					top : "300px"
				},300)
			})
			$(".design .design_shops .item").mouseleave(function(){//除了创意主题鼠标移开事件
				$(this).find("dd").find("p").eq(0).css({
					color : "black"
				})
				$(this).find("div").css({
					display : "none"
				});
				$(this).find("dd").stop().animate({
					top : "370px"
				},300)
			})
			$(".design .design_shops .item").find("dd").mouseover(function(){//放在价格所在块，鼠标变成手指
				$(this).css({
					cursor : "pointer"
				})
			})
		}
		function TitleNavClick(){
			var children = $(".main_inner").children();
			$(".moveTitle ul li").click(function(){
				if($(this).index()==0){
					$("body").animate({
						scrollTop:0
					},500)
					return;
				}
				$("body").animate({
					scrollTop:((children.eq($(this).index()-1).offset().top)-30)
				},500)
			})
			$(window).scroll(function(){
				var index = -1;
				$(".main_inner").children().each(function(){
					var rangetop = $(this).offset().top-window.innerHeight/2;
					var rangebottom = $(this).offset().top + $(this).height()- window.innerHeight/2;
					if($(window).scrollTop()>rangetop && $(window).scrollTop()<rangebottom){
						index = $(this).index();
					}
				})
				$(".moveTitle ul li").eq(index+1).find("a").removeClass("normal").addClass("active_Title_nav");
				$(".moveTitle ul li").eq(index+1).siblings().find("a").removeClass("active_Title_nav").addClass("normal");
			})
		}
		function isFixed(){
			$(window).scroll(function(){
//				console.log($(this).scrollTop());
				if($(this).scrollTop()>579){
					$(".moveTitle").css({
						zIndex : 2000,
						position : "fixed",
						top:0
					})
				}else{
					$(".moveTitle").css({
						position : "static"
					})
				}
			})
		}
		function nextpage(){
			var start = $(".active").text();
			if(start==$(".banner .banner_inner div").length){
				start = 0;
			}
			$(".banner .banner_inner div").eq(start).fadeIn(500).siblings().css({
				display : "none"
			})
			$(".banner ul li").eq(start).removeClass("static").addClass("active").siblings().removeClass("active").addClass("static");
		}
		function prepage(){
			var start = $(".active").text();
			if(start==1){
				start = $(".banner .banner_inner div").length-1;
			}else{
				start = start-2;
			}
			console.log(start);
			$(".banner .banner_inner div").eq(start).fadeIn(500).siblings().css({
				display : "none"
			})
			$(".banner ul li").eq(start).removeClass("static").addClass("active").siblings().removeClass("active").addClass("static");
		}
		
		
	})
})
