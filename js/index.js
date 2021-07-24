let direction = { x: 0, y: 0 };

// Sound Variables
const foodsound = new Audio("music/food.mp3");
const gameoversound = new Audio("music/gameover.mp3");
const movesound = new Audio("music/move.mp3");
const musicsound = new Audio("music/music.mp3");
let speed = 11;
let lastpainttime = 0;
let snakeArr = [{ x: 13, y: 15 }];
let score = 0;

food = { x: 6, y: 7 };

// Game functions
function main(ctime) {
  window.requestAnimationFrame(main);
  // console.log(ctime);
  if ((ctime - lastpainttime) / 1000 < 1 / speed) {
    return;
  }
  lastpainttime = ctime;
  GameEngine();
}

function isCollide(snake) {
  // if you bump in inside
  for (let i = 1; i < snakeArr.length; i++) {
    if (snake[0].x == snake[i].x && snake[0].y == snake[i].y) {
      return true;
    }
  }
  if (snake[0].x >= 18 ||snake[0].x <= 0 ||snake[0].y >= 18 ||snake[0].y <= 0) {
    return true;
  }
}

function GameEngine() {
  // part 1: Updating the snake array and food
  if (isCollide(snakeArr)) {
    gameoversound.play();
    musicsound.pause();
    direction = { x: 0, y: 0 };
    alert("Game over! Click ok to play");
    scoreBox.innerHTML = "Score: 0";
    snakeArr = [{ x: 13, y: 15 }];
    score = 0;
  }

  // If snake eaten the food then regenerate the food
    if (snakeArr[0].x == food.x && snakeArr[0].y == food.y) {
        score += 1;
        if (score > highscore) {
            highscoreval = score;
            localStorage.setItem("highscore", JSON.stringify(highscoreval));
            HighscoreBox.innerHTML = "High Score:" + highscoreval;
        }
        scoreBox.innerHTML = "score:" + score;
        foodsound.play();
        snakeArr.unshift({x: snakeArr[0].x + direction.x,y: snakeArr[0].y + direction.y,});
        let a = 2;
        let b = 16;
        food = { x: Math.round(a + (b - a) * Math.random()), y: Math.round(a + (b - a) * Math.random())}
    }

  // Moving the snake
  for (let i = snakeArr.length - 2; i >= 0; i--) {
    snakeArr[i + 1] = { ...snakeArr[i] };
  }
  snakeArr[0].x += direction.x;
  snakeArr[0].y += direction.y;

  // part 2: Dsiplaying the snake array and food
  board.innerHTML = "";
  snakeArr.forEach((e, index) => {
    snakeElement = document.createElement("div");
    snakeElement.style.gridRowStart = e.y;
    snakeElement.style.gridColumnStart = e.x;
    if (index == 0) {
      snakeElement.classList.add("head");
    } else {
      snakeElement.classList.add("snake");
    }
    board.appendChild(snakeElement);
  });

  // Displaying the food
  foodElement = document.createElement("div");
  foodElement.style.gridRowStart = food.y;
  foodElement.style.gridColumnStart = food.x;
  foodElement.classList.add("food");
  board.appendChild(foodElement);
}

let highscore = localStorage.getItem("highscore");
if (highscore == null) {
  highscoreval = 0;
  localStorage.setItem("highscore", JSON.stringify(highscoreval));
} else {
  highscoreval = JSON.parse(highscore);
  HighscoreBox.innerHTML = "High Score:" + highscore;
}

// Main logics
// alert("Press any key to start. Play with Up, Down, Left and Right key!");
window.requestAnimationFrame(main);
window.addEventListener('keydown', e => {
    direction = { x: 0, y: 1 };
    musicsound.play();
    movesound.play();
    switch (e.key) {
        case "ArrowUp":
            console.log("ArrowUp");
            direction.x = 0;
            direction.y = -1;
            break;
        case "ArrowDown":
            console.log("ArrowDown");
            direction.x = 0;
            direction.y = 1;
            break;
        case "ArrowRight":
            console.log("ArrowRight");
            direction.x = 1;
            direction.y = 0;
            break;
        case "ArrowLeft":
            console.log("ArrowLeft");
            direction.x = -1;
            direction.y = 0;
            break;

        default:
            break;
    }

});