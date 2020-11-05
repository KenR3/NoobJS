
import {detectCollision} from "/src/collisionDetection.js";

/*
    This class represents the bricks that will be destroyed by the ball in the game
*/

export default class Brick {

    constructor(game, position){

        // Store game object
        this.game = game;

        // Set size of the brick
        this.width = 60;
        this.height = 24;

        // Grab the brick image
        this.image = document.getElementById('img_brick');

        // Position object with passed postion
        this.position = position;

        // Track whether the brick is to be removed
        this.markedForDeletion = false;
    }

    // Method updates the bricks
    update() {

        // Collision with ball
        if(detectCollision(this.game.ball, this)){
            this.game.ball.speed.y = -this.game.ball.speed.y;
            this.markedForDeletion = true;
        }
    }

    // Method draws the bricks
    draw(ctx) {
        ctx.drawImage(this.image, this.position.x, this.position.y, this.width, this.height);
    }
}