import { roundSprite } from './sprite.js';
import { RectSprite } from './sprite.js';

export class RenderTarget {
  private readonly canvas: HTMLCanvasElement;
  private htmlElement: HTMLHtmlElement;
  private ctx: CanvasRenderingContext2D;
  public onUpdate: any;

  private width: number;
  private height: number;

  public backGround: string | CanvasGradient | CanvasPattern;
  private spriteArr: any; //roundSprite[] | RectSprite[];

  public deltaTime: number;
  private time1: number;
  private time2: number;

  private readonly newProperty = this;

  constructor(
    document: Document,
    canvasName: string = '0',
    backGround: string | CanvasGradient | CanvasPattern = 'white',
  ) {
    this.canvas = <HTMLCanvasElement>document.getElementById(canvasName);
    this.ctx = <CanvasRenderingContext2D>this.canvas.getContext('2d');
    this.htmlElement = document.getElementsByTagName('html')[0];

    this.height = this.htmlElement.clientHeight;
    this.width = this.htmlElement.clientWidth;

    this.canvas.height = this.height;
    this.canvas.width = this.width;

    this.backGround = backGround;
    this.spriteArr = [];
  }

  addSprite(sprite: roundSprite | RectSprite): number {
    return this.spriteArr.push(sprite);
  }

  updateSize() {
    this.height = this.htmlElement.clientHeight;
    this.width = this.htmlElement.clientWidth;

    this.canvas.height = this.height;
    this.canvas.width = this.width;
  }

  updateRND() {
    this.updateSize();
    this.ctx.fillStyle = this.backGround;
    this.ctx.fillRect(0, 0, this.width, this.height);
  }

  get getCTX() {
    return this.ctx;
  }
  getSprite(index: number) {
    return this.spriteArr[index];
  }

  get getHeight() {
    return this.height;
  }
  get getWidth() {
    return this.width;
  }
  drawLayer(index: number) {
    for (let i = this.spriteArr.length; i > 0; i--) {
      let value = this.spriteArr[i - 1];
      if (value.layer == index) {
        if (value.doEveryTick) value.everyTick.call(1);
        if (value.isVisible) value.draw();
      }
    }
  }
  startEveryTick() {
    this.time2 = this.time1;
    this.time1 = performance.now();
    this.deltaTime = -1 * (this.time2 - this.time1) || 0;

    this.updateRND();
    this.drawLayer(1);
    this.drawLayer(2);
    this.drawLayer(3);

    this.onUpdate();
    window.requestAnimationFrame(() => this.startEveryTick());
  }
}
