class GameOver extends Scene
{
    constructor()
    {
        super('GameOver');
    }

    preload (){}

    create ()
    {
        var gameOverTxt  = this.add.text(250, 180, "GAME OVER");
        gameOverTxt.setFontSize(60);
        gameOverTxt.setFill('#fff');
        gameOverTxt.setScrollFactor(0);

        var gameOverTxt  = this.add.text(210, 280, "Press ENTER to restart the level");
        gameOverTxt.setFontSize(20);
        gameOverTxt.setFill('#fff');
        gameOverTxt.setScrollFactor(0);

        this.enter = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
    }

    update(time,delta)
    {
        if(this.enter.isDown)
            this.scene.start("MainScene");
    }
}