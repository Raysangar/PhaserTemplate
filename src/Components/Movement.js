class Movement extends Component
{
    constructor(entity, spriteIsFacingRight, horizontalOnly, walkAnimInfo, idleAnimInfo, jumpAnimInfo)
    {
        super(entity);
        this.horizontalOnly = horizontalOnly;
        this.currentVelocityY = 0;
        this.currentVelocityX = 0;
        this.isJumping = false;
        
        this.spriteIsFacingRight = spriteIsFacingRight;
        this.walkAnimInfo = walkAnimInfo;
        this.idleAnimInfo = idleAnimInfo;
        this.jumpAnimInfo = jumpAnimInfo;
    }

    start()
    {
        this.sprite = this.getEntity().getComponent('SpriteRender');
        this.tryCreateAnimation(this.walkAnimInfo);
        this.tryCreateAnimation(this.idleAnimInfo);
        this.tryCreateAnimation(this.jumpAnimInfo);
    }

    setMovement(velocityX, velocityY)
    {
        this.currentVelocityX = velocityX;
        this.currentVelocityY = velocityY;
        if (velocityX != 0)
            this.sprite.setFlipX(this.spriteIsFacingRight ? velocityX < 0 : velocityX > 0);
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
        this.sprite.setVelocityX(this.currentVelocityX * delta);
        if (!this.horizontalOnly)
            this.sprite.setVelocityY(this.currentVelocityY * delta);

        if(this.isJumping && this.sprite.body.onFloor())
            this.isJumping = false;
        
        if(this.isJumping)
            this.tryPlayAnimation(this.jumpAnimInfo);
        else if(this.sprite.body.velocity.x != 0)
            this.tryPlayAnimation(this.walkAnimInfo);
        else
            this.tryPlayAnimation(this.idleAnimInfo);
    }

    tryCreateAnimation(animationInfo)
    {
        if (animationInfo != undefined)
            animationInfo.createFor(this.sprite, this.getEntity().getScene());
    }

    tryPlayAnimation(animationInfo)
    {
        if (animationInfo != undefined)
            animationInfo.playFor(this.sprite);
    }
}