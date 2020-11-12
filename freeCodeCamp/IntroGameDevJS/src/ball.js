
import {detectCollision} from "/src/collisionDetection.js";

/*
    This class represents the ball that bounces about the screen while playing the game.
    This class handles the collisions between the ball and the boundaries, and the ball and the paddle, but it does not handle the collisions between the ball and the bricks, which seems an odd implementation to me.
*/

export default class Ball {
     
    constructor(game) {

        // Grab the ball pixel art image
        this.image = document.getElementById('img_ball');

        // Track canvas dimensions
        this.gameWidth = game.gameWidth;
        this.gameHeight = game.gameHeight;

        // Store game object
        this.game = game;

        // Set size of the ball image
        this.size = 16;

        // Set the ball for the first time
        this.reset();
    }


    // Method resets the ball to starting point
    reset() {

        // Position object with ball default postion
        this.position = {x: 10, y: 300};

        // Speed object with ball trajectory
        this.speed = {x: 4, y: -2};
    }


    // Method draws the ball
    draw(ctx) {
        ctx.drawImage(this.image, this.position.x, this.position.y, this.size, this.size);
    }


    /*
        This method updates the position of the ball, checks for collisions, and decrements player lives when the ball hits the bottom of the game screen
    */
    update(deltaTime) {

        // Add velocity to ball
        this.position.x += this.speed.x;
        this.position.y += this.speed.y;

        // Bouncing off the sides
        if((this.position.x + this.size) > this.gameWidth || this.position.x < 0){
            this.speed.x = -this.speed.x;
        }

        // Bouncing off the top
        if(this.position.y < 50){
            this.speed.y = -this.speed.y;
        }

        // Ball hits bottom: loss of life and ball reset
        if((this.position.y + this.size) > this.gameHeight){
            this.game.lives--;
            this.reset();
        }

        // Collision with paddle
        if(detectCollision(this, this.game.paddle)) {
            this.speed.y = -this.speed.y;
            this.position.y = this.game.paddle.position.y - this.size;
        }
    }
}