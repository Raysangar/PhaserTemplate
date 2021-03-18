class PlatformerScene extends Scene
{
    constructor()
    {
        super('Platformer');
    }

    preload()
    {
        this.init();

        this.load.image('tiles', 'res/Levels/Platformer/tileset.png');
        this.load.spritesheet('tilesSprites', 'res/Levels/Platformer/tileset.png', { frameWidth: 32, frameHeight: 32 });
        this.load.tilemapTiledJSON('map', 'res/Levels/Platformer/config.json');
        this.load.image('level1Background', 'res/Levels/Platformer/sky.png');
        this.load.atlas('coinSprites', 'res/Coin/spritesheet.png', 'res/Coin/config.json');
        this.load.atlas('shyGuySprites', 'res/ShyGuy/spritesheet.png', 'res/ShyGuy/config.json');

        this.load.image('player', 'res/idle-1.png');
        this.load.image('droneIdle', 'res/drone-1.png');
        this.load.image('seta', 'res/Seta.png');
        this.load.image('spark0', 'res/blue.png');
        this.load.image('spark1', 'res/red.png');
        this.load.image('heart', 'res/heart/heart_pixel_art_32x32.png');

        this.load.atlas('sprites_jugador','res/player_anim/player_anim.png',
        'res/player_anim/player_anim_atlas.json');

        this.load.atlas('drone_sprite','res/drone/drone.png',
        'res/drone/drone_atlas.json');

        this.music = this.sound.add('gameplayMusic', { loop: true });
        this.powerupSound = this.sound.add('powerup');
        this.coinSound = this.sound.add('coin');
    }

    create()
    {
        this.music.play();
        this.hearts = [];
        
        this.loadBackground();

        this.loadMap();

        this.player = new PlatformerPlayer('player',this, this.layer);
        this.addEntity(this.player);
        this.loadEntities("Coin", this.instantiateCoin);
        this.loadEntities("ShyGuy", this.instantiateDrone);
        
        this.initCamera();
        this.start();
        this.createUI();
    }

    loadBackground() {
        this.add
            .tileSprite(
                0,
                0,
                this.cameras.main.width * 2,
                this.cameras.main.height * 2,
                'level1Background',
            )
            .setScrollFactor(0);
    }

    loadMap() {
        this.map = this.make.tilemap({ key: 'map' });
        this.map.createLayer(
            'Background',
            this.map.addTilesetImage('Plataformas', 'tiles'),
            0,
            0,
        );
        this.layer = this.map
            .createLayer(
                'Floor',
                this.map.addTilesetImage('Plataformas', 'tiles'),
                0,
                0,
            );
        this.layer.setCollisionByExclusion(-1, true);

        this.goalLayer = this.map
            .createLayer(
                'Goal',
                this.map.addTilesetImage('Plataformas', 'tiles'),
                0,
                0,
            );
        this.goalLayer.setCollisionByExclusion(-1, true);
        this.goalLayer.setVisible(false);
    }

    instantiateCoin(scene, item)
    {
        return new ScoreObject('Seta' + item.id, scene, scene.player.sprite, item.x, item.y, 'seta', 10);
    }

    instantiateDrone(scene, item)
    {
        if (item.properties != undefined)
        {
            let attrName = item.properties[0]["name"];
            let attrValue = item.properties[0]["value"];
            return new Drone("Drone",scene, player, item.x, item.y, attrName == "Area" ? attrValue : 0);
        }
        return new Drone("Drone", scene, scene.player, item.x, item.y, 4);
    }

    initCamera() {
        this.cameras.main.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels - 1);
        this.cameras.main.startFollow(this.player.sprite, false, 1, 0, 0, -500);
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
        this.music.stop();
        this.scene.start('MainMenu', {gameover: true});
    }

    onPlayerWin() {
        this.music.stop();
        this.scene.start('MainMenu', { win: true });
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