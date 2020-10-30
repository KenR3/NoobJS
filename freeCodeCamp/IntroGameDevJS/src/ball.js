
/*
    This class represents the ball that bounces about the screen while playing the game.
*/

class Ball {
     
    constructor(game) {

        // Track canvas dimensions
        this.gameWidth = game.gameWidth;
        this.gameHeight = game.gameHeight;

        // Store game object
        this.game = game;

        // Set size of the ball image
        this.size = 16;

        // Grab the ball pixel art image
        this.image = document.getElementById('img_ball');

        // Position object with default postion
        this.position = {x: 10, y: 10};

        // Speed object holds ball trajectory
        this.speed = {x: 3, y: 2};
    }

    // Method draws the ball
    draw(ctx) {
        ctx.drawImage(this.image, this.position.x, this.position.y, this.size, this.size);
    }

    // Method updates the ball position
    // Method also tracks ball boundary collision
    update(deltaTime) {

        this.position.x += this.speed.x;
        this.position.y += this.speed.y;

        // Bounding horizontal and vertical
        if((this.position.x + this.size) > this.gameWidth || this.position.x < 0){
            this.speed.x = -this.speed.x;
        }
        if((this.position.y + this.size) > this.gameHeight || this.position.y < 0){
            this.speed.y = -this.speed.y;
        }
    }
}