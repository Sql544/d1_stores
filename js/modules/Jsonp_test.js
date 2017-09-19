function callback(data){
	var get_html = document.getElementById("myul");
	document.getElementsByClassName("listbody_container")[0].innerHTML = translate(get_html.innerText,data);
	document.getElementsByClassName("listbody_container")[0].children[0].style.display = "block";
	document.getElementById("my_Jsonp").remove();
}
function jsonp(url){
	var script_jsonp = document.createElement("script");
	script_jsonp.src = url;
	script_jsonp.id = "my_Jsonp";
	document.body.appendChild(script_jsonp);
}
function callback1(data){
	var get_html = document.getElementById("Jsonp");
	document.getElementsByClassName("center")[0].innerHTML = translate(get_html.innerText,data);
	document.getElementsByClassName("center")[0].children[0].style.display = "block";
//	document.getElementById("my_Jsonp").remove();
}
