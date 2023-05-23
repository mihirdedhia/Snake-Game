import { onSnake, expandSnake } from "./snake.js";
import { randomGridPosition } from "./grid.js";
import { incrementScore, checkScoreGreaterThanHighScore } from "./game.js";

// let food = { x: 10, y: 1 };
let food = getRandomFoodPosition();
const EXPANSION_RATE = 1;

export function update() {
    if (onSnake(food)) {
        incrementScore();
        checkScoreGreaterThanHighScore();
        expandSnake(EXPANSION_RATE);
        // food = { x: 20, y: 10 };
        food = getRandomFoodPosition();
    }
}

export function draw(gameBoard) {
    const foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    gameBoard.appendChild(foodElement);
}

function getRandomFoodPosition() {
    let newFoodPosition;

    while (newFoodPosition == null || onSnake(newFoodPosition)) {
        newFoodPosition = randomGridPosition();
    }

    return newFoodPosition;
}

