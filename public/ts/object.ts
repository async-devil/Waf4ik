import { RenderTarget } from './renderTarget.js';

export class objectBase {
  //transform
  public x: number = 0;
  public y: number = 0;
  public rot: number = 0;
  public layer: number = 1;
  //events
  public everyTick: Function = () => {};
  protected onClick: Function = (point) => {};
  public onresize: Function = () => {};
  //basic variables
  private rt: RenderTarget;
  //flags
  public doOnClick = true;
  public doEveryTick = true;
  public isVisible = true;
  public doOnResize = true;
  //render
  public texture: HTMLImageElement | string = 'red';
  //functions
  //constructor
  constructor(rt: RenderTarget, texture: HTMLImageElement | string = 'red') {
    this.rt = rt;
    this.texture = texture;
  }
  //getters
  public get getRt() {
    return this.rt;
  }
  public get getCtx() {
    return this.rt.getCTX;
  }
  protected degToRad(deg: number) {
    //convert deg to rad
    return (deg * Math.PI) / 180;
  }

  public disable() {
    this.isVisible = false;
    this.doEveryTick = false;
    this.doOnClick = true;
    this.doOnResize = false;
  }
  public enable() {
    this.isVisible = true;
    this.doEveryTick = true;
    this.doOnClick = true;
    this.doOnResize = true;
  }
}
export class roundObjectBase extends objectBase {
  radius: number = 100;
  constructor(rt: RenderTarget, texture: HTMLImageElement | string = 'red', radius: number = 100) {
    super(rt, texture);
    this.radius = radius;
  }
  isPointOnSprite(x1: number, y1: number): boolean {
    if (this.dotDistSquare(x1, y1) <= this.radius * this.radius) return true;
    return false;
  }

  rotate(deltaRot: number) {
    this.rot += deltaRot;
  }
  //drawing sprite unrotated
  private _draw(ctx: CanvasRenderingContext2D, image: HTMLImageElement | string) {
    if (image instanceof HTMLImageElement) {
      ctx.drawImage(
        image,
        this.x - this.radius,
        this.y - this.radius,
        this.radius * 2,
        this.radius * 2,
      );
    } else {
      ctx.fillStyle = image;
      ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
      ctx.fill();
    }
  }
  private dotDistSquare(dot1: any, dot2: any): number {
    return Math.pow(dot1 - this.x, 2) + Math.pow(dot2 - this.y, 2);
  }
  draw() {
    let image: HTMLImageElement | string = this.texture;
    let ctx: CanvasRenderingContext2D = this.getCtx;
    //drawing spriteUnrotated
    if (this.rot == 0) this._draw(ctx, image);
    //drawing sprite rotated
    else {
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate(this.degToRad(this.rot));
      ctx.translate(-this.x, -this.y);
      this._draw(ctx, image);
      ctx.restore();
    }
  }
  set onclick(fx: Function) {
    this.onClick = (point) => {
      if (this.isPointOnSprite(point.x, point.y)) {
        fx();
      }
    };
  }
}

export class rectObjectBase extends objectBase {
  width: number = 100;
  height: number = 100;
  //draws sprite unrotated
  private _draw() {
    if (this.texture instanceof HTMLImageElement)
      this.getCtx.drawImage(
        this.texture,
        this.x - (this.width >> 1),
        this.y - (this.height >> 1),
        this.width,
        this.height,
      );
    else {
      this.getCtx.fillStyle = this.texture;
      this.getCtx.fillRect(
        this.x - (this.width >> 1),
        this.y - (this.height >> 1),
        this.width,
        this.height,
      );
    }
  }
  draw() {
    if (this.rot == 0) {
      this._draw();
    } else {
      this.getCtx.save();
      this.getCtx.translate(this.x, this.y);
      this.getCtx.rotate(this.degToRad(this.rot));
      this.getCtx.translate(-this.x, -this.y);
      this._draw();
      this.getCtx.restore();
    }
  }
  isPointOnSprite(x: number, y: number): boolean {
    let x1: number = this.x - (this.width >> 1);
    let y1: number = this.y - (this.height >> 1);
    let x2: number = this.x + (this.width >> 1);
    let y2: number = this.y + (this.height >> 1);
    if (x >= x1 && x <= x2 && y >= y1 && y <= y2) return true;

    return false;
  }
  set onclick(fx: Function) {
    this.onClick = (point) => {
      if (this.isPointOnSprite(point.x, point.y)) {
        fx();
      }
    };
  }
}
