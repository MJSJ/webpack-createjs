import "../img/qrcode.png"
import $ from "zepto"
import coverHTML from "../view/cover.html"
import vcode from "../img/vcode.jpg"
// 反引号里可以用${}取js变量
var style = {
	position:"absolute",
	top:"50px",
	right:"0"
}

$("#main").append(coverHTML);
$("#main").append(`<img id='click' src=${vcode} style=position:${style.position};top:${style.top};right:${style.right} />`)


$("#click").on("touchstart",()=>{
	$("#cvsContainer").show()
})

$("#cvsContainer").on("touchstart",()=>{
	// $("#cvsContainer").hide();
})


/**
 * share part
 */
$(".sohu").on("touchstart",(e)=>{
	$(".share_box").show();
})

$(".share_box").on("touchstart",()=>{
	$(".share_box").hide();
})

$(".ewm").on("touchstart",(e)=>{
	e.stopPropagation();
})

