"use strict";require(["../js/config"],function(){require(["jquery","common"],function(n){function e(e){var o=!1;n("#submit_btn_img").click(function(){if($username=n("#login_username").val(),$pwd=n("#login_pwd").val(),$Code=n("#login_Code").val(),e.map(function(n){n.username==$username&&n.pwd==$pwd&&"A53T"==$Code&&(console.log(1),o=!0)}),1==o){window.location.href="/index.html?username="+n("#login_username").val();var i=[],t={username:n("#login_username").val(),login:!0};i.push(t),Cookie.insertCookie("loginmessage",JSON.stringify(i),0,"/")}else alert("密码错误")})}function o(){n("input").not(":last").focus(function(){var e=n("input").not(":last").index(n(this));n("table .spanmsg").eq(e).css({display:"inline-block"})})}function i(){n("input").not(":last").blur(function(){var e=n("input").not(":last").index(n(this));n("table .spanmsg").eq(e).css({display:"none"})})}(n=jQuery)("#head_insert").load("login_head.html"),n("#footer_insert").load("footer.html"),n(function(){var n=Cookie.getCookie("message");n=JSON.parse(n),e(n=Array.from(n)),o(),i()})})});