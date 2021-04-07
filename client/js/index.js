import StartMenu from './scenes/StartMenu.js';
import Game from './scenes/Game.js';
import GameOver from './scenes/GameOver.js';

var game = new Phaser.Game({
    width: 1200, 
    height: 600,
    type: Phaser.AUTO,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: true
        }
    },
    scene: [StartMenu, Game, GameOver]
});

export default game;