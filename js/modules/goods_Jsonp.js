function callback_goods(data){
	var get_html = document.getElementById("mygoods");
	document.getElementsByClassName("shop_list")[0].innerHTML = translate(get_html.innerText,data.goods);
	document.getElementsByClassName("shop_list")[0].children[0].style.display = "block";
	document.getElementById("my_Jsonp").remove();
}
function jsonp_goods(url){
	var script_jsonp = document.createElement("script");
	script_jsonp.src = url;
	script_jsonp.id = "my_Jsonp";
	document.body.appendChild(script_jsonp);
}