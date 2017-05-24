import "../music/river.mp3"

export default class SoundTest{
    constructor(){
        if (!createjs.Sound.initializeDefaultPlugins()) {return;}
 
        var audioPath = "../music/";
        var sounds = [
            {id:"river", src:"river.mp3"},
        ];
    
        createjs.Sound.alternateExtensions = ["mp3"];
        createjs.Sound.addEventListener("fileload", this.handleLoad.bind(this));
        createjs.Sound.registerSounds(sounds, audioPath);
    }

    handleLoad(e){
        createjs.Sound.play(e.src);
    }
}