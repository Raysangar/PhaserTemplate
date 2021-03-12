class GameOver extends Scene
{
    constructor()
    {
        super('GameOver');
    }

    preload ()
    {
        //this.load.setPath('assets/loader-tests/');
        //this.load.atlas('megaset', [ 'texture-packer-atlas-with-normals-0.png', 'texture-packer-atlas-with-normals-0_n.png' ], 'texture-packer-atlas-with-normals.json');
    }

    create ()
    {

        var gameOverTxt  = this.add.text(250, 180, "GAME OVER");
        gameOverTxt.setFontSize(60);
        gameOverTxt.setFill('#fff');
        gameOverTxt.setScrollFactor(0);

        var gameOverTxt  = this.add.text(210, 280, "Pulsa enter para reiniciar el nivel");
        gameOverTxt.setFontSize(20);
        gameOverTxt.setFill('#fff');
        gameOverTxt.setScrollFactor(0);

        this.enter = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
    }

    update(time,delta)
    {

        if(this.enter.isDown)
        {
            this.scene.start("MainScene");

        }
    }
}