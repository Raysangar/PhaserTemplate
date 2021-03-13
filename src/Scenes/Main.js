class MainScene extends Scene
{
    constructor()
    {
        super('MainScene');
    }

    preload()
    {
        this.init();
        this.load.image('tiles','res/Tileset.png');
        this.load.tilemapTiledJSON('map','res/Map.json');
        this.load.image('bg-1', 'res/sky.png');
        this.load.image('sea', 'res/sea.png');
        this.load.image('player', 'res/idle-1.png');
        this.load.image('droneIdle', 'res/drone-1.png');
        this.load.image('seta', 'res/Seta.png');
        this.load.image('box', 'res/box.png');
        this.load.image('spark0', 'res/blue.png');
        this.load.image('spark1', 'res/red.png');
        this.load.image('heart', 'res/heart/heart_pixel_art_32x32.png');

        this.load.atlas('sprites_jugador','res/player_anim/player_anim.png',
        'res/player_anim/player_anim_atlas.json');

        this.load.atlas('drone_sprite','res/drone/drone.png',
        'res/drone/drone_atlas.json');
    }

    create()
    {
        this.hearts = [];
        var bg_1 = this.add.tileSprite(0, 0, windows.width*2, windows.height*2, 'bg-1');
        bg_1.setScrollFactor(0,0);
        bg_1.fixedToCamera = true;
       
        var map = this.make.tilemap({ key: 'map' });
        var tiles = map.addTilesetImage('Plataformas', 'tiles');
        var layer = map.createLayer('Suelo', tiles, 0, 0);

        let player = new PlatformerPlayer('player',this, layer);
        this.addEntity(player);
        let playerSprite = player.getComponent("SpriteRender");

        
        var objectsArr = map.getObjectLayer('objetos')['objects'];
        for(var i = 0; i < objectsArr.length; i++)
        {
             var obj = objectsArr[i];
             if(obj.gid == 115)
             {
                let seta = new ScoreObject('Seta' + obj.id, this, player, obj.x, obj.y, 'seta', 10);
                this.addEntity(seta);
             }else if(obj.gid == 181)
             {
                let attrName = obj.properties[0]["name"];
                let attrValue = obj.properties[0]["value"];
                this.addEntity(new Drone("Drone",this, player, obj.x, obj.y, attrName == "Area" ? attrValue : 0));
             }
        }

        var group = this.physics.add.group({
            collideWorldBounds: true,
            immovable : true
        });
        
        layer.setCollisionByExclusion(-1,true);
        
        this.cameras.main.startFollow(playerSprite);
        this.cameras.main.setBounds(0,0,map.widthInPixels,map.heightInPixels);
        this.start();
        this.createUI();
    }

    createUI()
    {
        var scoreCounterIcon  = this.add.image(16, 16, 'seta');
        scoreCounterIcon.setScrollFactor(0,0);
        scoreCounterIcon.fixedToCamera = true;

        this.scoreLabel  = this.add.text(30, 0, " 0");
        this.scoreLabel.setFontSize(48);
        this.scoreLabel.setFill('#000');
        this.scoreLabel.setScrollFactor(0);
        this.score = 0;
    }

    addPoints(t)
    {
        this.score += t;
        this.scoreLabel.text = this.score;
    }

    showGameOver()
    {
        this.scene.start('GameOver');
    }

    updateHearts(lifes)
    {
        this.destroyHears();
        for(var i = 0; i < lifes; ++i)
        {
            var heart  = this.add.image(windows.width - (33 * (i + 1)), 16, 'heart');
            heart.setScrollFactor(0,0);
            heart.fixedToCamera = true;
            this.hearts.push(heart);
        }
    }

    destroyHears()
    {
        for(var i = 0; i < this.hearts.length; ++i)
        {
            this.hearts[i].destroy();
        }
        this.hearts = [];
    }

}