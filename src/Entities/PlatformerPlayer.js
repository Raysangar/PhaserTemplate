class PlatformerPlayer extends Entity
{
    constructor(name,scene, layer)
    {
        super(name, scene);
        this.layer = layer;
        this.sprite = new SpriteRender(this,50,100,'player');
        this.addComponent(this.sprite);
        this.addComponent(new RigidBody(this,true));
        this.addComponent(new Health(this,2));
        this.addComponent(new DieOnFall(this, 800));
        let walkAnimInfo = new AnimationInfo('sprites_jugador', 'walk', 'walk-', 10, true, 1, 16);
        let idleAnimInfo = new AnimationInfo('sprites_jugador', 'idle', 'idle-', 10, true, 1, 4);
        let jumpAnimInfo = new AnimationInfo('sprites_jugador', 'jump', 'jump-', 5, true, 1, 4);
        this.addComponent(new Movement(this, true, true, walkAnimInfo, idleAnimInfo, jumpAnimInfo));
        this.addComponent(new PlatformerMovementController(this, 10, 15));
    }
    
    start()
    {
        super.start();
        this.getScene().physics.add.collider(this.sprite,this.layer);
        this.getScene().physics.add.collider(this.sprite, this.getScene().goalLayer, this.win, null, this);
        this.sprite.setBounce(0.2);
        this.sprite.setSize(20,50);
        this.sprite.setOffset(25, 15);
    }

    onHealthChanged(sender, health)
    {
        this.getScene().uiManager.sendMessage(this, "onHealthChanged", health);
    }

    destroy()
    {
        super.destroy();
        this.getScene().showGameOver();
    }

    win() {
        this.getScene().onPlayerWin();
    }
}