

// Add event listener to document, game runs inside the listener
document.addEventListener('DOMContentLoaded', () => {

    // Grab the squares that make up the game board
    const squares = document.querySelectorAll('.grid div');

    // Grab the display for the player score
    const scoreDisplay = document.querySelector('span');

    // Grab the start button
    const startBtn = document.querySelector('.start');

    // The width of a row of divs
    const width = 10;

    // Track the index of the divs
    let currentIndex = 0;

    // Init location of the apple
    let appleIndex = 0;

    // Init location of the snake
    // Snake head has value of 2, snake tail has value of 0, the snake body has a value of 1
    let currentSnake = [2, 1, 0];

    // Init snake direction
    let direction = 1;

    // Track player score
    let score = 0;

    // Multiplier used to reduce the intervalTime, thus increasing the snake speed
    let speed = 0.9;

    // Tracks the snake speed
    let intervalTime = 0;

    // Controls the snake speed
    let interval = 0;


    // Function starts and restarts the game from default settings
    function startGame() {

        // Remove the current snake
        currentSnake.forEach(index => squares[index].classList.remove('snake'));

        // Remove the current apple
        squares[appleIndex].classList.remove('apple');

        // Reset interval
        clearInterval(interval);

        // Reset score & display
        score = 0
        scoreDisplay.innerText = `Apples: ${score}`;

        // Call apple spawning function
        randomApple();

        // Reset direction
        direction = 1;

        // Reset intervalTime
        intervalTime = 1000;

        // Reset snake
        currentSnake = [2, 1, 0];

        // Reset divs index
        currentIndex = 0;

        // Add class to current snake divs
        currentSnake.forEach(index => squares[index].classList.add('snake'));

        // Reset interval
        interval = setInterval(moveOutcomes, intervalTime);        
    }


    // Function handles the snake movement outcomes
    function moveOutcomes() {

        // Snake collision with borders and self
        if (
        (currentSnake[0] + width >= (width * width) && direction === width) ||  // Bottom
        (currentSnake[0] % width === width -1 && direction === 1) ||  // Right
        (currentSnake[0] % width === 0 && direction === -1) ||  // Left
        (currentSnake[0] - width < 0 && direction === -width) ||  // Top
        squares[currentSnake[0] + direction].classList.contains('snake')  // Self
        ){
            
            // Display final score text
            scoreDisplay.innerText = `Game Over! Total Apples: ${score}`;

            // Clear the interval - Stop the game
            return clearInterval(interval);
        }

        // Moving the snake by poping the tail and unshifting w/ direction
        const tail = currentSnake.pop();
        squares[tail].classList.remove('snake');
        currentSnake.unshift(currentSnake[0] + direction);

        // Snake collision with apple
        if (squares[currentSnake[0]].classList.contains('apple')) {

            // Remove the apple
            squares[currentSnake[0]].classList.remove('apple');

            // Add to the snake w/ push
            squares[tail].classList.add('snake');
            currentSnake.push(tail);

            // Call apple spawning function
            randomApple();

            // Increment player score & display
            score++;
            scoreDisplay.textContent = `Apples: ${score}`;

            // Increase the snake speed by multiplying the interval and speed
            clearInterval(interval);
            intervalTime = intervalTime * speed;
            interval = setInterval(moveOutcomes, intervalTime);
        }

        // Re-add class snake at end of function
        squares[currentSnake[0]].classList.add('snake');
    }


    // Function spawns apples
    function randomApple() {

        // Generate a new apple location while the current apple location is marked as snake
        do {
            appleIndex = Math.floor(Math.random() * squares.length);
        } while (squares[appleIndex].classList.contains('snake'));

        // Add the new apple
        squares[appleIndex].classList.add('apple');
    }


    // Function handles user directional input
    function control(e) {

        // Remove class from squares
        squares[currentIndex].classList.remove('snake');

        // Check for movement key input
        if (e.keyCode === 39) {

            // Pressing the right arrow
            direction = 1;

        } else if (e.keyCode === 38) {

            // Pressing the up arrow
            direction = -width;

        } else if (e.keyCode === 37) {

            // Pressing the left arrow
            direction = -1;

        } else if (e.keyCode === 40) {

            // Pressing the down arrow
            direction = +width;
        }
    }


    // Add event listener for key input
    document.addEventListener('keyup', control);

    // Add event listener for start button click
    startBtn.addEventListener('click', startGame);
})