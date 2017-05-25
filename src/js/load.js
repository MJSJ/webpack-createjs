var loader = new createjs.LoadQueue(false);
loader.installPlugin(createjs.Sound);
createjs.Sound.alternateExtensions = ["mp3"];
createjs.Sound.registerPlugins([ createjs.HTMLAudioPlugin]);//使用tags添加音乐，解决CORS
loader.on("progress",onProgress);

loader.loadManifest([
    { "id": "sohu", "src": "../img/sohu.png" },
    { "id": "sprite", "src": "../img/sprite.png" },
    {"id":"smg","src":"http://news.sohu.com/upload/yursile/dushue/img/shop11.png"},
    { "id": "grant","src": "../img/spritesheet_grant.png"},
    {"id":"river", "src":"http://dl.stream.qqmusic.qq.com/C400002JK2Tm09Vorr.m4a?vkey=2640F48A5F3E07D865B0F0D3C17AF691AC3872532F7657AB775BC4A57A776BE9F17372E806F070D45EC7DEBF0C48B53CAB273F37438525C0&guid=1901552283&uin=289181450&fromtag=66"},//load mp3
]);

function onProgress(e){
    var percent = parseInt(e.progress/e.total * 100) + '%';
    document.querySelector('.pace-progress').innerHTML=percent;

}
export default loader;