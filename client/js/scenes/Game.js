import Robot from '../entity/Robot.js';

class Game extends Phaser.Scene {
    constructor() {
        super({
            key: "game"
        });
    }


    preload() {
        this.load.spritesheet('robotIdle', '../../assets/BlueGunner/Gunner_Blue_Idle.png', {frameWidth: 48, frameHeight: 38});
        this.load.spritesheet('robotRun', '../../assets/BlueGunner/Gunner_Blue_Run.png', {frameWidth: 48, frameHeight: 38});
        this.load.spritesheet('robotJump', '../../assets/BlueGunner/Gunner_Blue_Jump.png', {frameWidth: 48, frameHeight: 38});
        this.load.spritesheet('enemyIdle', '../../assets/RedGunner/Gunner_Red_Idle.png', {frameWidth: 48, frameHeight: 38});
        this.load.spritesheet('enemyRun', '../../assets/RedGunner/Gunner_Red_Run.png', {frameWidth: 48, frameHeight: 38});
        this.load.spritesheet('enemyJump', '../../assets/RedGunner/Gunner_Red_Jump.png', {frameWidth: 48, frameHeight: 38});
        this.load.image('bullet', '../../assets/Bullet.png');
        this.load.image('bulletReverse', '../../assets/BulletReverse.png');
        this.load.image('background', '../../assets/background.png');
        this.load.image('ground', '../../assets/Platform.png');
    }

    create() {
        this.add.image(300, 300, 'background');
        const platforms = this.physics.add.staticGroup();
        platforms.create(600, this.game.scale.height - 100, 'ground').setScale(25, 1.5).refreshBody();

        this.robot = new Robot(this, 400, 200, 'robot');
        this.enemy = new Robot(this, 800, 200, 'enemy');
        
        this.physics.add.collider(this.robot, platforms);
        this.physics.add.collider(this.enemy, platforms);

        this.anims.create({
            key: 'robotIdle',
            frames: this.anims.generateFrameNumbers('robotIdle', { start: 0, end: 4 }),
            frameRate: 10
        });
        
        this.anims.create({
            key: 'robotRun',
            frames: this.anims.generateFrameNumbers('robotRun', { start: 0, end: 5 }),
            frameRate: 10,
            repeat: -1
        });
        
        this.anims.create({
            key: 'robotJump',
            frames: this.anims.generateFrameNumbers('robotJump', { start: 0, end: 1 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'enemyIdle',
            frames: this.anims.generateFrameNumbers('enemyIdle', { start: 0, end: 4 }),
            frameRate: 10
        });
        
        this.anims.create({
            key: 'enemyRun',
            frames: this.anims.generateFrameNumbers('enemyRun', { start: 0, end: 5 }),
            frameRate: 10,
            repeat: -1
        });
        
        this.anims.create({
            key: 'enemyJump',
            frames: this.anims.generateFrameNumbers('enemyJump', { start: 0, end: 1 }),
            frameRate: 10,
            repeat: -1
        });

        this.physics.add.collider(this.robot.bullets, this.enemy, this.onHit, null, this);
        this.physics.add.collider(this.enemy.bullets, this.robot, this.onHit, null, this);

        this.blueLivesText = this.add.text(50, 50, `Blue lives: ${this.robot.lives}`);
        this.redLivesText = this.add.text(1000, 50, `Red lives: ${this.enemy.lives}`);
    }

    update() {
        this.blueLivesText.setText(`Blue lives: ${this.robot.lives}`);
        this.redLivesText.setText(`Red lives: ${this.enemy.lives}`);
        if(this.robot.lives == 0)
            this.game.scene.start('gameOver', {winner: 'Red'});
        else if(this.enemy.lives == 0)
            this.game.scene.start('gameOver', {winner: 'Blue'});
    }

    onHit(player, bullets) {
        console.log(player);
        bullets.destroy();
    }
}

export default Game;