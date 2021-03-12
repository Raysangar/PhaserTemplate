class DieOnFall extends Component
{
    constructor(entity, deathHeight)
    {
        super(entity);
        this.deathHeight = deathHeight;
    }

    start()
    {
        this.sprite = this.getEntity().getComponent('SpriteRender');
        this.initialPositionX = this.sprite.x;
        this.initialPositionY = this.sprite.y;
    }

    update(time,delta)
    {
        if(this.sprite.y > this.deathHeight)
        {
            this.getEntity().sendMessage(this.getEntity(),"damage",1,true);
            this.sprite.x = this.initialPositionX;
            this.sprite.y = this.initialPositionY;
        }
    }
}