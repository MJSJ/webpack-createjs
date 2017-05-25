import "../css/index.less"
import loader from "./load.js";
import Main from "./main.js"

var main = new Main();
//两个::,main.initialStage里的this为main
loader.on("complete",()=>{
	setTimeout(()=>{
		$('.loading').hide();
		main.initialStage()
	},2000)
})

import $ from "zepto"
import template from "../view/testTemplate.html"
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

