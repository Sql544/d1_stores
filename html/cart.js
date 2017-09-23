require(["../js/config"],function(){
	require(["jquery","common"],function($){
		$ = jQuery;
		$(function(){
			var LoginMessage = Cookie.getCookie("loginmessage");
			setTimeout(function(){
				if(LoginMessage==0){
					var loginUser = "passerby";
				}else{
					var loginUser = JSON.parse(LoginMessage)[0].username;
					$(".f_l").html("您好&nbsp <a href='#'>"+JSON.parse(LoginMessage)[0].username+"</a> 欢迎来到D1购物<a href='#'>(退出登录)</a>&nbsp");
				}
				$(".f_l").find("a").last().click(function(){
					JSON.parse(LoginMessage)[0].login = false;
					document.cookie = "loginmessage=0;path=/;";
					window.location.href="/html/login.html";
				})
				
			},300)
			createLists(function(){
				getallnum();//重新刷新数量
				getallmoney();//刷新总金额
				goods_num();//增加和减少数量
				delete_oneline();//删除这一列
				deleteall();//删除所有
			});
		})
	})
})
function createLists(callback){
	$=jQuery;
	var LoginMessage = Cookie.getCookie("loginmessage");
	if(LoginMessage==0){
		var loginUser = "passerby";
	}else{
		var loginUser = JSON.parse(LoginMessage)[0].username;
	}
	var CookieGoods = Cookie.getCookie("goods");
	CookieGoods = JSON.parse(CookieGoods);
	CookieGoods = Array.from(CookieGoods);
	
	
	for(var i=0;i<CookieGoods.length;i++){
		if(CookieGoods[i].name==loginUser){
			var CookieMessage = CookieGoods[i].goods;
			break;
		}
	}
	for(var i=0;i<CookieMessage.length;i++){//用DOM操作动态生成一个列表
		var tr = document.createElement("tr");
		tr.style = "background: #fffddd;";
		
		var td1 = document.createElement("td");
		td1.style = "background:#fffddd;";
		td1.className = "cart_1";
		td1.height = 100;
		var a1 = document.createElement("a");
		a1.href = "#";
		var img1 = document.createElement("img");
		img1.src = CookieMessage[i].src;
		a1.appendChild(img1);
		td1.appendChild(a1);
		var td2 = document.createElement("td");
		td2.className = "other_message";
		td2.style = "text-align: left";
		var span1 = document.createElement("span");
		span1.innerText = CookieMessage[i].title;
		var br1 = document.createElement("br");
		var span2 = document.createElement("span");
		span2.innerText = CookieMessage[i].id;
		var br2 = document.createElement("br");
		var a2 = document.createElement("a");
		a2.innerText = "删除";
		a2.className = "delete";
		var span10 = document.createElement("span");
		span10.innerHTML =  "&nbsp;&nbsp;&nbsp;&nbsp;"
		var a3 = document.createElement("a");
		a3.innerText = "加入收藏";
		td2.appendChild(span1);
		td2.appendChild(br1);
		td2.appendChild(span2);
		td2.appendChild(br2);
		td2.appendChild(a2);
		td2.appendChild(span10);
		td2.appendChild(a3);
		td3 = document.createElement("td");
		
		td3.innerText = "无";
		var td4 = document.createElement("td");
		var span3 = document.createElement("span");
		span3.innerText = CookieMessage[i].vipprice;
		td4.appendChild(span3);
		var td5 = document.createElement("td");
		var span4 = document.createElement("span");
		span4.innerText = CookieMessage[i].getprice;
		span4.className = "getprice";
		td5.appendChild(span4);
		
		
		var td6 = document.createElement("td");
		var a4 = document.createElement("a");
		a4.className = "cut";
		a4.style = "float: left;";
		var img2 = document.createElement("img");
		img2.src = "http://images.d1.com.cn/images2012/New/flow/j_a.gif";
		a4.appendChild(img2);
		
		var input = document.createElement("input");
		input.type = "text";
		input.className = "buy_num_input";
		input.value = CookieMessage[i].num;
		
		var a5 = document.createElement("a");
		a5.className = "add";
		a5.style = "float: left;";
		var img3 = document.createElement("img");
		img3.src = "http://images.d1.com.cn/images2012/New/flow/a_j.gif";
		a5.appendChild(img3);
		
		td6.appendChild(a4);
		td6.appendChild(input);
		td6.appendChild(a5);
		
		var td7 = document.createElement("td");
		var font = document.createElement("font");
		font.color = "#FF0000";
		font.innerText = CookieMessage[i].total;
		font.className = "small_total";
		td7.appendChild(font);
		
		tr.appendChild(td1);
		tr.appendChild(td2);
		tr.appendChild(td3);
		tr.appendChild(td4);
		tr.appendChild(td5);
		tr.appendChild(td6);
		tr.appendChild(td7);
		
		
		$(".shopLists tbody").append(tr);
		
		
	}
		callback();
}
function goods_num(){
	$(".cut").click(function(){
		var CookieGoods = Cookie.getCookie("goods");
		CookieGoods = JSON.parse(CookieGoods);
		CookieGoods = Array.from(CookieGoods);
		var LoginMessage = Cookie.getCookie("loginmessage");
		if(LoginMessage==0){
			var loginUser = "passerby";
		}else{
			var loginUser = JSON.parse(LoginMessage)[0].username;
		}
		$input_box = $(this).parent().parent().find(".buy_num_input");
		$id = $(this).parent().parent().find(".other_message span").eq(1).text();
		$price = $(this).parent().parent().find(".getprice").text();
		$smalltotal = $(this).parent().parent().find(".small_total");
		if($input_box.val()>1){
			$input_box.val($input_box.val()-1);
			$smalltotal.text($input_box.val()*$price);
			for(var i=0;i<CookieGoods.length;i++){
				if(CookieGoods[i].name==loginUser){
					for(var j=0;j<CookieGoods[i].goods.length;j++){
						if(CookieGoods[i].goods[j].id==$id){
							CookieGoods[i].goods[j].num = $input_box.val();
							CookieGoods[i].goods[j].total = $smalltotal.text();
							Cookie.insertCookie("goods",JSON.stringify(CookieGoods),3600*24*5,"/");
							break;
						}
					}
					break;
				}
			}
			getallnum();
			getallmoney();
		}
		
	});
	$(".add").click(function(){
		var CookieGoods = Cookie.getCookie("goods");
		CookieGoods = JSON.parse(CookieGoods);
		CookieGoods = Array.from(CookieGoods);
		var LoginMessage = Cookie.getCookie("loginmessage");
		if(LoginMessage==0){
			var loginUser = "passerby";
		}else{
			var loginUser = JSON.parse(LoginMessage)[0].username;
		}
		$input_box = $(this).parent().parent().find(".buy_num_input");
		$id = $(this).parent().parent().find(".other_message span").eq(1).text();
		$price = $(this).parent().parent().find(".getprice").text();
		$smalltotal = $(this).parent().parent().find(".small_total");
		$input_box.val(parseInt($input_box.val())+1);
		$smalltotal.text( $input_box.val()*$price );
		for(var i=0;i<CookieGoods.length;i++){
			if(CookieGoods[i].name==loginUser){
				for(var j=0;j<CookieGoods[i].goods.length;j++){
					if(CookieGoods[i].goods[j].id==$id){
						CookieGoods[i].goods[j].num = $input_box.val();
						CookieGoods[i].goods[j].total = $smalltotal.text();
						Cookie.insertCookie("goods",JSON.stringify(CookieGoods),3600*24*5,"/");
						break;
					}
				}
				break;
			}
		}
		getallnum();
		getallmoney();
	});
}
function delete_oneline(){
	$(".delete").click(function(){
		var CookieGoods = Cookie.getCookie("goods");
		CookieGoods = JSON.parse(CookieGoods);
		CookieGoods = Array.from(CookieGoods);
		var LoginMessage = Cookie.getCookie("loginmessage");
		if(LoginMessage==0){
			var loginUser = "passerby";
		}else{
			var loginUser = JSON.parse(LoginMessage)[0].username;
		}
		$id = $(this).parent().parent().find(".other_message span").eq(1).text();
		$(this).parent().parent().remove();
		for(var i=0;i<CookieGoods.length;i++){
			if(CookieGoods[i].name==loginUser){
				for(var j=0;j<CookieGoods[i].goods.length;j++){
					if(CookieGoods[i].goods[j].id==$id){
						CookieGoods[i].goods.splice(j,1);
						Cookie.insertCookie("goods",JSON.stringify(CookieGoods),3600*24*5,"/");
						break;
					}
				}
				break;
			}
		}
		getallnum();
		getallmoney();
	})
}
function deleteall(){
	$(".deleteall").click(function(){
		var CookieGoods = Cookie.getCookie("goods");
		CookieGoods = JSON.parse(CookieGoods);
		CookieGoods = Array.from(CookieGoods);
		var LoginMessage = Cookie.getCookie("loginmessage");
		if(LoginMessage==0){
			var loginUser = "passerby";
		}else{
			var loginUser = JSON.parse(LoginMessage)[0].username;
		}
		for(var i=0;i<CookieGoods.length;i++){
			if(CookieGoods[i].name==loginUser){
				CookieGoods[i].goods=[];
				Cookie.insertCookie("goods",JSON.stringify(CookieGoods),3600*24*5,"/");
				break;
			}
		}
		$(".shopLists tr").not(":first").remove();
		$(".tailed").find("font").eq(0).text(0);
		$(".tailed").find("span").text(0);
	})
}
function getallnum(){
	$ = jQuery;
	var count = 0;
	$(".buy_num_input").each(function(){
		count += parseInt($(this).val());
	})
	$(".tailed").find("font").eq(0).text(count);
}
function getallmoney(){
	var allmoney = 0;
	$(".small_total").each(function(){
		allmoney += parseInt($(this).text());
	})
	$(".tailed").find("span").text(allmoney);
}
