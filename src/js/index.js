import "../css/index.less"

import loader from "./load.js";
import CreateTest from "./createTest.js"

//初始化createjs 画布
var test = new CreateTest();
//两个::,绑定test.initialStage里的this为test
loader.on("complete",()=>{
	setTimeout(()=>{
		$('.loading').hide();
		test.initialStage()
	},2000)
})


/**
 * $jquery是通过CDN载入的，在webpack中配置了externals后，依然可以在这里引入
 */
import $ from "jquery"

/**
 * 可以加载html
 */
import template from "../view/testTemplate.html"

/**
 * 加载图片
 * 这个图片小于8k，
 * 会转成base64码
 */
import vcode from "../img/vcode.jpg"
// 反引号里可以用${}取js变量
var style = {
	position:"absolute",
	top:"50px",
	right:"0"
}


$("#main").append(template);
$("#main").append(`<img id='click' src=${vcode} style=position:${style.position};top:${style.top};right:${style.right} />`)


$("#click").on("click",()=>{
	$("#cvsContainer").show()
})

$("#cvsContainer").on("click",()=>{
	$("#cvsContainer").hide();
})

