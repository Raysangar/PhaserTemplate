class Drone extends Component
{
    constructor(entity,player,area=0)
    {
        super(entity);
        this.player = player;
        this.area = area*32;
        this.initialDirection = -1;
        
    }

    start()
    {
        this.sprite = this.getEntity().getComponent('SpriteRender');
        this.getEntity().getScene().physics.add.overlap(this.sprite, this.player.getComponent('SpriteRender'), this.spriteHit,null,this);

        this.sprite = this.getEntity().getComponent('SpriteRender');
        this.getEntity().getScene().physics.add.collider(this.sprite,this.layer);
        this.sprite.anims.create({
            key: 'left',
            frames: this.getEntity().getScene().anims.generateFrameNames('drone_sprite', { start: 1, end: 1, prefix: 'drone-' }),
            frameRate: 5,
            repeat: -1
        });
        this.sprite.anims.create({
            key: 'rotate',
            frames: this.getEntity().getScene().anims.generateFrameNames('drone_sprite', { start: 2, end: 4, prefix: 'drone-' }),
            frameRate: 5,
            repeat: -1
        });

        this.sprite.setFlipX(false); 
        this.sprite.play('left', true);
        //this.sprite.play('left', true);
        //this.sprite.playReverse('rotate', true);
        if(this.area > 0)
        {
            this.nextPositionX = this.sprite.x-this.area;
            this.state = "left";
        }
    }

    spriteHit () {
        this.getEntity().getScene().deleteEntity(this.getEntity());
        this.sprite.destroy();
        this.player.sendMessage(this.player,"damage",1,true);
        let particles = this.getEntity().getComponent("Particles");
        if(particles != undefined)
        {
            particles.showParticles();
        }
    }

    update(time,delta)
    {
        switch(this.state)
        {
            case "left":
                this.movingLeft(time,delta);
                break;
            case "right":
                this.movingRight(time,delta);
                break;
        }
       
    }

    movingLeft(time,delta)
    {
        let distance =  Math.abs(this.nextPositionX - this.sprite.x);
        this.sprite.setVelocityX(-100);
        this.sprite.setFlipX(false);
        
        if(distance < 4)
        {
            this.sprite.play('rotate', true);
            this.state = "right";
            this.nextPositionX = this.nextPositionX+this.area*2;
            this.time = time;
        }
        else if ((time - this.time ) > 60)
            this.sprite.play('left', true);
    }

    movingRight(time,delta)
    {
        this.sprite.setFlipX(true);
        let distance = Math.abs(this.nextPositionX - this.sprite.x);
        this.sprite.setVelocityX(10*delta);
        
        if(distance < 4)
        {
            this.sprite.play('rotate', true);
            this.state = "left";
            this.nextPositionX = this.nextPositionX-this.area*2;
            this.time = time;
        }
        else if ((time - this.time ) > 60)
            this.sprite.play('left', true);
    }
}