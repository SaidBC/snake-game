function gameControls(e, game) {
  const keys = {
    top: ["w", "W", "ArrowUp"],
    left: ["a", "A", "ArrowLeft"],
    down: ["s", "S", "ArrowDown"],
    right: ["d", "D", "ArrowRight"],
  };
  if (
    keys.right.includes(e.key) &&
    game.snake.direction != "left" &&
    game.snake.direction != "right" &&
    game.snake.isMoved
  ) {
    game.snake.direction = "right";
    game.snake.isMoved = false;
  }
  if (
    keys.top.includes(e.key) &&
    game.snake.direction != "bottom" &&
    game.snake.direction != "top" &&
    game.snake.isMoved
  ) {
    game.snake.direction = "top";
    game.snake.isMoved = false;
  }
  if (
    keys.left.includes(e.key) &&
    game.snake.direction != "right" &&
    game.snake.direction != "left" &&
    game.snake.isMoved
  ) {
    game.snake.direction = "left";
    game.snake.isMoved = false;
  }
  if (
    keys.down.includes(e.key) &&
    game.snake.direction != "top" &&
    game.snake.direction != "bottom" &&
    game.snake.isMoved
  ) {
    game.snake.direction = "bottom";
    game.snake.isMoved = false;
  }
}

export { gameControls };
