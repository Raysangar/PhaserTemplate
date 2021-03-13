class Player extends Component
{
    constructor(entity,layer)
    {
        super(entity);
        this.layer = layer;
    }

    start()
    {
        this.sprite = this.getEntity().getComponent('SpriteRender');
        this.getEntity().getScene().physics.add.collider(this.sprite,this.layer);
        this.sprite.setBounce(0.2);
        this.sprite.setSize(20,65);
    }

    update(time,delta){}

    onHealthChanged(health)
    {
        this.getEntity().getScene().updateHearts(health);
    }

    destroyEntity()
    {
        this.sprite.destroy();
        this.getEntity().getScene().showGameOver();
    }
}