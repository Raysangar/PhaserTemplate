class Particles extends Component
{
    constructor(entity)
    {
        super(entity);
        
    }

    start()
    {
        this.sprite = this.getEntity().getComponent('SpriteRender');
        this.scene = this.getEntity().getScene();
        this.emitter0 = this.scene.add.particles('spark0').createEmitter({
            x: this.sprite.x,
            y: this.sprite.y,
            speed: { min: -800, max: 800 },
            angle: { min: 0, max: 360 },
            scale: { start: 0.5, end: 0 },
            blendMode: 'SCREEN',
            //active: false,
            lifespan: 600,
            gravityY: 800,
            on:false
        });
    
        this.emitter1 = this.scene.add.particles('spark1').createEmitter({
            x: this.sprite.x,
            y: this.sprite.y,
            speed: { min: -800, max: 800 },
            angle: { min: 0, max: 360 },
            scale: { start: 0.3, end: 0 },
            blendMode: 'SCREEN',
            //active: false,
            lifespan: 300,
            gravityY: 800,
            on:false
        });
        //this.emitter0.stop();
        //this.emitter1.stop();
    }


    showParticles()
    {
        this.emitter0.setPosition(this.sprite.x, this.sprite.y);
        this.emitter1.setPosition(this.sprite.x, this.sprite.y);
        this.emitter0.explode(20);
        this.emitter1.explode(20);
    }

    update(time,delta)
    {

    }
}