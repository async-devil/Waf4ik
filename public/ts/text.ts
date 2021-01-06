import { RenderTarget } from './renderTarget.js';
import canvasTxt, * as canvasTXT from './canvasTXT.js';
import { objectBase } from './object.js';
export class Text extends objectBase {
  text: string = 'default string';
  font: string = 'Arial';
  color: string = 'white';
  fontSize: number = 100;
  width: number = 100;
  height: number = 100;
  y: number = 0;
  constructor(rt: RenderTarget) {
    super(rt);
    rt.addObject(this);
  }
  draw() {
    canvasTxt.align = 'center';
    canvasTxt.justify = true;
    canvasTxt.vAlign = 'middle';
    canvasTxt.font = this.font;
    canvasTxt.fontSize = this.fontSize;
    this.getCtx.fillStyle = this.color;

    canvasTxt.drawText(
      this.getCtx,
      this.text,
      this.x - (this.width >> 1),
      this.y - this.height / 2,
      this.width,
      this.height,
    );
  }
}
