import { Tail } from "./Tail.js";
import { CanvasSettings } from "./utils/CanvasSettings.js";

class Snake extends CanvasSettings {
  constructor(CANVAS_SETTINGS) {
    super(CANVAS_SETTINGS);
    this.CANVAS_SETTINGS = CANVAS_SETTINGS;
    this.xblock = 5;
    this.yblock = 8;
    this.size = 30;
    this.direction = null;
    this.tail = [];
    this.timer = 0;
    this.movesQueue = [
      { x: this.xblock - 3, y: this.yblock },
      { x: this.xblock - 2, y: this.yblock },
      { x: this.xblock - 1, y: this.yblock },
    ];
    this.isMoved = true;
  }
  #rightMove() {
    if (this.direction == "right") {
      this.xblock += 1;
      this.isMoved = true;
    }
  }
  #leftMove() {
    if (this.direction == "left") {
      this.xblock -= 1;
      this.isMoved = true;
    }
  }
  #topMove() {
    if (this.direction == "top") {
      this.yblock -= 1;
      this.isMoved = true;
    }
  }
  #bottomMove() {
    if (this.direction == "bottom") {
      this.yblock += 1;
      this.isMoved = true;
    }
  }

  update() {
    this.tail = [];
    if (this.direction) {
      this.movesQueue.push({ x: this.xblock, y: this.yblock });
      this.movesQueue.shift();
    }
    this.#rightMove();
    this.#leftMove();
    this.#topMove();
    this.#bottomMove();
    this.movesQueue.forEach((move) => {
      this.tail.push(new Tail(move.x, move.y, this.CANVAS_SETTINGS));
    });
  }
  async draw() {
    this.ctx.fillStyle = "blue";
    this.ctx.fillRect(
      40 + 35 * this.xblock,
      40 + 35 * this.yblock,
      this.size,
      this.size
    );
    this.tail.forEach((tail) => tail.draw());
  }
}

export { Snake };
