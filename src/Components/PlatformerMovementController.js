class PlatformerMovementController extends Component
{
    constructor(entity, speed, jumpForce)
    {
        super(entity);
        this.cursor = this.getEntity().getScene().input.keyboard.createCursorKeys();
        this.speed = speed;
        this.jumpForce = jumpForce;
        this.isJumping = false;
    }

    start()
    {
        this.sprite = this.getEntity().getComponent('SpriteRender');
    }

    update(time, delta)
    {
        if(this.cursor.left.isDown)
        {
            this.sprite.setVelocityX(-this.speed);
            this.sprite.setFlipX(true); 
        }
        else if(this.cursor.right.isDown)
        {
            this.sprite.setVelocityX(this.speed);
            this.sprite.setFlipX(false); 
        }
        else
        {
            this.sprite.setVelocityX(0);
        }

        if(this.isJumping && this.sprite.body.onFloor())
        {
            this.isJumping = false;
        }
        
        if (this.cursor.space.isDown && this.sprite.body.onFloor()) {
            
            this.sprite.setVelocityY(-this.jumpForce * delta);
            this.isJumping = true;
        }
    }
}