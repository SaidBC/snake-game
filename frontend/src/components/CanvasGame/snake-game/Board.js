import { CanvasSettings } from "./utils/CanvasSettings.js";

class Board extends CanvasSettings {
  constructor(CANVAS_SETTINGS) {
    super(CANVAS_SETTINGS);
    this.GREEN = "#578a34";
    this.LIGHT_GREEN = "#a2d149";
    this.VERY_LIGHT_GREEN = "#aad751";
    this.blockSize = 35;
  }
  async draw() {
    this.ctx.fillStyle = this.GREEN;
    this.ctx.fillRect(0, 0, this.CANVAS_WIDTH, this.CANVAS_HEIGHT);
    for (let x = 0; x < 15; x++) {
      for (let y = 0; y < 15; y++) {
        this.ctx.fillStyle =
          (x * 15 + y) % 2 ? this.LIGHT_GREEN : this.VERY_LIGHT_GREEN;
        this.ctx.fillRect(
          x * this.blockSize + 37.5,
          y * this.blockSize + 37.5,
          this.blockSize,
          this.blockSize
        );
      }
    }
  }
}

export { Board };
