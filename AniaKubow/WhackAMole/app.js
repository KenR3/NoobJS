

// Grab all the divs in the grid
const square = document.querySelectorAll('.square');

// Grab any divs that have the mole class
const mole = document.querySelectorAll('.mole');

// Grab the game heads up display element
const HUD = document.querySelector('#hud');

// Track the number of successful player whacks
let result = 0;

// Track the game timer
let currentTime = 10;

// Track Game Over status
let gameIsOver = false;


// This function places the mole at a random location in the grid
function randomSquare() {

    // Clear all squares by removing class name
    square.forEach(className => {
        className.classList.remove('mole');
        className.classList.remove('moleCry');
    })

    // Check for Game Over status
    if (gameIsOver) return;

    // Set the random square the mole will appear in next
    let randomPosition = square[Math.floor(Math.random() * 9)]

    // Add the class to the square to make the mole appear
    randomPosition.classList.add('mole');

    // Store the id of the square the mole has appeared in
    hitPosition = randomPosition.id;
}


// Loop the squares, add a listener, check for whacks
square.forEach(id => {
    
    // Add mouseUp listener to track clicks
    id.addEventListener('mouseup', () => {

        // Check for proper mole whacking conditions
        if (id.id === hitPosition &&
            !(id.classList.contains('moleCry')) &&
            !(gameIsOver)) {

            // Increment player score
            result = result + 1;

            // Alter mole image via class manipulation
            id.classList.remove('mole');
            id.classList.add('moleCry');
        }
    })
})


// Function moves the mole around per a timer
function moveMole() {

    // Configure the timer
    let timerId = null;
    timerId = setInterval(randomSquare, 1000);
}


// Call mole moving function
moveMole();


// Function handles the game timer
function countDown() {

    // Decrement the timer
    currentTime--;
    HUD.textContent = `Whacks: ${result} || Time: ${currentTime}`;

    // Check for out of time
    if (currentTime === 0) {
        clearInterval(timerId);
        alert('GAME OVER! Your final whack tally is: ' + result);
        
        // Mark game as over
        gameIsOver = true;
    }

}


// Count the timer down every second
let timerId = setInterval(countDown, 1000);