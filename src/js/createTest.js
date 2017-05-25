
/**
 * 给canvas画布定宽高
 */
var WIDTH  = 640;
var HEIGHT = 1136;
let cvsContainer = document.getElementById("cvsContainer");
import $ from "jquery"
import loader from "./load.js";

const WORDS = [
	"左上角静态bitmap",
	"running man 是一个spritesheet",
	"两个小球是movieclip"
]
const LINEHEIGHT = 50;
const FONT = "30px Arial"

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
		this.play();

		this.stage = new createjs.Stage('cvs');
		this.stage.addChild(this.createSohu());
		this.stage.addChild(this.createGrant())
		this.stage.addChild(this.createText());


		let mc = this.createMovieClip();
		this.stage.addChild(mc);
		mc.gotoAndPlay("start");

		//reqeustAnimation 
		createjs.Ticker.addEventListener("tick", this.stage);
	}

	createSohu(){
		var bitmap = new createjs.Bitmap(loader.getResult("sohu"));
		bitmap.x = 20;
		bitmap.y = 20;
		return bitmap;
	}

	play(){
         createjs.Sound.play("river");
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

	createMovieClip(){

		 var mc = new createjs.MovieClip(null, 0, true, {start:20});
		

		 var child1 = new createjs.Shape(
			 new createjs.Graphics().beginFill("#999999")
				 .drawCircle(130,30,30));
		 var child2 = new createjs.Shape(
			 new createjs.Graphics().beginFill("#5a9cfb")
				 .drawCircle(130,30,30));

		 mc.timeline.addTween(
			 createjs.Tween.get(child1)
				 .to({x:0}).to({x:160}, 50).to({x:0}, 50));
		 mc.timeline.addTween(
			 createjs.Tween.get(child2)
				 .to({x:160}).to({x:0}, 50).to({x:160}, 50));

		 return mc;
	}

	createText(){
		let container = new createjs.Container();
		
		WORDS.forEach((item,index)=>{
			let text = new createjs.Text(item, FONT, "#ff7700");
			text.x = 100;
			text.y = 400+index*LINEHEIGHT;
			text.textBaseline = "alphabetic";
			container.addChild(text);
		});
		
		return container;
	}

}
