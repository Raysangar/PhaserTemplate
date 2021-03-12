class Health extends Component
{
    constructor(entity, maxHealth)
    {
        super(entity);
        this.health = maxHealth;
    }

    start()
    {
        this.getEntity().sendMessage(this.getEntity(),"onHealthChanged",this.health,false);
    }

    damage(sender, amount)
    {
        this.health -= amount;
        if(this.health <= 0)
        {
            this.getEntity().getScene().deleteEntity(this.getEntity());
            this.health = 0;
        }
        this.getEntity().sendMessage(this.getEntity(),"onHealthChanged",this.health,false);
    }

    update(time, delta){}
}