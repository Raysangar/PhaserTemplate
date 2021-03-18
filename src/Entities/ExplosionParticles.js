class ExplosionParticles extends Entity
{
    constructor(name, scene, posX, posY)
    {
        super(name, scene);
        this.posX = posX;
        this.posY = posY;
    }

    start()
    {
        super.start();
        this.emitter0 = this.scene.add.particles('spark0').createEmitter({
            x: this.posX,
            y: this.posY,
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
            x: this.posX,
            y: this.posY,
            speed: { min: -800, max: 800 },
            angle: { min: 0, max: 360 },
            scale: { start: 0.3, end: 0 },
            blendMode: 'SCREEN',
            //active: false,
            lifespan: 300,
            gravityY: 800,
            on:false
        });

        this.showParticles();
    }


    showParticles()
    {
        this.emitter0.setPosition(this.posX, this.posY);
        this.emitter1.setPosition(this.posX, this.posY);
        this.emitter0.explode(20);
        this.emitter1.explode(20);
    }
}