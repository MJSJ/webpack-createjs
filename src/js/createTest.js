
/**
 * 给canvas画布定宽高
 * 640*1136
 * 然后利用pageUtil缩放
 * pageUtil是在loading.html中引入的
 */
var WIDTH  = 640;
var HEIGHT = 1136;
let cvsContainer = document.getElementById("cvsContainer");
// new window.pageUtil("#cvsContainer").response();

import "./load.js";
/**
 * 定义pixi测试类
 * 注意写法
 */
export default class CreateTest{
	/**
	 * 构造函数
	 * 在new的时候会自动执行
	 */
	constructor(){

        let cvs = cvsContainer.innerHTML = "<canvas id='cvs'></canvas>";
        this.stage = new createjs.Stage('cvs');
        var bitmap = new createjs.Bitmap("../img/sohu.png");
		bitmap.width = 124;
		bitmap.height = 50;
		bitmap.x = 20;
		bitmap.y = 20;
		// bitmap.scaleX = 2;
		// bitmap.scaleY = 0.5;
		// console.log(bitmap.getBounds())
		// bitmap.setBounds(20,20,114,57)
		// console.log(bitmap.getBounds());
        this.stage.addChild(bitmap);
        this.update();
	}



	update(){
		this.stage.update();
        requestAnimationFrame(this.update.bind(this));
	}

}
