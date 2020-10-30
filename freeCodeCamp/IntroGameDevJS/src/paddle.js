
/*
    This class represents the Paddle object the player can control to play the game.
*/

class Paddle {

    constructor(game) {

        // Store the width of the game
        this.gameWidth = game.gameWidth;

        // Set the size of the paddle
        this.width = 120;
        this.height = 15;

        // Set the velocity of the paddle
        this.maxSpeed = 7;
        this.speed = 0;
        
        // Create a position object with default location
        this.position = {
            x: game.gameWidth / 2 - this.width / 2,
            y: game.gameHeight - this.height - 10
        };
    }

    // Method adds paddle left velocity
    moveLeft() {
        this.speed = -this.maxSpeed;
    }

    // Method adds paddle right velocity
    moveRight() {
        this.speed = this.maxSpeed;
    }

    // Method zeros paddle velocity
    stop() {
        this.speed = 0;
    }

    // Method draws the paddle
    draw(ctx){
        ctx.fillStyle = '#05f';
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
        ctx.strokeStyle = '#000';
        ctx.strokeRect(this.position.x, this.position.y, this.width, this.height);
    }

    // This method updates the postion of the paddle
    // This method also tracks paddle vs boundary collision
    update(deltaTime) {

        // Add velocity to paddle
        this.position.x += this.speed;

        // Bounding left and right sides
        if(this.position.x < 0) {
            this.position.x = 0;
        } 
        if((this.position.x + this.width) > this.gameWidth) {
            this.position.x = this.gameWidth - this.width;
        }    
    }
}