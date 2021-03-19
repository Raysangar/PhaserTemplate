class HogansAlley extends Scene
{
    constructor()
    {
        super('HogansAlley');
    }

    preload()
    {
        this.init();
        this.load.image('fondo','res/HogansAlley/Fondo01.png');
        this.load.image('pistola','res/HogansAlley/pistola.png');
        this.load.atlas('characters','res/HogansAlley/sprites_hogans_alley.png',
        'res/HogansAlley/sprites_hogans_alley_atlas.json');
    }

    create()
    {
        super.create();
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

        this.player = new Entity("Player", this);
        this.playerSprite = new SpriteRender(this.player, 512, 448, "pistola");
        this.playerFirstPersonShooter = new FirstPersonShooter(this.player);
        this.player.addComponent(new RigidBody(this.player, false));
        this.player.addComponent(this.playerSprite);
        this.player.addComponent(new Health(this.player, 2));
        this.player.addComponent(this.playerFirstPersonShooter);
        this.addEntity(this.player);

        this.state = "moving";
        this.createBillboards();

        this.start();
    }

    update (time, delta)
    {
        super.update(time, delta);
        switch(this.state)
        {
            case "moving":
                this.moving(time,delta);
                break;
            case "reveal":
                this.revealing(time,delta);
                break;
            case "shoot":
                this.shooting(time,delta);
                break;
            case "gameover":
                this.gameover(time,delta);
                break;
            case "damageView":
                this.damageView(time,delta);
                break;
        }
        this.lastTime = time;
    }

    createBillboards()
    {
        this.billboards = [];
        for(let i = 0; i < 3; i++)
        {
            let billboard = new Billboard("Billboard", this, -500 + i * 250, 414, "billboard01", "characters");
            this.billboards.push(billboard);
            this.addEntity(billboard);
        }
    }

    gameover(time, delta)
    {
        if(this.enter.isDown)
        {
            this.destroyBillboards();
            this.msgText.visible = false;
            this.gameOverTxt2.visible = false;
            this.createBillboards();
            this.state = "moving";
            this.player.resetHealth();
            this.score = 0;
            this.scoreTxt.text = this.score;
        }
    }

    destroyBillboards()
    {
        for(let i = 0; i < this.billboards.length; i++)
            this.deleteEntity(this.billboards[i]);
    }

    reset()
    {
        this.destroyBillboards();
        this.createBillboards();
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
        for(let i = 0; i < this.billboards.length; i++)
        {
            this.billboards[i].movement.setMovement(0, 0);
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

    moving(time, delta)
    {
        if((Phaser.Math.Difference(this.billboards[0].sprite.x,260)) < 10)
        {
            this.state = "reveal";
            this.revealTime = time;

            this.stopBillboards();
        }
    }

    revealing(time, delta)
    {
        if((Phaser.Math.Difference(this.revealTime,time)) > 200)
        {
            for(let i = 0; i < 3; i++)
            {
                let r = getRandomNumberBetween(0,this.billboardName.length-1);
                this.billboards[i].sprite.changeSprite('characters',this.billboardName[r]);
                this.billboards[i].setBad(this.billboardBad[r]);
            }

            for(let i = 0; i < this.billboards.length; i++)
            {
                this.billboards[i].sprite.setSize(150,250);
                this.physics.add.overlap(this.billboards[i].sprite, this.playerSprite, this.playerFirstPersonShooter.onShotHit,this.playerFirstPersonShooter.isShooting,this.playerFirstPersonShooter);
            }
            this.state = "shoot";
            this.playerFirstPersonShooter.enableOverlaping(true);
            this.shootTime = time;
        }
    }

    shooting(time, delta)
    {
        let timeRemain = Phaser.Math.Difference(this.shootTime,time);
        if(timeRemain > 2000)
        {
            if(this.thereIsBads())
            {
                this.player.sendMessage(null, "damage", 1);
                // if(this.player.isDeath())
                // {
                //     this.setGameOver();
                // }
                // else
                // {                
                //     this.showMiss();
                //     this.reset();
                // }
            }
            else
            {
                // this.setDamage();
                // this.addPoints(100);
            }
            this.reset();
        }
        else
        {
            this.timeToShootTxt.text = (timeRemain/100);
        }
    }

    thereIsBads()
    {
        for(let i = 0; i < this.billboards.length; ++i)
        {
            if(this.billboards[i].isBad())
                return true;
        }
        return false;
    }
}