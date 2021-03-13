class Drone extends Entity
{
    
    constructor(name, scene, player, posX, posY, area = 0)
    {
        super(name, scene);
        this.player = player;
        this.sprite = new SpriteRender(this, posX + 16, posY - 16, 'droneIdle');
        this.addComponent(this.sprite);
        this.addComponent(new RigidBody(this,false));
        this.addComponent(new Movement(this, false, true));
        let droneWalkAnimInfo = new AnimationInfo('drone_sprite', 'left', 'drone-', 5, true, 1, 1);
        let droneRotateAnimInfo = new AnimationInfo('drone_sprite', 'rotate', 'drone-', 5, true, 2, 4);
        this.addComponent(new WandererBehaviour(this, 10, droneWalkAnimInfo, droneRotateAnimInfo, area))
        this.addComponent(new Particles(this));
    }

    start()
    {
        super.start();
        this.getScene().physics.add.overlap(this.sprite, this.player.getComponent('SpriteRender'), this.spriteHit,null,this);
        this.getScene().physics.add.collider(this.sprite,this.layer);
    }

    spriteHit () {
        this.getScene().deleteEntity(this);
        this.sprite.destroy();
        this.player.sendMessage(this.player,"damage",1,true);
        let particles = this.getComponent("Particles");
        if(particles != undefined)
            particles.showParticles();
    }
}