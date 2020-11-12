
/*
    This file contains the game logic for the Memory Game.
*/

// This event is fired when the page is loaded w/o CSS etc.
// The following code basically says: "when the page is sufficiently loaded..."
document.addEventListener('DOMContentLoaded', () => {

    // Array of card objects with doubles of each different type
    const cardArray = [
        {
            name: 'fries',
            img: 'images/fries.png'
        },
        {
            name: 'fries',
            img: 'images/fries.png'
        },
        {
            name: 'cheeseburger',
            img: 'images/cheeseburger.png'
        },
        {
            name: 'cheeseburger',
            img: 'images/cheeseburger.png'
        },
        {
            name: 'hotdog',
            img: 'images/hotdog.png'
        },
        {
            name: 'hotdog',
            img: 'images/hotdog.png'
        },
        {
            name: 'ice-cream',
            img: 'images/ice-cream.png'
        },
        {
            name: 'ice-cream',
            img: 'images/ice-cream.png'
        },
        {
            name: 'milkshake',
            img: 'images/milkshake.png'
        },
        {
            name: 'milkshake',
            img: 'images/milkshake.png'
        },
        {
            name: 'pizza',
            img: 'images/pizza.png'
        },
        {
            name: 'pizza',
            img: 'images/pizza.png'
        },
    ]

    
    // Randomize the cardArray
    cardArray.sort(() => 0.5 - Math.random());
    
    // Grab the grid element from the DOM
    const grid = document.querySelector('.grid');

    // Grab the result element from the DOM
    const resultDisplay = document.querySelector('#result');

    // Array stores the cards the user has chosen
    var cardsChosen = [];

    // Array stores the Id of the cards the user has chosen
    var cardsChosenId = [];

    // Array stores the cards the user has matched
    var cardsWon = [];

    // Number of player attempts
    var playerAttempts = 0;


    // Function creates the game board
    function createBoard() {

        // Iterate the cardArray
        for(let i = 0; i < cardArray.length; i++) {

            // Create an image element for each object in the cardArray
            var card = document.createElement('img');

            // Set the image source to the card back by default
            card.setAttribute('src', 'images/blank.png');

            // Give each card a data-id (from 0 to 11 for the 12 cards in the cardArray)
            card.setAttribute('data-id', i);

            // Add event listener for when user has clicked on a card
            card.addEventListener('click', flipCard);

            // Add each card to the grid element
            grid.appendChild(card);

            // Display the user stats
            resultDisplay.textContent = `Attempts: ${playerAttempts} || Matches: ${cardsWon.length}`;
        }
    }


    // Function handles card match checking
    function checkForMatch() {

        // Get a NodeList of the card images added to the document
        var cards = document.querySelectorAll('img');

        // Pull the card selections
        const optionOneId = cardsChosenId[0];
        const optionTwoId = cardsChosenId[1];

        // Check for matching names
        if (cardsChosen[0] === cardsChosen[1]) {

            // Inform user of match
            alert('You have found a match');

            // White out matching cards
            cards[optionOneId].setAttribute('src', 'images/white.png');
            cards[optionTwoId].setAttribute('src', 'images/white.png');

            // Remove event listeners from matched cards
            cards[optionOneId].removeEventListener('click', flipCard);
            cards[optionTwoId].removeEventListener('click', flipCard);

            // Add the cards to the cardsWon array
            cardsWon.push(cardsChosen);
        } else {

            // Flip cards back over when they do not match
            cards[optionOneId].setAttribute('src', 'images/blank.png');
            cards[optionTwoId].setAttribute('src', 'images/blank.png');

            // Increment the attempts
            playerAttempts++;

            // Inform user of mismatch
            alert('Sorry, try again');
        }

        // Clear the arrays
        cardsChosen = [];
        cardsChosenId = [];

        // Display the user stats
        resultDisplay.textContent = `Attempts: ${playerAttempts} Matches: ${cardsWon.length}`;

        // Check for all cards matched
        if (cardsWon.length === cardArray.length / 2) {
            resultDisplay.textContent = `Congratulations! Your score is: ${cardsWon.length - playerAttempts}`;
        }
    }


    // Function handles card flipping
    function flipCard() {

        // Get the data-id of the card
        var cardId = this.getAttribute('data-id');

        // Add the selected card to the chosen array
        cardsChosen.push(cardArray[cardId].name);

        // Add the selected card's Id to the array
        cardsChosenId.push(cardId);

        // Reveal the card image by changing the images 'src' attribute
        this.setAttribute('src', cardArray[cardId].img);

        // If two cards are chosen, check for a match after 500 ms
        if (cardsChosen.length === 2) {
            setTimeout(checkForMatch, 500);
        }
    }

    // Call the create function
    createBoard();
})