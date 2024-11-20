import { CanvasSettings } from "./utils/CanvasSettings.js";

class Tail extends CanvasSettings {
  constructor(x, y, CANVAS_SETTINGS) {
    super(CANVAS_SETTINGS);
    this.xblock = x;
    this.yblock = y;
    this.size = 30;
  }
  draw() {
    this.ctx.fillStyle = "#05f";
    this.ctx.fillRect(
      40 + 35 * this.xblock,
      40 + 35 * this.yblock,
      this.size,
      this.size
    );
  }
}
export { Tail };
