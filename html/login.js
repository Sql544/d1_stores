require(["../js/config"],function(){
	require(["jquery","common"],function($){
		$ = jQuery;
		var yzcode = ["0M43","2L5N","3T7S","5Y93","68F9","98K4","165A","854U","1024","3341","6294","9242","CYX0","F7V8","H956","I745","R237","UX3V","Z1R8","Z169"];
		var index = Math.floor(Math.random()*yzcode.length);
		$("#check_num").attr("src","../images/yzcode/"+yzcode[index]+".jpg");
		$("#head_insert").load("login_head.html");
		$("#footer_insert").load("footer.html");
		$(function(){
			var CookieMessage = Cookie.getCookie("message");
			CookieMessage = JSON.parse(CookieMessage);
			CookieMessage = Array.from(CookieMessage);
			summit_click(CookieMessage);
			input_focus_event();
			input_blur_event();
			changeCode();
			
		})
		function changeCode(){
			$(".changeCode").click(function(){
				index = Math.floor(Math.random()*yzcode.length);
				$("#check_num").attr("src","../images/yzcode/"+yzcode[index]+".jpg");
			})
		}
		function summit_click(CookieMessage){
			var canlogin = false;
			$("#submit_btn_img").click(function(){
				$username = $("#login_username").val();
				$pwd = $("#login_pwd").val();
				$Code = $("#login_Code").val();
				CookieMessage.map(function(item){
				if(item.username == $username && item.pwd == $pwd && $Code == yzcode[index]){
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
					alert("登录失败");
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
