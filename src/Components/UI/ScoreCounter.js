class ScoreCounter extends Component
{
    constructor(entity, iconSprite)
    {
        super(entity);

        this.scoreCounterIcon  = this.getEntity().scene.add.image(16, 16, iconSprite);
        this.scoreCounterIcon.setScrollFactor(0,0);
        this.scoreCounterIcon.fixedToCamera = true;
    
        this.scoreLabel  = this.getEntity().scene.add.text(30, 0, " 0");
        this.scoreLabel.setFontSize(48);
        this.scoreLabel.setFill('#000');
        this.scoreLabel.setScrollFactor(0);
    }

    update(time,delta){}
    
    start(){}

    onScoreChanged(sender, score)
    {
        this.scoreLabel.text = score;
    }
}