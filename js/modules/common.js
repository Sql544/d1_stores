function log(n){
	console.log(n);
}
function print(n){
	document.write(n);
}
var DateMethod  = {//日期
	string2 : function(str){//统一日期的标准可识别
		for(var i=0;i<str.length;i++){
			if(Number(str.charAt(i))||Number(str.charAt(i))==0){
			}else{
				var exp = RegExp(str.charAt(i));
				str = str.replace(exp,".");
			}
		}
		return str;
	},
	change : function(n){//字符串转换为日期对象
		n = string2(n);
		var d1 = new Date(n);
		return d1;
	},
	isLeapYear : function(year){//判断闰年
		return (year%400==0||year%100!=0&&year%4==0);
	},
	datetostring : function(n){//日期转换为字符串
		n = new date();
		return n.getYear()+"/"+n.getMonth()+"/"+n.getDate();
	},
	getAfterDays : function(n){//获取几天后的日期
		var date = new Date();
		date.setDate(date.getDate()+n);
		return date;
	},
	getMonthDay : function(month,year){//获取几月有多少人
		var date = new Date(year.toString()+"-"+(Number(month)).toString()+"-"+"1");
		date.setMonth(date.getMonth()+1);
		date.setDate(date.getDate()-1);
		return date.getDate();
	},
	drarge : function(num){//判断月份是否要加“01，02”这种样式
		if(num<10){
			num = "0" + num;
		}
		return num;
	}
}
var num = {//验证码和随机数
	rand : function(min,max){//生成指定范围内的随机数[);
		return parseInt(Math.random()*(max-min))+min;
	},
	//验证码
	createCode : function(len){
		var str="";
		for(var i=0;i<len;i++){
			var asc = Math.round(Math.random()*74)+48;
			for(;asc>=58&&asc<=64||asc>=91&&asc<=96;){
				asc = Math.round(Math.random()*74)+48;
			}
			str += String.fromCharCode(asc);
		}
		return str;
	}
}
var scroll = {//滚动条
	ScrollTop : function(){//滚动条的竖直滚动距离
		return document.body.scrollTop || document.documentElement.scrollTop;;
	},
	ScrollLeft : function(){//滚动条的水平滚动距离
	
		return document.body.scrollLeft || document.documentElement.scrollLeft;;
	}
}
var ieSolutions = {//IE兼容
	ise : function(e){//判断事件e
		e = e || event;
		return e;
	},
	isTarget : function (e){//获取目标
		var target = e.target || e.srcElement;
		return target;
	},
	isHaveClassName : function(){//是否有获取classname的方法
		if(!document.getElementsByClassName){
			doucment.getElementsByClassName = function(classname){
				var arr = [];
				var all = document.getElementsByTagName("*");
				for(var i =0;i<all.length;i++){
					if(all[i].className.indexOf(classname+" ")!=-1){
						arr.push(all[i]);
					}
				}
			}
		}
		return arr;
	},
	getStyle : function(obj,attr){//获取行内样式属性
		if(!obj.currentStyle){
			return getComputedStyle(obj,null)[attr];
		}else{
			return obj.currentStyle[attr];
		}
	},
	stopTrans : function(e){//停止事件流的传播
		if(e.stopPropagation){
			return e.stopPropagation();
		}else{
			return e.cancelBubble = true;
		}
	},
	addEvent : (function(){//添加监听事件
		if(window.VBArray){
			return function(obj,eventname,func){
				obj.attachEvent("on"+eventname,func);
			};
		}else{
			return function(obj,eventname,func,ispupple){
				obj.addEventListener(eventname,func,!!ispupple);
			};
		}
	})(),
}
var Cookie = {//Cookie
	getCookie : function(str){
		var cookiestr = document.cookie;
		var arr = cookiestr.split("; ");
		for(var i=0;i<arr.length;i++){
			var keylist = arr[i].split("=");
			if(keylist[0]==str){
				return keylist[1];
			}
		}
		return 0;
	},
	insertCookie : function(name,content,expires,path){
		document.cookie = name + "=" + content+";" + (expires? "max-age="+ expires+ ";" :"") + (path? "path=" +path+ ";" :"");
	}
}

function getdaysbetw(d1,d2){//获取两个日期的天数差距
	if(typeof d1==String){
		DateMethod.change(d1);
	}
	if(typeof d2==String){
		DateMethod.change(d2);
	}
	return Math.abs(d1.getTime()-d2.getTime)/86400000;
}
function changetoarr(list){//将伪数组转换成数组
	var temp = [];
	for(var i=0;i<list.length;i++){
		temp.push(list[i]);
	}
	return temp;
}
function offsetPage(n){//计算绝对位置
	if(isNaN(Number(n)) || (typeof n == undefined)){
		throw new Error("你是猪吗 瞎JB乱输");
	}
	var _left = n.offsetLeft;
	var _top = n.offsetTop;
	while(n.offsetParent){
		_left += n.offsetParent.offsetLeft;
		_top += n.offsetParent.offsetTop;
		n = n.offsetParent;
	}
	return {"left":_left,"top":_top};
}
function total(str){//计算字母出现次数
		var arr={};
		for(var i=0;i<str.length;i++){
			if(arr[str.charAt(i)]>0){
				arr[str.charAt(i)]++;
			}else{
				arr[str.charAt(i)]=1;
			}
		}
		
		for(var i in arr){
			log("字母为："+i+" 出现次数为"+arr[i]);
		}
}
function $(str){//选择器
	var matcharr = null;
	if(matcharr = str.match(/^#(.+)/)){
		return document.getElementById(matcharr[1]);
	}
	if(matcharr = str.match(/^\.(.+)/)){
		return Array.from(document.getElementsByClassName(matcharr[1]));
	}
	if(matcharr = str.match(/^([^\.#][A-Za-z0-9]+$)/)){
		return Array.from(document.getElementsByTagName(matcharr[1]));
	}
	if(matcharr = str.match(/^([^\.#\[]+)\[([^=]+)=([^\]]+)\]/)){
		
		var TagName = matcharr[1];
		var attrname = matcharr[2];
		var attrvalue = matcharr[3];
		var list = Array.from(document.getElementsByTagName(matcharr[1]));
		var result = list.filter(function(value,index){
			return value.getAttribute(attrname) == attrvalue;
		});
		return result;
	}
}


function CurveMove(obj,target,randius,limit){//曲线运动
	var nowpos = {};
	var targetpos = {};
	nowpos.x = obj.offsetLeft;
	nowpos.y = obj.offsetTop;
	targetpos.x = target.offsetLeft-nowpos.x;
	targetpos.y = target.offsetTop - nowpos.y;
	clearInterval(obj.t);
	var b = -1*((randius*(targetpos.x)*(targetpos.x)-(targetpos.y))/targetpos.x);
	var count = 0;
	if(obj.offsetLeft<=target.offsetLeft){
		var flag = 1;
	}else{
		var flag = 0;
	}
	obj.t = setInterval(function(){
		console.log(target.offsetLeft);
		if(flag==1){
			obj.style.left = nowpos.x+count+"px";
			obj.style.top = nowpos.y+randius*count*count+b*count + "px";
			count += 20;
		}else{
			obj.style.left = nowpos.x+count+"px";
			obj.style.top = nowpos.y+randius*count*count+b*count + "px";
			count -= 20;
		}
		if(limit){
			if(obj.offsetLeft<limit.left || obj.offsetTop>limit.top){
				obj.remove();
			}
		}
	},30)
}


function translate(template,data){//字符串模板引擎
	template = "log(`" + template + "`);";
	template = template.replace(/<%=(.+)%>/g,"`); log($1); log(`");
	template = template.replace(/<%(.+)%>/g,"`); $1 log(`");
	var realfuc = `(function(data){
			var htmlstr = "";
			function log(str){
				htmlstr += str;
			}
			${template};
			return htmlstr;
		})`;
	var res = eval(realfuc);
	return res(data);
}
