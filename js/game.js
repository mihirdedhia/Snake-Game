import { update as updateSnake, draw as drawSnake, SNAKE_SPEED, getSnakeHead, snakeIntersection } from './snake.js';
import { update as updateFood, draw as drawFood } from './food.js';
import { outSideGrid } from './grid.js';
export { incrementScore, checkScoreGreaterThanHighScore }

let lastRenderTime = 0;
let gameOver = false;
let score = 0;
let highScoreVal;
const gameBoard = document.getElementById('game-board');
const scoreBox = document.getElementById('score');
const highScoreBox = document.getElementById('high-score');

function main(currentTime) {
    if (gameOver) {
        if (confirm('You lost. Press ok to restart.')) {
            window.location = '/';
        }
        score = 0;
        return;
    }

    window.requestAnimationFrame(main);

    // dividing by 1000 because its milli seconds to seconds
    const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000;
    if (secondsSinceLastRender < 1 / SNAKE_SPEED) return;

    console.log("Render");
    lastRenderTime = currentTime;
    // console.log(currentTime);
    // console.log(secondsSinceLastRender);

    update();
    draw();
}

displayHighScore();

window.requestAnimationFrame(main);

function update() {
    updateSnake();
    updateFood();
    checkDeath();
}

function draw() {
    gameBoard.innerHTML = "";
    drawSnake(gameBoard);
    drawFood(gameBoard);
}

function checkDeath() {
    gameOver = outSideGrid(getSnakeHead()) || snakeIntersection();
}

const incrementScore = () => score++;

function checkScoreGreaterThanHighScore() {
    if (score > highScoreVal) {
        highScoreVal = score;
        localStorage.setItem("highScore", JSON.stringify(highScoreVal));
        highScoreBox.innerHTML = "High Score: " + highScoreVal;
    }
    scoreBox.innerHTML = "Score: " + score;
}

function displayHighScore() {
    let highScore = localStorage.getItem("highScore");
    if (highScore === null) {
        highScoreVal = 0;
        localStorage.setItem("highScore", JSON.stringify(highScoreVal))
    }
    else {
        highScoreVal = JSON.parse(highScore);
        highScoreBox.innerHTML = "High Score: " + highScoreVal;
    }

}