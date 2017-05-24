var loader = new createjs.LoadQueue();

loader.on("progress",onProgress);

loader.loadManifest([
    { "id": "sohu", "src": "../img/sohu.png" },
    { "id": "sprite", "src": "../img/sprite.png" },
    {"id":"smg","src":"http://news.sohu.com/upload/yursile/dushue/img/shop11.png"},
    { id: "grant",src: "../img/spritesheet_grant.png"}
]);

function onProgress(e){
    var percent = parseInt(e.progress/e.total * 100) + '%';
    document.querySelector('.pace-progress').innerHTML=percent;

}
export default loader;