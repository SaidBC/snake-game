function gameControls(e, game) {
  if (
    e.key === "d" &&
    game.snake.direction != "left" &&
    game.snake.direction != "right" &&
    game.snake.isMoved
  ) {
    game.snake.direction = "right";
    game.snake.isMoved = false;
  }
  if (
    e.key === "w" &&
    game.snake.direction != "bottom" &&
    game.snake.direction != "top" &&
    game.snake.isMoved
  ) {
    game.snake.direction = "top";
    game.snake.isMoved = false;
  }
  if (
    e.key === "a" &&
    game.snake.direction != "right" &&
    game.snake.direction != "left" &&
    game.snake.isMoved
  ) {
    game.snake.direction = "left";
    game.snake.isMoved = false;
  }
  if (
    e.key === "s" &&
    game.snake.direction != "top" &&
    game.snake.direction != "bottom" &&
    game.snake.isMoved
  ) {
    game.snake.direction = "bottom";
    game.snake.isMoved = false;
  }
}

export { gameControls };
