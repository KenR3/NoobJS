

// Imports
import Paddle from "/src/paddle.js";
import InputHandler from "/src/input.js"
import Ball from "/src/ball.js";
import {buildLevel, level1, level2} from "/src/levels.js";


// Constants to represent different game states
const GAMESTATE = {
    PAUSED: 0,
    RUNNING: 1,
    MENU: 2,
    GAMEOVER: 3,
    NEWLEVEL: 4,
    WINNER: 5,
}


/*
    This class represents the game logic part of the application.
    Composition is used to implement the various game objects.
*/
export default class Game {
     
    constructor(gameWidth, gameHeight) {

        // Store the canvas dimensions
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;

        // Initialize the game state
        this.gamestate = GAMESTATE.MENU;

        // Get the background image
        this.backgroundImage = document.getElementById('img_sky');

        // Instantiate Paddle, Ball
        this.paddle = new Paddle(this);
        this.ball = new Ball(this);

        // Instantiate objects array
        this.gameObjects = [];

        // Instantiate bricks array
        this.bricks = [];

        // Track player lives
        this.lives = 3;

        // Array of game levels
        this.levels = [level1, level2];

        // Initialize level tracking (the number is the array index)
        this.currentLevel = 0;

        // Instantiate handler
        new InputHandler(this.paddle, this);
    }


    // Method instantiates game objecs
    start() {

        // Check for game starting conditions
        if(
            this.gamestate !== GAMESTATE.MENU &&
            this.gamestate !== GAMESTATE.NEWLEVEL
        ) return;

        // Use the imported function to build the level
        this.bricks = buildLevel(this, this.levels[this.currentLevel]);

        // Reset the ball
        this.ball.reset();

        // Array of game objects
        this.gameObjects = [
            this.paddle, 
            this.ball
        ];

        // Run the game
        this.gamestate = GAMESTATE.RUNNING;
    }
    
    
    /*
        This method checks for other game states and draws them accordingly
    */
    drawOtherGameState(ctx){

        // Drawing the PAUSED state
        if(this.gamestate === GAMESTATE.PAUSED){

            // Add an opaque black shade to the screen
            ctx.rect(0, 0, this.gameWidth, this.gameHeight);
            ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
            ctx.fill();

            // Add text to screen
            ctx.font = "48px Arial";
            ctx.fillStyle = "white";
            ctx.textAlign = "center";
            ctx.fillText("Game Paused", this.gameWidth / 2, this.gameHeight / 2);
        }

        // Drawing the MENU state
        if(this.gamestate === GAMESTATE.MENU){

            // Fill screen with black
            ctx.rect(0, 0, this.gameWidth, this.gameHeight);
            ctx.fillStyle = "rgba(0, 0, 0, 1)";
            ctx.fill();

            // Add text to screen
            ctx.font = "30px Arial";
            ctx.fillStyle = "white";
            ctx.textAlign = "center";
            ctx.fillText("Press SPACEBAR To Start", this.gameWidth / 2, this.gameHeight / 2);
        }

        // Drawing the GAMEOVER state
        if(this.gamestate === GAMESTATE.GAMEOVER){

            // Fill the screen with black
            ctx.rect(0, 0, this.gameWidth, this.gameHeight);
            ctx.fillStyle = "rgba(0, 0, 0, 1)";
            ctx.fill();

            // Add text to screen
            ctx.font = "48px Arial";
            ctx.fillStyle = "white";
            ctx.textAlign = "center";
            ctx.fillText("GAME OVER", this.gameWidth / 2, this.gameHeight / 2);
        }

        // Drawing the WINNER state
        if(this.gamestate === GAMESTATE.WINNER){

            // Fill the screen with black
            ctx.rect(0, 0, this.gameWidth, this.gameHeight);
            ctx.fillStyle = "rgba(0, 0, 0, 1)";
            ctx.fill();

            // Add text to screen
            ctx.font = "48px Arial";
            ctx.fillStyle = "white";
            ctx.textAlign = "center";
            ctx.fillText("YOU WIN", this.gameWidth / 2, this.gameHeight / 2);
        }
    }
        

    /*
        This method checks for WINNER & GAMEOVER, updates all game objects, removes bricks when hit, and checks for level completion.
    */
    update(deltaTime) {

        // Check for GAMEOVER state conditions
        if(this.lives < 1){
            this.gamestate = GAMESTATE.GAMEOVER;
        }

        // Check for update skipping conditions
        if(
            this.gamestate === GAMESTATE.PAUSED ||
            this.gamestate === GAMESTATE.MENU ||
            this.gamestate === GAMESTATE.GAMEOVER ||
            this.gamestate === GAMESTATE.WINNER
        ) return;

        // Check for level completion
        if(this.bricks.length < 1){

            // Increment level array index
            this.currentLevel++;

            // Check for win
            if(this.currentLevel >= this.levels.length){
                this.gamestate = GAMESTATE.WINNER;
                return;
            }

            // Set the game state to NEWLEVEL
            this.gamestate = GAMESTATE.NEWLEVEL;

            // Start the new level
            this.start();
        }

        // Put game objects & bricks in one array and update
        [...this.gameObjects, ...this.bricks].forEach(object => object.update(deltaTime));

        // Remove marked bricks from the array
        this.bricks = this.bricks.filter(brick => !brick.markedForDeletion);
    }


    // Method draws game objects
    draw(ctx) {

        // Draw background image
        ctx.drawImage(this.backgroundImage, 0, 50, this.gameWidth, this.gameHeight - 50);

        // Put the game objects & bricks in one array and draw
        [...this.gameObjects, ...this.bricks].forEach(object => object.draw(ctx));

        // Draw UI
        ctx.rect(0, 0, this.gameWidth, 50);
        ctx.fillStyle = "black"
        ctx.font = "38px Arial";
        ctx.fillStyle = "black";
        ctx.fillText(`LEVEL: ${this.currentLevel + 1}`, 100, 38);
        ctx.fillText(`LIVES: ${this.lives}`, 500, 38);

        // Draw any other game states
        this.drawOtherGameState(ctx);
    }

    
    // Method toggles the pause game state
    togglePause() {

        if(this.gamestate === GAMESTATE.PAUSED){
            this.gamestate = GAMESTATE.RUNNING;
        } else if (
            this.gamestate !== GAMESTATE.MENU &&
            this.gamestate !== GAMESTATE.GAMEOVER &&
            this.gamestate !== GAMESTATE.WINNER
            ){
            this.gamestate = GAMESTATE.PAUSED;
        }
    }
}