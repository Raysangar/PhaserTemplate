class Player extends Component
{
    constructor(entity,layer)
    {
        super(entity);
        //continuación
        this.cursor = this.getEntity().getScene().input.keyboard.createCursorKeys();
        
        this.jump = false;
        this.layer = layer;
    }

    start()
    {
        
        this.sprite = this.getEntity().getComponent('SpriteRender');
        this.Xposition = this.sprite.x;
        this.Yposition = this.sprite.y;
        this.getEntity().getScene().physics.add.collider(this.sprite,this.layer);
        this.sprite.anims.create({
            key: 'walk',
            frames: this.getEntity().getScene().anims.generateFrameNames('sprites_jugador', { start: 1, end: 18, prefix: 'walk-' }),
            frameRate: 10,
            repeat: -1
        });
        this.sprite.anims.create({
            key: 'idle',
            frames: this.getEntity().getScene().anims.generateFrameNames('sprites_jugador', { start: 1, end: 4, prefix: 'idle-' }),
            frameRate: 10,
            repeat: -1
        });

        this.sprite.anims.create({
            key: 'jump',
            frames: this.getEntity().getScene().anims.generateFrameNames('sprites_jugador', { start: 1, end: 4, prefix: 'jump-' }),
            frameRate: 5,
            repeat: -1
        });
        //Mejoras
        this.sprite.setBounce(0.2);
        this.sprite.setSize(20,65);
    }

    update(time,delta)
    {
        if(this.cursor.left.isDown)
        {
            this.sprite.setVelocityX(-100);
            
            this.sprite.setFlipX(true); 
        }
        else if(this.cursor.right.isDown)
        {
            this.sprite.setVelocityX(100);
            this.sprite.setFlipX(false); 
        }
        else
        {
            //Parado
            this.sprite.setVelocityX(0);
        }

        if(this.jump && this.sprite.body.onFloor())
        {
            this.jump = false;
        }
        
        if (this.cursor.space.isDown && this.sprite.body.onFloor()) {
            
            this.sprite.setVelocityY(-10*delta);
            this.jump = true;
        }


        if(this.jump)
            this.sprite.play('jump', true);
        else if(this.sprite.body.velocity.x != 0)
            this.sprite.play('walk', true);
        else
            this.sprite.play('idle', true);
    }

    onHealthChanged(health)
    {
        this.getEntity().getScene().updateHearts(health);
    }

    destroyEntity()
    {
        this.sprite.destroy();
        this.getEntity().getScene().showGameOver();
    }

    sendMessage(s)
    {
        console.log("Mensaje recibido "+s);
    }
}