
/**
 * 给canvas画布定宽高
 */
var WIDTH  = 640;
var HEIGHT = 1136;
let cvsContainer = document.getElementById("cvsContainer");
import $ from "jquery"
import loader from "./load.js";

export default class CreateTest{
	/**
	 * 构造函数
	 * 在new的时候会自动执行
	 */
	constructor(){

        let cvs = cvsContainer.innerHTML = `<canvas id='cvs' width=${WIDTH} height=${HEIGHT}></canvas>`;
		loader.on("complete",this.initialStage.bind(this))
        
	}

	initialStage(){
		$('.loading').hide();
		this.stage = new createjs.Stage('cvs');

		
		this.stage.addChild(this.createSohu());


		this.stage.addChild(this.createGrant())

		this.update();
	}
	createSohu(){
		var bitmap = new createjs.Bitmap(loader.getResult("sohu"));
		bitmap.x = 20;
		bitmap.y = 20;
		return bitmap;
	}

	createGrant(){
		let spriteSheet = new createjs.SpriteSheet({
			framerate: 30,
			"images": [loader.getResult("grant")],
			"frames": {"regX": 82, "height": 292, "count": 64, "regY": 0, "width": 165},
			// define two animations, run (loops, 1.5x speed) and jump (returns to run):
			"animations": {
				"run": [0, 25, "run", 1.5],
				"jump": [26, 63, "run"]
			}
		});
		let grant = new createjs.Sprite(spriteSheet, "run");
		grant.y = 35;
		grant.x = 200;
		return grant;
	}



	update(){
		this.stage.update();
        requestAnimationFrame(this.update.bind(this));
	}

}
