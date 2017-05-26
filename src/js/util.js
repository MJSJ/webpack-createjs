export default class util{
    constructor(stage){
        this.stage = stage;
    }

    static checkIntersection(a,b) {
        let rect1  = a.getBounds();
        let rect2  = b.getBounds();
		if ( rect1.x >= rect2.x + rect2.width || rect1.x + rect1.width <= rect2.x || rect1.y >= rect2.y + rect2.height || rect1.y + rect1.height <= rect2.y ) return false;
		return true;
	}
    static collisionable(displayObject,width,height){
        if(!displayObject.x && !displayObject.y){
            console.warn("the collisionableObject should set its x,y before excute this method\n otherwise,this method will set x,y to be 0 automatically")
            displayObject.x = 0;
            displayObject.y = 0;
        }

        if(!width||!height){
            console.error("width or height cannot be null or 0")
        }
        displayObject.setBounds(displayObject.x,displayObject.y,width,height);

        let obj = new Proxy(displayObject, {
            set: function (target, key, value, receiver) {
                if(key == "x"){
                    let{x,y,width,height} = target.getBounds();
                    target.setBounds(value,y,width,height);
                }
                if(key == "y"){
                    let{x,y,width,height} = target.getBounds();
                    target.setBounds(x,value,width,height);
                }
                return Reflect.set(target, key, value, receiver);
            }
        });
        return obj;
    }

}