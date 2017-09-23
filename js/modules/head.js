function test(){
	$ = jQuery;
	var CookieMessage = getCookie("loginmessage");
	CookieMessage = JSON.parse(CookieMessage);
	setTimeout(function(){
		if(CookieMessage[0]&&CookieMessage[0].login){
			$(".login").html("您好&nbsp <a href='#'>"+CookieMessage[0].username+"</a> 欢迎来到D1购物<a href='#'>(退出登录)</a>&nbsp");
		}
		$(".login").find("a").last().click(function(){
			CookieMessage[0].login = false;
			document.cookie = "loginmessage=0;path=/;";
			window.location.href="/html/login.html";
		})
	},300)
	shoppingcar();
	autocomplete();
}
function shoppingcar(){
	$(".cart table tbody").html("");
	var LoginMessage = Cookie.getCookie("loginmessage");
	if(LoginMessage==0){
		var loginUser = "passerby";
	}else{
		var loginUser = JSON.parse(LoginMessage)[0].username;
	}
	console.log(loginUser);
	var CookieGoods = getCookie("goods");
	CookieGoods = JSON.parse(CookieGoods);
	CookieGoods = Array.from(CookieGoods);
	for(var i=0;i<CookieGoods.length;i++){
		if(CookieGoods[i].name==loginUser){
			CookieGoods = CookieGoods[i].goods;
			break;
		}
	}
	var count = 0;
	var allmoney = 0;
	for(var i=0;i<CookieGoods.length;i++){
		var tr = document.createElement("tr");
		var td1 = document.createElement("td");
		td1.width = 60;
		td1.height = 60;
		td1.style = "text-align:center"
		var img = document.createElement("img");
		img.src = CookieGoods[i].src;
		img.width = 50;
		img.height = 50;
		td1.appendChild(img);
		
		var td2 = document.createElement("td");
		td2.width = 250;
		var a = document.createElement("a");
		a.href = "#";
		a.innerText = CookieGoods[i].title;
		a.style = "line-height:18px;color:#000"
		td2.appendChild(a);
		
		var td3 = document.createElement("td");
		td3.width = 100;
		td3.style = "text-align:center";
		var em = document.createElement("em");
		em.innerText = "￥"+CookieGoods[i].getprice;
		var span = document.createElement("span");
		span.innerText = "x"+CookieGoods[i].num;
		td3.appendChild(em);
		td3.appendChild(span);
		
		tr.appendChild(td1);
		tr.appendChild(td2);
		tr.appendChild(td3);
		
		$(".cart table tbody").append(tr);
		count += parseInt(CookieGoods[i].num);
		allmoney += parseInt(CookieGoods[i].total);
	}
	$(".shops_num").text(count);
	$(".all_money").text(allmoney);
	$(".shopping_car_word span").text(count);
}
function getCookie(str){
	var cookiestr = document.cookie;
	var arr = cookiestr.split("; ");
	for(var i=0;i<arr.length;i++){
		var keylist = arr[i].split("=");
			if(keylist[0]==str){
				return decodeURIComponent(keylist[1]);
			}
		}
	return 0;
}
function autocomplete(){
	$(".searchbox").autocomplete({
    	source : function( request, response ) {
	        $.ajax({
	          	url: "/api/ajax/search/hotkeys.jsp?q="+request.term+"&p=1&s=0&contentType=application%2Fjson%3B+charset%3Dutf-8",
	          	type: "get",
	          	success: function( data ) {
	          		data = JSON.parse(data);
	          		var arr = [];
	          		for(var i in data.results){
	          			arr.push(data.results[i].name);
	          		}
	            	response(arr);
	          	}
	        });
      	},
      	select : function( event, ui ){
      		console.log(ui.item.value)
      	}
   });
}