

/*
    This function determines whether an object in the game collides with another object.
    This implementation is strange, it seems this could have just been a fuction of the Game class, as we pass it to the other classes anyway.
*/

export function detectCollision(ball, gameObject){

    let bottomOfBall = ball.position.y + ball.size;
    let topOfBall = ball.position.y;

    let topOfObject = gameObject.position.y;
    let leftSideOfObject = gameObject.position.x;
    let rightSideOfObject = gameObject.position.x + gameObject.width;
    let bottomOfObject = gameObject.position.y + gameObject.height;

    if(
        bottomOfBall >= topOfObject &&
        topOfBall <= bottomOfObject &&
        ball.position.x >= leftSideOfObject &&
        ball.position.x + ball.size <= rightSideOfObject
    ) {
        return true;
    } else {
        return false;
    }
}