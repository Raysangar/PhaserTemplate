class Seta extends Component
{
    constructor(entity,player)
    {
        super(entity);
        this.player = player;
    }

    start()
    {
        this.sprite = this.getEntity().getComponent('SpriteRender');
        this.getEntity().getScene().physics.add.overlap(this.sprite, this.player, this.spriteHit,null,this);
    }

    spriteHit () {

        this.getEntity().getScene().deleteEntity(this.getEntity());
        this.sprite.destroy();
        this.getEntity().getScene().addPoints(10);
    }

    update(time, delta) {}
}