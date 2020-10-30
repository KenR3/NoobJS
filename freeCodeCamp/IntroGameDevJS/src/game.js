
class Game {
     
    constructor(gameWidth, gameHeight) {

        // Store the canvas dimensions
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
    }

    // Method instantiates game objecs
    start() {

        // Instantiate Paddle, Ball
        this.paddle = new Paddle(this);
        this.ball = new Ball(this);

        // Array of game objects
        this.gameObjects = [
            this.paddle,
            this.ball
        ];

        // Instantiate handler
        new InputHandler(this.paddle);
    }       
        
    // Method updates all objects in array
    update(deltaTime) {

        this.gameObjects.forEach(object => object.update(deltaTime));
    }

    // Method draws all objects in array
    draw(ctx) {

        this.gameObjects.forEach(object => object.draw(ctx));
    }
}