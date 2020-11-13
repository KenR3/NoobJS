

// Grab all the divs in the grid
const square = document.querySelectorAll('.square');

// Grab any divs that have the mole class
const mole = document.querySelectorAll('.mole');

// Grab the game time tracking element
const timeLeft = document.querySelector('#time-left');

// Grab the game score tracking element
// Unsure why this variable uses let while the above uses const
let score = document.querySelector('#score');

// Track the player score
let result = 0;

// Track the game timer
let currentTime = timeLeft.textContent;


// This function places the mole at a random location in the grid
function randomSquare() {

    // Clear all squares by removing class name
    square.forEach(className => {
        className.classList.remove('mole');
    })

    // Set the random square the mole will appear in next
    let randomPosition = square[Math.floor(Math.random() * 9)]

    // Add the class to the square to make the mole appear
    randomPosition.classList.add('mole');

    // Store the id of the square the mole has appeared in
    hitPosition = randomPosition.id;
}


// Loop the squares and check for player hitting the mole
square.forEach(id => {
    
    // Add mouseUp listener to track clicks
    id.addEventListener('mouseup', () => {

        // If the square contains the mole, increment the score
        if (id.id === hitPosition) {
            result = result + 1;
            score.textContent = result;
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

    // Decrement the timer and display
    currentTime--;
    timeLeft.textContent = currentTime;

    // Check for out of time
    if (currentTime === 0) {
        clearInterval(timerId);
        alert('GAME OVER! Your final whack tally is: ' + result);
    }
}


// Count the timer down every second
let timerId = setInterval(countDown, 1000);