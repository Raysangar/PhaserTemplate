class WandererBehaviour extends Component
{
    constructor(entity, speed, walkAnimInfo = undefined, rotateAnimInfo = undefined, area=0, horizontalMovement = true)
    {
        super(entity);
        this.area = area * 32;     
        this.horizontalMovement = horizontalMovement;
        this.speed = speed;

        this.walkAnimInfo = walkAnimInfo;
        this.rotateAnimInfo = rotateAnimInfo;
        
        this.GOING_STATE = "going";
        this.RETURNING_STATE = "returning";
    }

    start()
    {
        this.movementComponent = this.getEntity().getComponent('Movement');

        this.sprite = this.getEntity().getComponent('SpriteRender');

        this.walkAnimInfo.createFor(this.sprite, this.getEntity().getScene());
        this.rotateAnimInfo.createFor(this.sprite, this.getEntity().getScene());

        if(this.area > 0)
        {
            this.nextPosition = this.getSpritePosition() - this.area;
            this.state = this.GOING_STATE;
        }
    }

    update(time,delta)
    {
        switch(this.state)
        {
            case this.GOING_STATE:
                this.processMovingState(time,delta, -this.speed, this.RETURNING_STATE);
                break;
            case this.RETURNING_STATE:
                this.processMovingState(time,delta, this.speed, this.GOING_STATE);
                break;
        }
       
    }

    processMovingState(time, delta, speed, nextState)
    {
        this.movementComponent.setMovement(this.horizontalMovement ? speed : 0, this.horizontalMovement ? 0 : speed);
        
        let distance =  Math.abs(this.nextPosition - this.getSpritePosition());
        if(distance < 4)
        {
            this.rotateAnimInfo.playFor(this.sprite);
            this.state = nextState;
            this.nextPosition = this.nextPosition + this.area * (speed < 0 ? 2 : -2);
            this.time = time;
        }
        else if ((time - this.time ) > 60)
        {
            this.walkAnimInfo.playFor(this.sprite);
        }
    }

    getSpritePosition()
    {
        return this.horizontalMovement ? this.sprite.x : this.sprite.y;
    }
}