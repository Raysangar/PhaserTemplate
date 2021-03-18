class Boot extends Phaser.Scene {
    constructor() {
        super({
            key: 'Boot',
        });
        this.canPLay = false;
    }

    preload() {
        const progress = this.add.graphics();

        this.load.on('progress', (value) => {
            progress.clear();
            progress.fillStyle(0xffffff, 1);
            progress.fillRect(
                0,
                this.sys.game.config.height / 2,
                this.sys.game.config.width * value,
                60,
            );
        });

        this.load.on('complete', () => {
            progress.destroy();
            this.add.bitmapText(16 * 8 + 4, 8 * 16, 'font', 'PRESS X TO POWER ON', 8);
            this.canPLay = true;
        });

        this.input.on('pointerdown', () => {
            if (this.canPLay) {
                this.sound.add('bootMusic').play();
                setTimeout(() => {
                    this.scene.start('MainMenu');
                }, 1000);
            }
        });

        // LOAD

        this.load.audio('mainMenuMusic', 'res/audio/mainMenuMusic.mp3');
        this.load.audio('bootMusic', 'res/audio/bootSound.mp3');
        this.load.audio('playMusic', 'res/audio/play.mp3');
        this.load.audio('gameplayMusic', 'res/audio/gameplayMusic.mp3');
        this.load.audio('gameoverMusic', 'res/audio/gameover.mp3');
        this.load.audio('winMusic', 'res/audio/win.mp3');
        this.load.audio('jump', 'res/audio/jump.mp3');
        this.load.audio('powerup', 'res/audio/powerup.wav');
        this.load.audio('coin', 'res/audio/coin.wav');
        this.load.bitmapFont('font', 'res/fonts/font.png', 'res/fonts/font.fnt');
    }
}