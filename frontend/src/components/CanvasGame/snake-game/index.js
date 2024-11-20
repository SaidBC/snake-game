import { Board } from "./Board.js";
import { Fruit } from "./Fruit.js";
import { Snake } from "./Snake.js";

class Game {
  constructor(CANVAS_SETTINGS) {
    this.CANVAS_SETTINGS = CANVAS_SETTINGS;
    this.board = new Board(CANVAS_SETTINGS);
    this.fruit = new Fruit(true, null, CANVAS_SETTINGS);
    this.snake = new Snake(CANVAS_SETTINGS);
    this.score = 0;
    this.timer = 0;
    this.isGameOver = false;
  }
  #checkGameOver() {
    const isHitTail = [...this.snake.movesQueue]
      .map((move) => move.x * 15 + move.y)
      .includes(this.snake.xblock * 15 + this.snake.yblock);
    if (
      this.snake.xblock === 15 ||
      this.snake.xblock === -1 ||
      this.snake.yblock === -1 ||
      this.snake.yblock === 15 ||
      isHitTail
    ) {
      this.isGameOver = true;
      return (this.snake.direction = null);
    }
  }
  #checkEating(snakeCordinates, fruitCordinates) {
    if (
      snakeCordinates.x === fruitCordinates.x &&
      snakeCordinates.y === fruitCordinates.y
    ) {
      this.score++;
      this.fruit = new Fruit(
        false,
        [
          { x: this.snake.xblock, y: this.snake.yblock },
          ...this.snake.movesQueue,
        ],
        this.CANVAS_SETTINGS
      );
      this.snake.movesQueue.unshift({
        x: this.snake.movesQueue.at(-1).x,
        y: this.snake.movesQueue.at(-1).y,
      });
    }
  }

  update() {
    this.fruit.update();
    this.timer += 2;
    if (this.timer % 20 == 0) {
      this.#checkGameOver();
      this.snake.update();
      this.#checkEating(
        { x: this.snake.xblock, y: this.snake.yblock },
        {
          x: (this.fruit.x - 37.5) / 35,
          y: (this.fruit.y - 37.5) / 35,
        }
      );
    }
  }
  async draw() {
    await this.board.draw();
    await this.fruit.draw();
    await this.snake.draw();
  }
}
// const game = new Game();

// window.addEventListener("keydown", (e) => {
//   if (!game.isGameOver) {
//     gameControls(e, game);
//   }
// });

export { Game };
