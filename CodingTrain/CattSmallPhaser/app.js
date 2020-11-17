

// Declare player and enemy objects
var player;
var enemies = [];
var enemiesToSpawn = 10;
var enemiesLeft = enemiesToSpawn;
var enemiesAreSafe = true;

// Track player HP
var hitPoints = 5;
var hitPointsString = "HP: ";
var hitPointsText;

// Track player score
var score = 0;
var scoreString = "Score: ";
var scoreText;

// Track the text displayed on game screen
var introText;

// Game started/ended boolean flags
var gameStarted;
var finishedGame;


// ...
var gamePlay = new Phaser.Class({

    // Inherit from Phaser
    Extends: Phaser.Scene,


    // Define the scene start function
    initialize: function GamePlay() {
        Phaser.Scene.call(this, {key: "GamePlay"});
    },


    /*
        PRELOAD FUNCTION: LOAD ASSETS
    */
    preload: function() {

        // Preload images
        this.load.image(
            "sky",
            "https://raw.githubusercontent.com/cattsmall/Phaser-game/5-2014-game/assets/sky.png"
        );

        // Preload spritesheets
        this.load.spritesheet(
            "dude",
            "https://raw.githubusercontent.com/cattsmall/Phaser-game/5-2014-game/assets/dude.png",
            {
                frameWidth: 32,
                frameHeight: 48
            }
        );
        this.load.spritesheet(
            "baddie",
            "https://raw.githubusercontent.com/cattsmall/Phaser-game/5-2014-game/assets/baddie.png",
            {
                frameWidth: 32,
                frameHeight: 32
            }
        );
    },


    /*
        CREATE FUNCTION: SET UP THE SCENE
        Notice the order of creation, the same order in which images are stacked on each other.
        You should instantiate graphics in the order you want them to stack.
    */
    create: function() {

        // Create the background
        this.physics.add.sprite(config.width / 2, config.height / 2, "sky");

        // Create the player
        player = this.physics.add.sprite(32, config.height - 150, "dude");

        // Create player animations
        this.anims.create({
            key: "left",
            frames: this.anims.generateFrameNumbers("dude", {start: 0, end: 0}),
            repeat: -1
        });
        this.anims.create({
            key: "down",
            frames: this.anims.generateFrameNumbers("dude", {start: 1, end: 1}),
            repeat: -1
        });
        this.anims.create({
            key: "right",
            frames: this.anims.generateFrameNumbers("dude", {start: 2, end: 2})
        });
        this.anims.create({
            key: "up",
            frames: this.anims.generateFrameNumbers("dude", {start: 3, end: 3})
        });

        // Player collision with boundaries
        player.setCollideWorldBounds(true);

        // Keyboard input keys
        cursors = this.input.keyboard.createCursorKeys();

        // Enemy safe to attack flag
        enemiesAreSafe = false;

        // Create the enemies
        enemies = this.physics.add.staticGroup({
            key: "baddie",
            repeat: enemiesToSpawn
        });

        // Enemy location & collision with boundaries
        enemies.children.iterate(function(enemy) {

            // Set enemy locations
            enemy.setX(Phaser.Math.FloatBetween(32, config.width - 32));
            enemy.setY(Phaser.Math.FloatBetween(32, config.height - 32));

            // Check boundaires
            if(enemy.x > config.width - 32) {
                enemy.setX(config.width - 48);
            }
            else if(enemy.x < 32) {
                enemy.setX(48);
            }
            if(enemy.y > config.height - 32) {
                enemy.setY(config.height - 48);
            }
            else if(enemy.y < 32) {
                enemy.setY(48);
            }
        });

        // Create enemy animations
        this.anims.create({
            key: "safe",
            frames: this.anims.generateFrameNumbers("baddie", {start: 1, end: 1})
        });
        this.anims.create({
            key: "unsafe",
            frames: this.anims.generateFrameNumbers("baddie", {start: 0, end: 0})
        });

        // Update the enemy physics colliders
        enemies.refresh();

        // Text for score
        scoreText = this.add.text(32, 24, scoreString + score);
        scoreText.visible = false;

        // Text for HP
        hitPointsText = this.add.text(32, 64, hitPointsString + hitPoints);
        hitPointsText.visible = false;

        // Intro text
        introText = this.add.text(
            32,
            24,
            "Hit the baddies when they're in their weak state! \n\nClick on the game to start playing. \n\nUse the arrow keys to move."
        );

        // Game start click event
        // When the player clicks the game and it hasn't started yet
        this.input.on("pointerdown", function() {
            if(!gameStarted) {
                startGame();
            }
        });

        // Generate timer
        timedEvent = this.time.addEvent({
            delay: 1000,
            callback: switchEnemyState,
            callbackScope: this,
            loop: true
        });

        // When overlap occurs, run the function
        this.physics.add.overlap(player, enemies, collideWithEnemy, null, this);
    },



    /*
        UPDATE FUNCTION: MAKE CHANGES OVER TIME
    */
    update: function() {

        // Init player velocity
        player.setVelocity(0, 0);
    
        // Handle player movement & update score
        if(gameStarted && !finishedGame) {

            // Left & right movement
            if(cursors.left.isDown) {
                player.setVelocityX(-150);
                player.anims.play("left");
            }
            else if(cursors.right.isDown) {
                player.setVelocityX(150);
                player.anims.play("right");
            }

            // Up & down movement
            if(cursors.up.isDown) {
                player.setVelocityY(-150);
                player.anims.play("up");
            }
            else if(cursors.down.isDown) {
                player.setVelocityY(150);
                player.anims.play("down");
            }

            // Update score
            scoreText.setText(scoreString + score);
            hitPointsText.setText(hitPointsString + hitPoints);
        }
   }
});



/*
    GLOBAL FUNCTIONS
*/


// Function changes enemies safe/unsafe state
function switchEnemyState() {

    if(gameStarted && !finishedGame) {

        // Check enemy state; change accordingly
        if(enemiesAreSafe == false) {
            enemiesAreSafe = true;
            enemies.children.iterate(function(enemy) {
                enemy.anims.play("safe");
            });
        }
        else {
            enemiesAreSafe = false;
            enemies.children.iterate(function(enemy) {
                enemy.anims.play("unsafe");
            });
        }
    }
}


// Function tracks collision with enemies & checks for game end
function collideWithEnemy(player, enemy) {

    if(gameStarted && !finishedGame) {

        // Track player & enemy collision when unsafe/safe
        if(enemiesAreSafe == false) {
            hitPoints--;
        }
        else {
            score++;
        }

        // Make enemy inactive
        enemy.disableBody(true, true);
        enemiesLeft--;

        // Check for game end conditions
        if(hitPoints <= 0) {
            killGame();
            introText.setText("Game over! Refresh the page to play again.");
        }
        else if(hitPoints > 0 && enemiesLeft < 0) {
            killGame();
            introText.setText("Greatjob, you won! Refresh the page to play again.");
        }
    }
}


// Function starts the game w/ default values
// Game starts when player clicks on the game screen and the game has not started yet
function startGame() {
    introText.visible = false;
    scoreText.visible = true;
    hitPointsText.visible = true;
    gameStarted = true;
    finishedGame = false;
}


// Function ends the game
// Game ends when player has less than 1 HP or has killed all enemies
function killGame() {
    finishedGame = true;
    player.setVelocity(0, 0);
    introText.visible = true;
    scoreText.visible = false;
    hitPointsText.visible = false;
}


/*
    CONFIG + INSTANTIATION OF THE GAME
*/

// Define the game config
var config = {
    type: Phaser.AUTO,

    // Dimensions of HTML5 Canvas element generated by Phaser
    width: 640,
    height: 480,

    // Using pixel art
    pixelArt: true,

    // Center the canvas element on the page
    autoCenter: true,

    // Grab the input focus when the game starts
    autoFocus: true,

    // Input configuration
    input: {
        keyboard: true,
        mouse: true,
        touch: false,
        gamepad: false
    },

    // Physics configuration
    physics: {
        default: "arcade",
        arcade: {
            gravity: {y: 0},
            debug: false
        }
    },

    // Scene configuration
    scene: gamePlay
};

// Instantiate the game
var game = new Phaser.Game(config);