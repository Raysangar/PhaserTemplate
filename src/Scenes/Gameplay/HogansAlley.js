class HogansAlley extends Scene
{
    constructor()
    {
        super('HogansHalley');
    }

    preload()
    {
        this.init();

        this.load.image('fondo','res/Fondo01.png');
        this.load.image('pistola','res/pistola.png');
        this.load.atlas('characters','res/sprites_hogans_alley/sprites_hogans_alley.png',
        'res/sprites_hogans_alley/sprites_hogans_alley_atlas.json');
    }

    create()
    {
        this.billboardName = ["bad01","bad02","bad03","good01","good02","good03"];
        this.billboardBad =  [true   ,true,   true,   false,   false,   false];

        this.billboardName = ["bad01","bad02","bad03","good01","good02","good03"];
        this.billboardBad =  [true   ,true,   true,   false,   false,   false];

        var bg_1 = this.add.image(512,448,'fondo');
        bg_1.fixedToCamera = true;


        this.timeToShootTxt  = this.add.text(450, 120, "0.0");
        this.timeToShootTxt.setFontSize(40);
        this.timeToShootTxt.setFill('#fff');
        this.timeToShootTxt.setScrollFactor(0);
        
        this.msgText  = this.add.text(250, 180, "GAME OVER");
        this.msgText.setFontSize(60);
        this.msgText.setFill('#fff');
        this.msgText.setScrollFactor(0);
        this.msgText.visible = false;

        this.gameOverTxt2  = this.add.text(210, 280, "Pulsa enter para reiniciar el nivel");
        this.gameOverTxt2.setFontSize(20);
        this.gameOverTxt2.setFill('#fff');
        this.gameOverTxt2.setScrollFactor(0);
        this.gameOverTxt2.visible = false;


        this.healthTxt  = this.add.text(550, 750, "0");
        this.healthTxt.setFontSize(50);
        this.healthTxt.setFill('#fff');
        this.healthTxt.setScrollFactor(0);
        this.healthTxt.visible = true;

        this.score = 0;
        this.scoreTxt  = this.add.text(200, 775, "0");
        this.scoreTxt.setFontSize(30);
        this.scoreTxt.setFill('#fff');
        this.scoreTxt.setScrollFactor(0);
        this.scoreTxt.visible = true;
        this.contadorRondas = 0;


        this.player = new Player(this,512,448,'pistola',2);
        this.state = "moving";
        this.createSpriteS();
        this.setHelth(this.player.health);
        this.player.enableOverlaping(false);
    }


    instantiateDrone(scene, item)
    {
        if (item.properties != undefined)
        {
            let attrName = item.properties[0]["name"];
            let attrValue = item.properties[0]["value"];
            return new Drone("Drone",scene, player, item.x, item.y, attrName == "Area" ? attrValue : 0);
        }
        return new Drone("Drone", scene, scene.player, item.x, item.y, 4);
    }

    gameover(time, delta)
    {
        if(this.enter.isDown)
        {
            this.destroyBillboards();
            this.msgText.visible = false;
            this.gameOverTxt2.visible = false;
            this.createSpriteS();
            this.state = "moving";
            this.player.resetHealth();
            this.score = 0;
            this.scoreTxt.text = this.score;
        }
    }

    destroyBillboards()
    {
        for(let i = 0; i < this.sprites.length; i++)
        {
            this.sprites[i].destroy();
        }
    }

    reset()
    {
        this.destroyBillboards();
        this.createSpriteS();
        this.state = "moving";
        
    }

    showMiss()
    {
        this.msgText.text = "Miss";
        this.msgText.visible = true;
        console.log("Show miss");
    }

    setGameOver()
    {
        this.msgText.text = "GAME OVER";
        this.msgText.visible = true;
        this.state = "gameover";
        this.gameOverTxt2.visible = true; 
        this.enter = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
        this.stopBillboards();
    }

    stopBillboards()
    {
        for(let i = 0; i < this.sprites.length; i++)
        {
            this.sprites[i].stop();
        }
    }

    setDamage()
    {
        this.state = "damageView";
        this.msgText.text = "You Win!";
        this.msgText.visible = true;
        this.damagetime = this.lastTime;
    }

    damageView(time,delta)
    {
        if((Phaser.Math.Difference(this.damagetime,time)) > 500)
        {
            this.contadorRondas += 1;
            if(this.contadorRondas == 3)
            {
                this.scene.start("Win");
            }
            this.reset();
        }
    }

}