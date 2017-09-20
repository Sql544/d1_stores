function test(){
	autocomplete();
	var CookieMessage = getCookie("loginmessage");
	CookieMessage = JSON.parse(CookieMessage);
	if(CookieMessage[0]&&CookieMessage[0].login){
		$(".head_inner p").first().html("您好&nbsp <a href='#'>"+CookieMessage[0].username+"</a> 欢迎来到D1购物<a href='#'>(退出登录)</a>&nbsp");
	}
	$(".head_inner p").first().find("a").last().click(function(){
		CookieMessage[0].login = false;
		document.cookie = "loginmessage=0";
		Window.reload();
	})

}
function getCookie(str){
	var cookiestr = document.cookie;
	var arr = cookiestr.split("; ");
	for(var i=0;i<arr.length;i++){
		var keylist = arr[i].split("=");
			if(keylist[0]==str){
				return keylist[1];
			}
		}
	return 0;
}
function autocomplete(){
	$(".searchbox").autocomplete({
    	source : function( request, response ) {
	        $.ajax({
	          	url: "http://suggestion.baidu.com?wd="+request.term,
	          	dataType: "jsonp",
	          	jsonp: "cb",
	          	success: function( data ) {
	            	response(data.s);
	          	}
	        });
      	},
      	select : function( event, ui ){
      		console.log(ui.item.value)
      	}
   });
}