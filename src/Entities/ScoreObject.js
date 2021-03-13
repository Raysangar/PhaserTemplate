class ScoreObject extends Entity
{
    constructor(name, scene, player, posX, posY, spriteKey, scoreToAdd)
    {
        super(name, scene);
        this.player = player;
        this.scoreToAdd = scoreToAdd;
        this.sprite = new SpriteRender(this, posX + 16, posY - 16, spriteKey);
        this.addComponent(this.sprite);
        this.addComponent(new RigidBody(this, false));
    }

    start()
    {
        super.start();
        this.getScene().physics.add.overlap(this.sprite, this.player, this.spriteHit,null,this);
    }

    spriteHit () 
    {
        this.getScene().deleteEntity(this);
        this.sprite.destroy();
        this.getScene().addPoints(this.scoreToAdd);
    }
}