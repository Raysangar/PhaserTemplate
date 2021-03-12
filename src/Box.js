class Box extends Component
{
    constructor(entity,scene,group,layer,playerSprite)
    {
        super(entity);
        scene.physics.add.collider(group, layer);
        scene.physics.add.collider(group,playerSprite);
    }

    start() {}
    update(time,delta) {}
}