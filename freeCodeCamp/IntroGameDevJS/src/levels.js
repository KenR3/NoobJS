

import Brick from "/src/brick.js";


// This function builds the levels
export function buildLevel(game, level){

    // Array to store brick positions
    let bricks = [];

    // Loop though the level data
    level.forEach((row, rowIndex) => {
        // Loop through the row data of the level
        row.forEach((brick, brickIndex) => {
            // If the number is 1, add a brick to the array
            if(brick === 1){
                let position = {
                    x: 60 * brickIndex,
                    y: 100 + 24 * rowIndex
                }
                bricks.push(new Brick(game, position));
            }
        });
    });

    return bricks;
}


export const level1 = [
    // [0, 0, 1, 1, 0, 0, 1, 1, 0, 0],
    // [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    // [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    // [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]

    [0, 0, 0, 0, 0, 0, 0, 1, 0, 0]
]

export const level2 = [
    // [0, 0, 1, 1, 0, 0, 1, 1, 0, 0],
    // [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    // [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    // [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]

    [0, 0, 1, 0, 0, 0, 0, 1, 0, 0]
]

// export const level3 = [
//     // [0, 0, 1, 1, 0, 0, 1, 1, 0, 0],
//     // [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
//     // [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
//     // [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]

//     [0, 1, 1, 0, 0, 0, 0, 1, 1, 0]
// ]

// export const level4 = [
//     // [0, 0, 1, 1, 0, 0, 1, 1, 0, 0],
//     // [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
//     // [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
//     // [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]

//     [0, 1, 1, 1, 0, 0, 1, 1, 1, 0]
// ]

// export const level5 = [
//     // [0, 0, 1, 1, 0, 0, 1, 1, 0, 0],
//     // [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
//     // [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
//     // [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]

//     [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
// ]