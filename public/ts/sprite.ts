import { RenderTarget } from './renderTarget.js';

export class roundSprite {
  public x: number; //x - center
  public y: number; //y - centes
  public rot: number; //rotatin
  public radius: number; //radius
  public everyTick: Function = () => {}; //called everyFrame
  private ctx: CanvasRenderingContext2D; //rendering context
  private image: HTMLImageElement; //image
  private rt: RenderTarget;
  private index: number;
  public doEveryTick: boolean = true;
  private degToRad(deg: number) {
    //convert deg to rad
    return (deg * Math.PI) / 180;
  }

  public dotDistSquare(dot1: any, dot2: any): number {
    return Math.pow(dot1 - this.x, 2) + Math.pow(dot2 - this.y, 2); // Do not touch this shit
  }

  constructor(
    rt: RenderTarget, //rendering context
    image: HTMLImageElement, //image
    x: number = 0,
    y: number = 0,
    rot: number = 0, // transform
    //width: number = 100,
    radius: number = 100, //radius
  ) {
    this.rt = rt;
    this.ctx = rt.getCTX;
    this.image = image; //image
    this.x = x; //x center
    this.y = y; //y center
    this.rot = rot; //rotation
    this.radius = radius; //radius
    this.index = this.rt.addSprite(this);
  }

  //rotate sprite
  rotate(deg: number) {
    this.rot += deg;
  }
  public get getIndex() {
    return this.index;
  }
  destroy() {
    this.rt.removeSpreite(this.index);
  }
  get getImg() {
    return this.image;
  }
  //draw sprite
  draw() {
    if (this.rot !== 0) {
      this.ctx.save();
      this.ctx.translate(this.x, this.y);
      this.ctx.rotate(this.degToRad(this.rot));
      this.ctx.translate(-this.x, -this.y);

      this.ctx.drawImage(
        this.image,
        this.x - this.radius,
        this.y - this.radius,
        this.radius * 2,
        this.radius * 2,
      );

      this.ctx.restore();
    } else {
      this.ctx.drawImage(
        this.image,
        this.x - this.radius,
        this.y - this.radius,
        this.radius * 2,
        this.radius * 2,
      );
    }
  }
  isPointOnSprite(x1: number, y1: number): boolean {
    if (this.dotDistSquare(x1, y1) <= this.radius * this.radius) return true;
    return false;
  }
}
