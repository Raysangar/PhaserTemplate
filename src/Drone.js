class Drone extends Component
{
    constructor(entity,player)
    {
        super(entity);
        this.player = player;
    }

    start()
    {
        this.sprite = this.getEntity().getComponent('SpriteRender');
        this.getEntity().getScene().physics.add.overlap(this.sprite, this.player.getComponent('SpriteRender'), this.spriteHit,null,this);
        this.getEntity().getScene().physics.add.collider(this.sprite,this.layer);
    }

    spriteHit () {
        this.getEntity().getScene().deleteEntity(this.getEntity());
        this.sprite.destroy();
        this.player.sendMessage(this.player,"damage",1,true);
        let particles = this.getEntity().getComponent("Particles");
        if(particles != undefined)
            particles.showParticles();
    }

    update(time,delta){}
}