var windows = {width:1024,height: 896} //Platformer {width:800,height: 480}
var config = {
    type: Phaser.AUTO,
    width: windows.width,
    height: windows.height,
    parent: "canvas",
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    scene: [Boot, MainMenu, Platformer, HogansAlley, Pause],
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 }, //platformer 200
            debug:true
        }
    }
};

var game = new Phaser.Game(config);
var gameplaySceneKey = "HogansAlley";