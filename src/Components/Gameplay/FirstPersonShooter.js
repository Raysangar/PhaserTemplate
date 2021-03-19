class FirstPersonShooter extends Component
{
    constructor(entity)
    {
        super(entity);
        this.shooting = false;
    }

    start()
    {
        this.sprite = this.getEntity().getComponent("SpriteRender");
        this.enableOverlaping(false);
        this.getEntity().getScene().input.on('pointermove', this.onPointerMove, this);
        this.getEntity().getScene().input.on('pointerdown', this.onPointerDown, this);
        this.getEntity().getScene().input.on('pointerup', this.onPointerUp, this);
    }
    
    update(time,delta){}

    isShooting()
    {
        return this.shooting;
    }
    
    onPointerUp(pointer)
    {
        this.shooting = false;
    }

    onPointerMove(pointer)
    {
        this.sprite.x = pointer.x;
        this.sprite.y = pointer.y;
    }

    onPointerDown(pointer)
    {
        if(this.enableOver)
            this.shooting = true;
    }

    enableOverlaping(overlapingEnabled)
    {
        this.enableOver = overlapingEnabled;
    }

    onShotHit(targetSprite)
    {
        console.log(this.shooting);
        targetSprite.getEntity().sendMessage(this.getEntity(), "onShot");
        this.shooting = false;
    }
}