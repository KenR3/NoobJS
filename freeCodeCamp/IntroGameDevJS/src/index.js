

import Game from "/src/game.js";


// Grab the canvas HTML element
let canvas = document.getElementById("gameScreen");

// Grab the canvas graphics context
let ctx = canvas.getContext('2d');

// Constant values to hold the size of the canvas
const GAME_WIDTH = 600;
const GAME_HEIGHT = 400;

// Instantiate the game object
let game = new Game(GAME_WIDTH, GAME_HEIGHT);

// Track the time of the last frame
let lastTime = 0;


// GAME LOOP
function gameLoop(timestamp) {

    // Tracking the amount of time that has passed
    let deltaTime = timestamp - lastTime;
    lastTime = timestamp;

    // Clear canvas before drawing
    ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

    // Update and draw the game
    game.update(deltaTime);
    game.draw(ctx);

    // When the browser is ready, update
    requestAnimationFrame(gameLoop);
}

// Start the game
requestAnimationFrame(gameLoop);