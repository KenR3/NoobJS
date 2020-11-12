
/*
    This class is meant to handle player input.
    This class allows the player to move the paddle, pause the game, and start the game.
*/

/*
    The tutorial for this game uses 'keyCode', which is deprecated.
    I changed this to key, and used the returned string in the following switch statements.
*/

export default class InputHandler {
    
    constructor(paddle, game) {

        // Add key pressed listener to the document
        document.addEventListener('keydown', (event) => {

            switch(event.key){

                case "ArrowLeft":
                    paddle.moveLeft();
                    break;

                case "ArrowRight":
                    paddle.moveRight();
                    break;

                case "Escape":
                    game.togglePause();
                    break;

                case " ":
                    game.start();
                    break;

                default:
                    break;
            }
        });

        // Add key released listener to the document
        document.addEventListener('keyup', (event) => {

            switch(event.key){

                case "ArrowLeft":
                    // Moving left before stopping
                    if(paddle.speed < 0){
                        paddle.stop();
                    }
                    break;

                case "ArrowRight":
                    // Moving right before stopping
                    if(paddle.speed > 0){
                        paddle.stop();
                    }
                    break;

                default:
                    break;
            }
        });
    }
}