

import Paddle from "/src/paddle.js";
import InputHandler from "/src/input.js"
import Ball from "/src/ball.js";
import Brick from "/src/brick.js";

import {buildLevel, level1, level2} from "/src/levels.js";

// Constants represent the different states
const GAMESTATE = {
    PAUSED: 0,
    RUNNING: 1,
    MENU: 2,
    GAMEOVER: 3,
    NEWLEVEL: 4,
}

/*
    This class represents the Game part of the application.
*/
export default class Game {
     
    constructor(gameWidth, gameHeight) {

        // Store the canvas dimensions
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;

        // Initialize the game state
        this.gamestate = GAMESTATE.MENU;

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

        // Initialize level tracking (uses array index)
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
        This method checks for GAMEOVER, updates all game objects, removes bricks when hit, and checks for level completion.
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
            this.gamestate === GAMESTATE.GAMEOVER
        ) return;

        // Check for level completion
        if(this.bricks.length < 1){

            // Increment level array index
            this.currentLevel++;

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

        // Put the game objects & bricks in one array and draw
        [...this.gameObjects, ...this.bricks].forEach(object => object.draw(ctx));

        // Drawing the PAUSED state
        if(this.gamestate === GAMESTATE.PAUSED){

            // Add an opaque black shade to the screen
            ctx.rect(0, 0, this.gameWidth, this.gameHeight);
            ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
            ctx.fill();

            // Add text to screen
            ctx.font = "30px Arial";
            ctx.fillStyle = "white";
            ctx.textAlign = "center";
            ctx.fillText("Paused", this.gameWidth / 2, this.gameHeight / 2);
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
            ctx.font = "30px Arial";
            ctx.fillStyle = "white";
            ctx.textAlign = "center";
            ctx.fillText("GAME OVER", this.gameWidth / 2, this.gameHeight / 2);
        }
    }

    
    // Method toggles the pause game state
    togglePause() {

        if(this.gamestate === GAMESTATE.PAUSED){
            this.gamestate = GAMESTATE.RUNNING;
        } else {
            this.gamestate = GAMESTATE.PAUSED;
        }
    }
}