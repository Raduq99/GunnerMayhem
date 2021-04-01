class Robot extends Phaser.Physics.Arcade.Sprite {
    constructor(game, x, y, playerType) {
        super(game, x, y, `${playerType}Idle`);
        this.setTexture(`${playerType}Idle`);

        
        this.game = game;
        this.playerType = playerType;
        this.lives = 3;

        game.add.existing(this);
        game.physics.add.existing(this);

        this.setBounce(0.0);
        this.setScale(2);

        this.setCollideWorldBounds(true);
        this.body.collideWorldBounds = true;
        this.body.onWorldBounds = true;


        const bulletKey = playerType == 'robot' ? 'bullet' : 'bulletReverse';
        this.bullets = game.physics.add.group({
            key: bulletKey,
            repeat: 50,
            allowGravity: false,
            setXY: {x: 20, y: 20},
            setScale: {x: 5, y: 5},
            visible: false,
            active: false
        });

        Phaser.Actions.Call(this.bullets.getChildren(), function (bullet) {
            bullet.setCollideWorldBounds(true);
            bullet.body.onWorldBounds = true;
        });
        

        this.body.world.on('worldbounds', (body, up) => {
            if(body.gameObject instanceof Robot && body == this.body)
            {
                console.log('da');
                body.gameObject.lives--;
                body.gameObject.setPosition(400, 200);
            }   
            else if(body.gameObject == undefined){
                console.log(body);
                body.gameObject.destroy();
            }
        }, this);


        this.canFire = game.time.addEvent({
            delay: 500
        });
        this.recovered = true;

        if(playerType == 'robot') {
            this.cursors = game.input.keyboard.addKeys({
                up: 'up',
                down: 'down',
                left: 'left',
                right: 'right',
                fireKey: 'BACKSPACE'
            });

        } else {
            this.cursors = game.input.keyboard.addKeys({
                up: 'W',
                down: 'S',
                left: 'A',
                right: 'D',
                fireKey: 'SPACE'
            });
        }
    }

    preUpdate(time, delta) {
		super.preUpdate(time, delta);
        this.move();
        if(this.cursors.fireKey.isDown) {
            this.fire();
        }
	}

    fire() {
        if(this.canFire.getElapsed() != 500) return;
        console.log('fire!!');
        var bullet = this.bullets.getFirstDead();
        bullet.setPosition(this.x + 40, this.y);
        bullet.setVisible(true).setActive(true);
        if(this.playerType == 'robot')
            bullet.setVelocityX(350);
        else bullet.setVelocityX(-350);
        this.canFire = this.game.time.addEvent({
            delay: 500
        });
        
    }

    move() {
        if(this.recovered == true || this.recovered.getElapsed() == 500)
        {
            if (this.cursors.left.isDown)
            {
                this.setVelocityX(-160);
                this.anims.play(`${this.playerType}Run`, true);
            }
            else if (this.cursors.right.isDown)
            {
                this.setVelocityX(160);
                this.anims.play(`${this.playerType}Run`, true);
            }
            else if(this.body.touching.down)
            {
                this.setVelocityX(0);
                this.anims.play(`${this.playerType}Idle`, true);
            }
        
            const didPressJump = Phaser.Input.Keyboard.JustDown(this.cursors.up);
            if (didPressJump)
            {
                if(this.body.touching.down) {
                    console.log('jump');
                    this.setVelocityY(-200);
                    this.anims.play(`${this.playerType}Jump`, true);
                    this.canDoubleJump = true;
                } else if(this.canDoubleJump) {
                    console.log('double jump');
                    this.setVelocityY(-200);
                    this.anims.play(`${this.playerType}Jump`, true);
                    this.canDoubleJump = false;
                }
            }
            if(!this.body.touching.down) {
                this.anims.play(`${this.playerType}Jump`);
            }
        }
        
        if(this.body.touching.left) {
            this.setVelocityY(-200);
            this.setVelocityX(200);
            this.recovered = this.game.time.addEvent({
                delay: 500
            }); 

        }
        else if(this.body.touching.right) {
            this.setVelocityY(-200);
            this.setVelocityX(-200);
            this.recovered = this.game.time.addEvent({
                delay: 500
            }); 
        }
    }
}

export default Robot;