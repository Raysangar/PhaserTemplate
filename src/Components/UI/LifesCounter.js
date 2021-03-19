class LifesCounter extends Component
{
    constructor(entity)
    {
        super(entity);

        this.hearts = [];
    }

    update(time,delta){}
    
    start(){}

    onHealthChanged(sender, lifes)
    {
        this.destroyHears();
        for(var i = 0; i < lifes; ++i)
        {
            var heart  = this.getEntity().getScene().add.image(windows.width - (33 * (i + 1)), 16, 'heart');
            heart.setScrollFactor(0,0);
            heart.fixedToCamera = true;
            this.hearts.push(heart);
        }
    }

    destroyHears()
    {
        for(var i = 0; i < this.hearts.length; ++i)
            this.hearts[i].destroy();
        this.hearts = [];
    }
}