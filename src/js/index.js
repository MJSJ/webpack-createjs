import "../css/index.less"
import loader from "./load.js"
import Game from "./game.js"
import $ from "zepto"

var game = new Game();
//两个::,game.initialStage里的this为game
loader.on("complete",()=>{
	setTimeout(()=>{
		$('.loading').hide();
		game.initialStage()
	},2000)
})

import "./dom.js"