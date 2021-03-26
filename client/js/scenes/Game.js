class Game extends Phaser.Scene {
    constructor() {
        super({
            key: "game"
        });
    }

    preload() {
        this.load.spritesheet('robot', '../../assets/BlueGunner/Gunner_Blue_Idle.png', {frameWidth: 48, frameHeight: 48});
        this.load.image('background', '../../assets/background.png');
    }

    create() {
        this.add.image(300, 300, 'background');
        const robot = this.physics.add.sprite(300, 300, 'robot');
        robot.setBounce(0.2);
        robot.setCollideWorldBounds(true);
        robot.setScale(2);
    }

    update() {

    }
}

export default Game;