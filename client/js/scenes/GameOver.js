class GameOver extends Phaser.Scene {
    constructor() {
        super({
            key: "gameOver"
        });
    }
    
    create(data) {
        this.add.text(this.game.config.width / 2 - 300, this.game.config.height / 2 - 50, `GAME OVER\n${data.winner} won`, {fontSize: '100px'});
    }
}

export default GameOver;