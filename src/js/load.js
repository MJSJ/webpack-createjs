var loader = new createjs.LoadQueue();
loader.on("complete",onComplete);

loader.on("progress",onProgress);


loader.loadFile("../img/sohu.png");
loader.loadFile("../img/sprite.png");
loader.loadFile("http://news.sohu.com/upload/yursile/dushue/img/shop11.png");

function onComplete(e){
    setTimeout(()=>{
        document.querySelector('.loading').style.display="none";
    },3000);
}

function onProgress(e){
    var percent = parseInt(e.progress/e.total * 100) + '%';
    document.querySelector('.pace-progress').innerHTML=percent;

}
