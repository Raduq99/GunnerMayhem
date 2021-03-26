class StartMenu extends Phaser.Scene {
    constructor() {
        super({
            key: "startMenu"
        });
    }

    preload() {
        this.load.image('start', '../../assets/startgame.png')
    }

    create() {
        const startBtn = this.add.sprite(this.game.config.width / 2, this.game.config.height / 2 + 100, 'start').setInteractive();
        startBtn.setScale(.5);
        startBtn.on('pointerdown', () => {
            this.scene.start('game');
        });
    }
}

export default StartMenu;