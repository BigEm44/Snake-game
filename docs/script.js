//get canvas
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

//snake
const box = 10;
let snake = [];

//initial snake position
snake[0] = {
  x: 20 * box,
  y: 20 * box
};

//score
let score = 0;
//food
let food = {
  x: Math.floor(Math.random() * 39 + 1) * box,
  y: Math.floor(Math.random() * 39 + 1) * box
};

//snake control function
let c;
const control = (e) => {
  let key = e.keyCode;
  if (key === 37 && c != "RIGHT") {
    c = "LEFT";
  } else if (key === 38 && c != "DOWN") {
    c = "UP";
  } else if (key === 39 && c != "LEFT") {
    c = "RIGHT";
  } else if (key === 40 && c != "UP") {
    c = "DOWN";
  }
};
document.addEventListener("keydown", control);

//eating food collision function
const collision = (head, snakeArray) => {
  for (let i = 0; i < snakeArray.length; i++) {
    if (head.x === snakeArray[i].x && head.y === snakeArray[i].y) return true;
  }
  return false;
};

//drawing game function
const draw = () => {
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, 40 * box, 40 * box);

  //draw score background
  ctx.fillStyle = "deepskyblue";
  ctx.fillRect(0, 40 * box, 40 * box, 2 * box);

  //score text
  ctx.fillStyle = "black";
  ctx.font = "15px Arial, sans-serif";
  ctx.fillText(`SCORE: ${score}`, box, 41.5 * box);

  //draw snake
  for (let i = 0; i < snake.length; i++) {
    ctx.fillStyle = i === 0 ? "red" : "white";
    ctx.fillRect(snake[i].x, snake[i].y, box, box);

    ctx.strokeStyle = "red";
    ctx.strokeRect(snake[i].x, snake[i].y, box, box);
  }

  //draw food
  ctx.fillStyle = "green";
  ctx.fillRect(food.x, food.y, box, box);

  //snake initial position
  let snakeX = snake[0].x;
  let snakeY = snake[0].y;

  //snake eat food and growing
  if (snakeX === food.x && snakeY === food.y) {
    score++;
    food = {
      x: Math.floor(Math.random() * 39 + 1) * box,
      y: Math.floor(Math.random() * 39 + 1) * box
    };
  } else {
    snake.pop();
  }

  //direction steering
  if (c === "RIGHT") snakeX += box;
  if (c === "LEFT") snakeX -= box;
  if (c === "UP") snakeY -= box;
  if (c === "DOWN") snakeY += box;

  //new head position
  let newHead = {
    x: snakeX,
    y: snakeY
  };
  //checking collisions with walls and snake with itself- GAME OVER
  if (
    snakeX < 0 ||
    snakeX > 39 * box ||
    snakeY < 0 ||
    snakeY > 39 * box ||
    collision(newHead, snake)
  ) {
    clearInterval(game);
    ctx.fillStyle = "red";
    ctx.font = "35px Arial, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("GAME OVER", 20 * box, 20 * box);
    ctx.font = "18px Arial, sans-serif";
    ctx.fillText("TRY AGAIN !!!", 20 * box, 23 * box);
    ctx.font = "13px Arial, sans-serif";
    ctx.fillText("REFRESH THE PAGE", 20 * box, 25 * box);
  }

  snake.unshift(newHead);
};

let game = setInterval(draw, 100);
