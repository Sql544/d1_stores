require(["../js/config"],function(){
	require(["jquery","common"],function($){
		$ = jQuery;
		$("#head_insert").load("login_head.html");
		$("#footer_insert").load("footer.html");
		$(function(){
			var CookieMessage = Cookie.getCookie("message");
			CookieMessage = JSON.parse(CookieMessage);
			CookieMessage = Array.from(CookieMessage);
			summit_click(CookieMessage);
			input_focus_event();
			input_blur_event();
			
		})
		function summit_click(CookieMessage){
			var canlogin = false;
			$("#submit_btn_img").click(function(){
				$username = $("#login_username").val();
				$pwd = $("#login_pwd").val();
				$Code = $("#login_Code").val();
				CookieMessage.map(function(item){
				if(item.username == $username && item.pwd == $pwd && $Code == "A53T"){
						console.log(1);
						canlogin = true;
					}
				})
				if(canlogin==true){
					window.location.href="/index.html?username="+$("#login_username").val();
					var arr = [];
					var islogin= {
						username : $("#login_username").val(),
						login : true
					};
					arr.push(islogin)
					Cookie.insertCookie("loginmessage",JSON.stringify(arr),0,"/");
				}else{
					alert("密码错误");
				}
			})
		}
		function input_focus_event(){
			$("input").not(":last").focus(function(){
				var index = $("input").not(":last").index($(this));
				$("table .spanmsg").eq(index).css({
					display : "inline-block"
				})
			})
		}
		function input_blur_event(){
			$("input").not(":last").blur(function(){
				var index = $("input").not(":last").index($(this));
				$("table .spanmsg").eq(index).css({
					display : "none"
				})
			})
		}
	})
})
