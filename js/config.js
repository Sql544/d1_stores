require.config({
	paths:{
		"jquery" : "http://localhost:8020/d1/js/plug/jquery-1.11.3",
		"jquery_ui" : "http://localhost:8020/d1/js/plug/jquery-ui",
		"common" : "http://localhost:8020/d1/js/modules/common",
		"test" : "http://localhost:8020/d1/js/modules/Jsonp_test",
		"goods" : "http://localhost:8020/d1/js/modules/goods_Jsonp",
		"head" : "http://localhost:8020/d1/js/modules/head"
	},
	shim : {
		"test" : {
			deps: ["common"],
			exports : "callback"
		},
		"head" : {
			deps : ["jquery","jquery_ui","common"],
			exporys : "test"
		}
	}
})

