
/*
    This file performs the basic configuration of the game.
    This file contains the Game Loop.
    The Game Loop is used as a callback function by the requestAnimationFrame method.
    The Game Loop uses the functionality of the 'Game' class.
*/


// Imports
import Game from "/src/game.js";


// Get the graphics context for drawing to the canvas
const canvas = document.getElementById("gameScreen");
const ctx = canvas.getContext('2d');

// Store the size of the canvas
const GAME_WIDTH = 600;
const GAME_HEIGHT = 450;

// Track the time of frames
let lastTime = 0;
let deltaTime = 0;

// Instantiate the game object
const game = new Game(GAME_WIDTH, GAME_HEIGHT);


/*
    This function runs the game; it is called many times per second by the requestAnimationFrame method.
    The 'timestamp' parameter that is passed to this function is provided by the requestAnimationFrame method.
*/
function gameLoop(timestamp) {

    // Tracking the amount of time that has passed
    deltaTime = timestamp - lastTime;
    lastTime = timestamp;

    // Clear canvas, update, and draw
    ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
    game.update(deltaTime);
    game.draw(ctx);

    // Show latest updates per browser refresh rate
    requestAnimationFrame(gameLoop);
}


// Start the Game Loop
requestAnimationFrame(gameLoop);