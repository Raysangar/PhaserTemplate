class SideScrollMovement extends Component
{
    constructor(entity, spriteIsFacingRight, walkAnimInfo, idleAnimInfo, jumpAnimInfo)
    {
        super(entity);
        this.currentVelocity = 0;
        this.isJumping = false;
        
        this.spriteIsFacingRight = spriteIsFacingRight;
        this.walkAnimInfo = walkAnimInfo;
        this.idleAnimInfo = idleAnimInfo;
        this.jumpAnimInfo = jumpAnimInfo;
    }

    start()
    {
        this.sprite = this.getEntity().getComponent('SpriteRender');
        if (this.walkAnimInfo != null)
            this.walkAnimInfo.createFor(this.sprite, this.getEntity().getScene());
        if (this.idleAnimInfo != null)
            this.idleAnimInfo.createFor(this.sprite, this.getEntity().getScene());
        if (this.jumpAnimInfo)
            this.jumpAnimInfo.createFor(this.sprite, this.getEntity().getScene());
    }

    setMovement(velocity)
    {
        this.currentVelocity = velocity;
        if (velocity != 0)
            this.sprite.setFlipX(this.spriteIsFacingRight ? velocity < 0 : velocity > 0);
    }

    jump(jumpForce)
    {
        if (!this.isJumping)
        {
            this.sprite.setVelocityY(-jumpForce);
            this.isJumping = true;
        }
    }

    update(time, delta)
    {
        this.sprite.setVelocityX(this.currentVelocity);

        if(this.isJumping && this.sprite.body.onFloor())
            this.isJumping = false;
        
        if(this.isJumping)
        {
            if (this.jumpAnimInfo != null)
                this.jumpAnimInfo.playFor(this.sprite);
        }
        else if(this.sprite.body.velocity.x != 0)
        {
            if (this.walkAnimInfo != null)
                this.walkAnimInfo.playFor(this.sprite);
        }
        else
        {
            if (this.idleAnimInfo != null)
                this.idleAnimInfo.playFor(this.sprite);
        }
    }
}