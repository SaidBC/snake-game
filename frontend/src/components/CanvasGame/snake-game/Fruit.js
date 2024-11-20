import { CanvasSettings } from "./utils/CanvasSettings.js";
import getImage from "./utils/getImage.js";
import { randomCordinates } from "./utils/randomCordinates.js";
import appleImage from "../../../assets/apple_00.png";
class Fruit extends CanvasSettings {
  constructor(initialFruit, forbiddenBlocks, CANVAS_SETTINGS) {
    super(CANVAS_SETTINGS);
    this.image = getImage(appleImage);
    this.size = 35;
    this.scale = 0.9;
    this.counter = 0;
    this.initialFruit = initialFruit;
    if (this.initialFruit) {
      this.x = 11 * 35 + 37.5;
      this.y = 8 * 35 + 37.5;
    } else {
      const randomBlock = randomCordinates(
        forbiddenBlocks.map((block) => block.x * 15 + block.y)
      );
      this.x = randomBlock.x * 35 + 37.5;
      this.y = randomBlock.y * 35 + 37.5;
    }
  }
  update() {
    this.counter += 3;
    this.scale = Math.sin((Math.PI / 180) * this.counter) * 0.1 + 1;
  }
  async draw() {
    this.ctx.shadowColor = "#00000044";
    this.ctx.shadowOffsetX = 2;
    this.ctx.shadowOffsetY = 2;
    this.ctx.translate(this.x, this.y);
    this.ctx.scale(this.scale, this.scale);
    this.ctx.drawImage(await this.image, 0, 0, this.size, this.size);
    this.ctx.resetTransform();
  }
}

export { Fruit };
