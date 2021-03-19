class BillBoard extends Entity
{
    
    constructor(name, scene, isBad, posX, posY, sprite)
    {
        super(name, scene);
        this.isBad = isBad;
        this.sprite = new SpriteRender(this, posX, posY, sprite);
        this.addComponent(this.sprite);
        this.addComponent(new RigidBody(this,false));
        this.movement = new Movement(this, false, true);
        this.addComponent(this.movement);
        this.movement.setMovement(100, 0);
    }
}