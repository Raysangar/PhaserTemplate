class Billboard extends Entity
{
    
    constructor(name, scene, posX, posY, spriteSheet, sprite)
    {
        super(name, scene);
        this.bad = false;
        this.sprite = new SpriteRender(this, posX, posY, spriteSheet, sprite);
        this.addComponent(this.sprite);
        this.addComponent(new RigidBody(this,false));
        this.movement = new Movement(this, false, true);
        this.addComponent(this.movement);
    }
    
    start()
    {
        super.start();
        this.movement.setMovement(100, 0);
    }

    setBad(isBad)
    {
        this.bad = isBad;
    }

    isBad()
    {
        return this.bad;
    }

    onShot(sender)
    {
        if(this.isBad())
        {
            this.sprite.changeSprite('characters','damage01');
            this.getScene().setDamage();
            this.getScene().addPoints(100);
        }
        else
        {
            this.getScene().showMiss();
            sender.senMessage(this, "damage", 1);
            if(this.isDeath())
            {
                this.getScene().setGameOver();
            }
            else
            {
                this.getScene().reset();
            }
        }
    }    
}