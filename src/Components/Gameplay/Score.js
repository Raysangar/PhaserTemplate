class Score extends Component
{
    constructor(entity)
    {
        super(entity);
        this.score = 0;
    }

    start(){}
    update(time,delta){}

    onPointsObtained(sender, points)
    {
        this.score += points;
        this.getEntity().getScene().uiManager.sendMessage(this, "onScoreChanged", this.score);
    }
}