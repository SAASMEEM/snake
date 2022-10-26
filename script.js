const c = document.getElementById("canvas");
const ctx = c.getContext("2d");

let score = 0;
document.getElementById("score").innerHTML = score;
let highscore = 0;
document.getElementById("high_score").innerHTML = highscore

let snake = {x: 20, y: 20, lastX: 20, lastY: 20}
let tail = [];

let circleX = Math.round((Math.random() * 24)) * 10 * 2 + 10;
let circleY = Math.round((Math.random() * 24)) * 10 * 2 + 10;
let borderGameOver = false;
let orientation = "ArrowRight";


snake_body();
circle(circleX, circleY);

setInterval(gameLoop, 100);


function gameLoop() {
   if (orientation === "ArrowUp") {
        snake.lastX = snake.x;
        snake.lastY = snake.y;
        snake.y -= 20;
        snake_body();
    } else if (orientation === "ArrowDown") {
        snake.lastX = snake.x;
        snake.lastY = snake.y;
        snake.y += 20;
        snake_body();
    } else if (orientation === "ArrowLeft") {
        snake.lastX = snake.x;
        snake.lastY = snake.y;
        snake.x -= 20;
        snake_body();
    } else if (orientation === "ArrowRight") {
        snake.lastX = snake.x;
        snake.lastY = snake.y;
        snake.x += 20;
        snake_body();
    }
}

function eatCollision(){
    circleX = Math.round((Math.random() * 24)) * 10 * 2 + 10;
    circleY = Math.round((Math.random() * 24)) * 10 * 2 + 10;
    circle(circleX, circleY);

    tail.push({x: snake.lastX, y: snake.lastY});

    score += 1;
    document.getElementById("score").innerHTML = score
}

function snake_body() {
    ctx.clearRect(0, 0, c.width, c.height);
    circle(circleX, circleY);

    borderGameOver = snake.y <= -20 || snake.y >= 500 || snake.x <= -20 || snake.x >= 500;
    if (borderGameOver === true) {
        gameover();
    }

    if((snake.x === (circleX - 10)) && (snake.y === (circleY - 10))){
        eatCollision();
    }

    ctx.fillStyle = "#FF0000";
    ctx.fillRect(snake.x, snake.y, 20, 20);

    for (let i = tail.length; i >= 1; i--) {
        if (i === 1) {
            ctx.fillStyle = "#FF0000"
            ctx.fillRect(snake.lastX + 5, snake.lastY + 5, 10, 10);

            if (tail[i - 1] !== undefined) {
                tail[i - 1].x = snake.lastX + 5;
                tail[i - 1].y = snake.lastY + 5;
            }
        } else {
            tail[i - 1].x = tail[i - 2].x;
            tail[i - 1].y = tail[i - 2].y;

            ctx.fillStyle = "#FF0000"
            ctx.fillRect(tail[i - 1].x, tail[i - 1].y, 10, 10);

            if ((snake.x === (tail[i - 1].x - 5)) && (snake.y === tail[i - 1].y - 5)) {
                gameover();
            }
        }
    }
}

function circle(circleX, circleY){
    ctx.beginPath();
    ctx.arc(circleX, circleY, 10, 0, 2 * Math.PI);
    ctx.fillStyle = "#00c800";
    ctx.fill();
}

addEventListener('keydown', (event) => {
    if (event.code === "ArrowUp") {
        orientation = "ArrowUp";
    }
    if (event.code === "ArrowDown") {
        orientation = "ArrowDown";
    }
    if (event.code === "ArrowLeft") {
        orientation = "ArrowLeft";
    }
    if (event.code === "ArrowRight") {
        orientation = "ArrowRight";
    }
    if (event.code === "KeyP"){
        reset();
    }
});

function gameover() {
    alert("GAME OVER");
    reset()
}

function reset() {
    tail = [];
    circleX = Math.round((Math.random() * 24)) * 10 * 2 + 10;
    circleY = Math.round((Math.random() * 24)) * 10 * 2 + 10;
    snake = {x: 20, y: 20, lastX: 20, lastY: 20};
    orientation = "ArrowRight"

    if (score > highscore) {
        highscore = score;
        document.getElementById("high_score").innerHTML = highscore
    }

    score = 0
    document.getElementById("score").innerHTML = score
}