class Drone extends Component
{
    constructor(entity,player,area=0)
    {
        super(entity);
        this.player = player;
        this.area = area*32;     
        
        this.walkAnimInfo = new AnimationInfo('drone_sprite', 'left', 'drone-', 5, true, 1, 1);
        this.rotateAnimInfo = new AnimationInfo('drone_sprite', 'rotate', 'drone-', 5, true, 2, 4);
    }

    start()
    {
        this.movementComponent = this.getEntity().getComponent('SideScrollMovement');

        this.sprite = this.getEntity().getComponent('SpriteRender');
        this.getEntity().getScene().physics.add.overlap(this.sprite, this.player.getComponent('SpriteRender'), this.spriteHit,null,this);
        this.getEntity().getScene().physics.add.collider(this.sprite,this.layer);

        this.walkAnimInfo.createFor(this.sprite, this.getEntity().getScene());
        this.rotateAnimInfo.createFor(this.sprite, this.getEntity().getScene());

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
            particles.showParticles();
    }

    update(time,delta)
    {
        switch(this.state)
        {
            case "left":
                this.processMovingState(time,delta, -100, "right");
                break;
            case "right":
                this.processMovingState(time,delta, 100, "left");
                break;
        }
       
    }

    processMovingState(time, delta, speed, nextState)
    {
        this.movementComponent.setMovement(speed);
        
        let distance =  Math.abs(this.nextPositionX - this.sprite.x);
        if(distance < 4)
        {
            this.rotateAnimInfo.playFor(this.sprite);
            this.state = nextState;
            this.nextPositionX = this.nextPositionX + this.area * (speed < 0 ? 2 : -2);
            this.time = time;
        }
        else if ((time - this.time ) > 60)
        {
            this.walkAnimInfo.playFor(this.sprite);
        }
    }
}