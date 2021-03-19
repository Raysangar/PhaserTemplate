class Player extends Phaser.Physics.Arcade.Sprite
{
    constructor(scene,x,y,sprite,h)
    {
        super(scene,x,y,sprite);
        this.scene = scene;
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.healthMax = h;
        this.health = h;
   
        this.body.allowGravity = false;

        this.scene.input.on('pointermove', function (pointer) {
            this.x = pointer.x;
            this.y = pointer.y;
        }, this);

        this.enableOverlaping(false);

        this.scene.input.on('pointerdown', function (pointer) {
            if(this.enableOver)
            {
                this.shooting = true;
            }
    
        }, this);

        this.scene.input.on('pointerup', function (pointer) {
            if(this.enableOver)
            {
                this.shooting = false;
            }
    
        }, this);

    }


    damage()
    {
        this.health -= 1;
        this.scene.setHelth(this.health);
        console.log("damage "+this.health);
    }

    isDeath()
    {
        return  this.health <= 0;
    }

    resetHealth()
    {
        this.health = this.healthMax;
        this.scene.setHelth(this.health);
    }

    enableOverlaping(b)
    {
        this.enableOver = b;
    }


    checkOverlaping(b,my)
    {
        if(this.shooting)
        {
            if(!b.isBad())
            {
                this.scene.showMiss();
                this.damage();
                if(this.isDeath())
                    this.scene.setGameOver();
                else
                {
                    this.scene.reset();
                }
            }
            else
            {
                b.changeSprite('characters','damage01');
                this.scene.setDamage();
                this.scene.addPoints(100);
            }
            this.shooting = false;
        }
    }

    update(time,delta)
    {
        //this.game.input.mousePointer.x
    }
}