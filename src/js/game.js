
/**
 * 给canvas画布定宽高
 */
const WIDTH  = 640;
const HEIGHT = 1136;

import $ from "zepto"
import loader from "./load.js"

//碰撞检测js
import util from "./util.js"

const WORDS = [
	"左上角静态bitmap，点击隐藏canvas",
	"running man 是一个spritesheet",
	"两个小球是movieclip",
	"搬动蓝色方块，碰撞检测"
]
const LINEHEIGHT = 50;
const FONT = "30px Arial"

export default class CreateTest{
	/**
	 * 构造函数
	 * 在new的时候会自动执行
	 */
	constructor(){
		let cvsContainer = document.getElementById("cvsContainer");
        cvsContainer.innerHTML = `<canvas id='cvs' width=${WIDTH} height=${HEIGHT}></canvas>`;
		// loader.on("complete",this.initialStage.bind(this))

	}

	initialStage(){
		
		this.play();

		this.stage = new createjs.Stage('cvs');
		
		this.stage.addChild(this.createSohu());
		this.stage.addChild(this.createGrant())
		this.stage.addChild(this.createTexts());


		let mc = this.createMovieClip();
		this.stage.addChild(mc);
		mc.gotoAndPlay("start");

		this.collision();

		//reqeustAnimation 
		createjs.Ticker.addEventListener("tick", this.stage);
	}
	
	collision(){
		let redRect,blueRect;
		let stage = this.stage

		redRect = new createjs.Shape();
		redRect.graphics.beginFill("red").drawRect(0, 0, 60, 40);
		redRect.x = 200;
		redRect.y = 100;
		//返回一个可以碰撞检测的代理对象
		let c_redRect = util.collisionable(redRect,60,40);
		
		blueRect = new createjs.Shape();
		blueRect.graphics.beginFill("blue").drawRect(0, 0, 60, 40);
		blueRect.x = 0;
		blueRect.y = 100;
		//返回一个可以碰撞检测的代理对象
		let c_blueRect = util.collisionable(blueRect,60,40);

		stage.addChild(c_redRect);
		stage.addChild(c_blueRect);
		stage.update();
		let _this = this;

		let isIntersaction = util.checkIntersection(c_blueRect,c_redRect);
		let situation = this.createText(`碰撞情况： ${isIntersaction}!`)
		stage.addChild(situation)

		document.addEventListener("touchmove", (event)=>{
			c_blueRect.x = event.touches[0].clientX;
			situation.text = `碰撞情况： ${util.checkIntersection(c_blueRect,c_redRect)}!`;
		});
	}

	
	createSohu(){
		var bitmap = new createjs.Bitmap(loader.getResult("sohu"));
		bitmap.x = 20;
		bitmap.y = 20;
		bitmap.addEventListener("click",()=>{
			$("#cvsContainer").hide();
		})
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

	createTexts(){
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

	createText(arg){
		let text = new createjs.Text(arg, FONT, "#000");
		text.y = 700;
		text.textBaseline = "alphabetic";
		return text;
	}

}
