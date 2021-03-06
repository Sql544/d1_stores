require.config({
	paths:{
		"jquery" : "/js/plug/jquery-1.11.3",
		"jquery_ui" : "/js/plug/jquery-ui",
		"common" : "/js/modules/common",
		"test" : "/js/modules/Jsonp_test",
		"goods" : "/js/modules/goods_Jsonp",
		"head" : "/js/modules/head"
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

