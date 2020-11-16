

document.addEventListener('DOMContentLoaded', () => {

    // Grab the sqaures of the game board
    const squares = document.querySelectorAll('.grid div');

    // Grab the display span for the game result
    const resultDisplay = document.querySelector('#result');

    // Track width of game board in squares
    let width = 15;

    // Init shooter location
    let currentShooterIndex = 202;

    // Init invader location
    let currentInvaderIndex = 0;

    // Array for tracking invaders that have been shot down
    let alienInvadersTakenDown = [];

    // Track the player score
    let result = 0;

    // Track invader movement direction
    let direction = 1;

    // Track invader movement interval
    let invaderId;

    // Array holds the invaders
    const alienInvaders = [
        0, 1, 2, 3, 4, 5, 6, 7, 8, 9,
        15, 16, 17, 18, 19, 20, 21, 22, 23, 24,
        30, 31, 32, 33, 34, 35, 36, 37, 38, 39
    ]

    // Add invader class, which uses the CSS to draw the invaders
    alienInvaders.forEach(invader => squares[currentInvaderIndex + invader].classList.add('invader'));

    // Add shooter class, which uses the CSS to draw the shooter (player)
    squares[currentShooterIndex].classList.add('shooter');


    // Function handles player input for shooter movement
    function moveShooter(e) {

        // Remove shooter class
        squares[currentShooterIndex].classList.remove('shooter');

        // Check keyCode for directional input
        switch (e.keyCode) {

            // Left arrow pressed
            case 37:

                // Check boundary collision
                if (currentShooterIndex % width !== 0) currentShooterIndex -= 1;
                break;

            // Right arrow pressed
            case 39:

                // Check boundary collision
                if (currentShooterIndex % width < width - 1) currentShooterIndex += 1;
                break;

            default:
                break;
        }

        // Add shooter class to new location
        squares[currentShooterIndex].classList.add('shooter');
    }


    // Add the event listener for user shooter movement input
    document.addEventListener('keydown', moveShooter);


    // Function moves the alien invaders and checks for game over
    function moveInvaders() {

        // Store the collisions of the invaders as boolean values
        const leftEdge = alienInvaders[0] % width === 0;
        const rightEdge = alienInvaders[alienInvaders.length - 1] % width === width - 1;

        // If the invaders have reached either edge boundary, move them down a row
        if((leftEdge && direction === -1) || (rightEdge && direction === 1)) {
            direction = width;
        }
        else if(direction === width) {
            if (leftEdge) direction = 1;
            else direction = -1;
        }

        // Remove the invader class, move the array, add the invader class back
        for(let i = 0; i <= alienInvaders.length - 1; i++) {
            squares[alienInvaders[i]].classList.remove('invader');
        }
        for(let j = 0; j <= alienInvaders.length - 1; j++) {
            alienInvaders[j] += direction;
        }
        for(let k = 0; k <= alienInvaders.length - 1; k++) {

            // Check for taken down conditions
            if(!alienInvadersTakenDown.includes(k)) {
                squares[alienInvaders[k]].classList.add('invader');
            }
        }

        // Check for game over conditions where invader collides with shooter
        if(squares[currentShooterIndex].classList.contains('invader', 'shooter')) {

            // Display Game Over text
            resultDisplay.textContent = 'Game Over';

            // Add boom class to shooter
            squares[currentShooterIndex].classList.add('boom');

            // Clear the interval, end the game
            clearInterval(invaderId);
        }

        // Check for game over conditions where invader reaches bottom of game area
        for(let l = 0; l <= alienInvaders.length - 1; l++) {
            if(alienInvaders[l] > (squares.length - (width - 1))) {

                // Display Game Over text
                resultDisplay.textContent = 'Game Over';

                // Clear the interval, end the game
                clearInterval(invaderId);
            }
        }

        // Check for win conditions
        if(alienInvadersTakenDown.length === alienInvaders.length) {
            
            // Display win text
            resultDisplay.textContent = 'You Win!';

            // Remove the invaders
            clearInterval(invaderId);
        }
    }


    // Call the invader movement function every half a second
    invaderId = setInterval(moveInvaders, 500);


    // Function handles player attack input and shooting at the invaders
    function shoot(e) {

        // Track laser movement interval
        let laserId;

        // Init laser location
        let currentLaserIndex = currentShooterIndex;


        // Function moves the laser shot up the screen, and checks for laser collisions
        function moveLaser() {

            // Remove the laser class, adjust location, add laser class back
            squares[currentLaserIndex].classList.remove('laser');
            currentLaserIndex -= width;
            squares[currentLaserIndex].classList.add('laser');

            // Check for laser collision with invader
            if(squares[currentLaserIndex].classList.contains('invader')) {

                // Remove laser, invader classes
                squares[currentLaserIndex].classList.remove('laser');
                squares[currentLaserIndex].classList.remove('invader');

                // Show boom CSS for a short period
                squares[currentLaserIndex].classList.add('boom');
                setTimeout(() => squares[currentLaserIndex].classList.remove('boom'), 250);

                // Remove the laser time interval
                clearInterval(laserId);

                // Grab the alien that was taken down by the laser
                const alienTakenDown = alienInvaders.indexOf(currentLaserIndex);

                // Add the taken down alien to the array
                alienInvadersTakenDown.push(alienTakenDown);

                // Increase player score & display
                result++;
                resultDisplay.textContent = result;
            }

            // Check for laser collision with top of game screen
            if(currentLaserIndex < width) {

                // Remove the laser after a bit of time
                clearInterval(laserId);
                setTimeout(() => squares[currentLaserIndex].classList.remove('laser'), 100);
            }
        }


        // // Add the event listener for laser movement
        // document.addEventListener('keyup', e => {
        //     if(e.key === " ") {
        //         laserId = setInterval(moveLaser, 100);
        //     }
        // })


        // Control laser movement
        switch(e.keyCode) {
            case 32:
                laserId = setInterval(moveLaser, 100);
                break;
            default:
                break;
        }
    }


    // Add event listener for shooting
    document.addEventListener('keyup', shoot);
})