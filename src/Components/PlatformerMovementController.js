class PlatformerMovementController extends Component
{
    constructor(entity, speed, jumpForce)
    {
        super(entity);
        this.cursor = this.getEntity().getScene().input.keyboard.createCursorKeys();
        this.speed = speed;
        this.jumpForce = jumpForce;
    }

    start() 
    {
        this.movementComponent = this.getEntity().getComponent('SideScrollMovement');
    }

    update(time, delta)
    {
        if(this.cursor.left.isDown)
            this.movementComponent.setMovement(-this.speed);
        else if(this.cursor.right.isDown)
            this.movementComponent.setMovement(this.speed);
        else
            this.movementComponent.setMovement(0);
        
        if (this.jumpForce > 0 && this.cursor.space.isDown) 
            this.movementComponent.jump(this.jumpForce * delta);
    }
}