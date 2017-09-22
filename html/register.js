require(["../js/config"],function(){
	require(["jquery","common"],function($){
		$ = jQuery;
		var yzcode = ["0M43","2L5N","3T7S","5Y93","68F9","98K4","165A","854U","1024","3341","6294","9242","CYX0","F7V8","H956","I745","R237","UX3V","Z1R8","Z169"];
		var index = Math.floor(Math.random()*yzcode.length);
		$(".check_code_img").attr("src","../images/yzcode/"+yzcode[index]+".jpg");
		var check = {
			mobile_phone : /^(\d{11})$/,
			mobile_phone_check : /^\d{4}$/,
			password : /^.{6,14}$/,
			Confirm_password : /^.{6,14}$/
		}
		$("#head_insert").load("login_head.html");
		$("#footer_insert").load("footer.html");
		$(function(){
			$("input").not("#getCheckCode").not(":last").each(function(){
				$(this).val("");
				$(this).prop("checked",false);
			})
			focusEvent($("#mobile_phone"),$("#mobile_notice"),$("#tel_notice"),"请输入正确的手机号码。便于您接受订单消息，找回密码等。")
			blurEvent($("#mobile_phone"),$("#tel_notice"),$("#mobile_notice"),"手机号码格式不对，必须为11位数字",check.mobile_phone);
		
			focusEvent($("#mobile_phone_check"),$("#code_notice"),"","请输入手机验证码")
			blurEvent($("#mobile_phone_check"),"",$("#code_notice"),"验证码不能为空",check.mobile_phone_check);
			
			focusEvent($("#password"),$("#pwd_notice_word"),$("#pwd_notice_img"),"密码长度6-14位，支持数字、符号、字母，字母区分大小写")
			blurEvent($("#password"),$("#pwd_notice_img"),$("#pwd_notice_word"),"密码长度必须6-14位，请输入",check.password);
			
			focusEvent($("#Confirm_password"),$("#Confirm_pwd_notice_word"),$("#Confirm_pwd_notice_img"),"密码长度6-14位，支持数字、符号、字母，字母区分大小写")
//			blurEvent($("#Confirm_password"),$("#Confirm_pwd_notice_img"),$("#Confirm_pwd_notice_word"),"密码长度必须6-14位，请输入",check.Confirm_password);
			$("#Confirm_password").blur(function(){
				console.log($("#Confirm_password").val(),$("#password").val(),check.Confirm_password.test($(this).val()));
				if(check.Confirm_password.test($(this).val())&&$("#Confirm_password").val()==$("#password").val()){
					$("#Confirm_pwd_notice_img").css({
						display:"inline-block",
					}).find("img").attr("src","../images/register/suc.jpg");
					$("#Confirm_pwd_notice_word").text("");
					$(this).attr("ispass",true);
				}else{
					$("#Confirm_pwd_notice_img").css({
						display:"inline-block",
					});
					if(check.Confirm_password.test($(this).val())){
						passwordNotSame();
					}else{
						$("#Confirm_pwd_notice_img").css({
							display:"inline-block",
						}).find("img").attr("src","../images/register/no.gif");
						$("#Confirm_pwd_notice_word").text("密码长度必须6-14位，请输入").css({
							color:"red"
						});
					}
					$(this).attr("ispass",false);
				}
			})
			changeCode();
			$("#check_code").blur(function(){
				if($(this).val()==yzcode[index]){
					$(this).attr("ispass",true);
				}else{
					$(this).attr("ispass",false);
				}
			})
			sexClickEvent();
			$("#register_submit").click(function(){
				var canpass = true;
				$("input").not("#getCheckCode").not(":last").each(function(){
					console.log($(this).attr("ispass"));
					if($(this).attr("ispass")=="false"){
						canpass=false;
					}
				})
				if($("#password").val()!=$("#Confirm_password").val()){
					canpass = false;
					passwordNotSame();
				}
				if(canpass){
					var obj = {
						username : $("#mobile_phone").val(),
						pwd : $("#password").val()
					}
					var arr = [];
					arr = JSON.parse(Cookie.getCookie("message"));
					arr = Array.from(arr);
					console.log(arr);
					var flag = 1;
					if(arr==null){
						arr.push(obj);
					}else{
						for(var i in arr){
							if(arr[i].username==obj.username){
								flag=0;
								alert("用户名已注册");
								break;
							}
						}
						if(flag == 1){
							arr.push(obj);
							Cookie.insertCookie("message",JSON.stringify(arr),3600*24*5,"/");
							window.location.href="/html/login.html";
						}	
					}
				}else{
					alert("注册失败，还有错误信息，请检查");
				}
			})
		})
		function changeCode(){
			$(".newCode").click(function(){
				index = Math.floor(Math.random()*yzcode.length);
				$(".check_code_img").attr("src","../images/yzcode/"+yzcode[index]+".jpg");
			})
		}
		function passwordNotSame(){
			$("#Confirm_pwd_notice_img").css({
				display:"inline-block",
			}).find("img").attr("src","../images/register/no.gif");
			$("#Confirm_pwd_notice_word").text("两次密码不一致").css({
				color:"red"
			});
		}
		function sexClickEvent(){
			$(".sexinput").find("input").click(function(){
				console.log($(this).prop("checked"));
				if($(this).prop("checked")==true){
					$(this).prop("checked",true);
					$(this).siblings().prop("checked",false)
					$("#sex_notice").text("");
					$("#sex_notice_sucess").css({
						display : "inline-block"
					});
					$(this).attr("ispass",true);
					$(this).siblings().attr("ispass",true);
				}else{
					$(this).prop("checked",false);
					$("#sex_notice").text("请选择性别").css({
						color:"red"
					});
					$("#sex_notice_sucess").css({
						display : "none"
					});
					$(this).attr("ispass",false);
				}
			})
		}
		function focusEvent($ele,$target,$notice,text){
			$ele.focus(function(){
				if($notice){
					$notice.css({
						display:"none"
					})
				}
				$target.text(text).css({
					display:"block",
					color:"#999999"
				})
				
			})
		}
		function blurEvent($ele,$imgnotice,$wordnotice,text,check){
			$ele.blur(function(){
				if(check.test($(this).val())){
					if($imgnotice){
						$imgnotice.css({
							display:"inline-block",
						}).find("img").attr("src","../images/register/suc.jpg");
					}
					$wordnotice.text("");
					$ele.attr("ispass","true");
				}else{
					if($imgnotice){
						$imgnotice.css({
							display:"inline-block",
						}).find("img").attr("src","../images/register/no.gif");;
					}
					$wordnotice.text(text).css({
						color:"red"
					})
					$ele.attr("ispass","false");
				}
			})
		}
	})
})
