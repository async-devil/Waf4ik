import { RenderTarget } from './renderTarget.js';

export class roundSprite {
  public x: number; //x - center
  public y: number; //y - centes
  public isVisible: boolean = true; // is visible
  public rot: number; //rotatin
  public radius: number; //radius
  public everyTick: Function = () => {}; //called everyFrame
  private ctx: CanvasRenderingContext2D; //rendering context
  private image: HTMLImageElement; //image
  private rt: RenderTarget;
  private index: number;
  public doEveryTick: boolean = true;
  public doOnClic: boolean = false;
  public layer: number = 1;
  public onClick: Function = () => {};

  private degToRad(deg: number) {
    //convert deg to rad
    return (deg * Math.PI) / 180;
  }

  public dotDistSquare(dot1: any, dot2: any): number {
    return Math.pow(dot1 - this.x, 2) + Math.pow(dot2 - this.y, 2);
  }

  constructor(
    rt: RenderTarget, //rendering context
    image: HTMLImageElement, //image
    x: number = 0, //center x
    y: number = 0, //center y
    rot: number = 0, // transform
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
  moveLeft(dist: number) {
    this.x - +dist;
  }
  moveRight(dist: number) {
    this.x += dist;
  }
  public get getIndex() {
    return this.index;
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

export class RectSprite {
  public layer: number = 1;
  public x: number; //x - center
  public y: number; //y - centes
  public isVisible: boolean = true; // is visible
  public rot: number; //rotatin
  public height: number = 0;
  public width: number = 0;
  //public radius: number; //radius
  public everyTick: Function = () => {}; //called everyFrame
  private ctx: CanvasRenderingContext2D; //rendering context
  private image: HTMLImageElement | string; //image
  private rt: RenderTarget;
  private index: number;
  public doEveryTick: boolean = true;
  private degToRad(deg: number) {
    //convert deg to rad
    return (deg * Math.PI) / 180;
  }

  public dotDistSquare(dot1: any, dot2: any): number {
    return Math.pow(dot1 - this.x, 2) + Math.pow(dot2 - this.y, 2);
  }

  constructor(
    rt: RenderTarget, //rendering context
    image: HTMLImageElement | string, //image
    x: number = 0, //x center
    y: number = 0, //y center
    rot: number = 0, // transform
    //width: number = 100,
    height: number = 100, //height
    width: number = 100,
  ) {
    this.rt = rt;
    this.ctx = rt.getCTX;
    this.image = image; //image
    this.x = x; //x center
    this.y = y; //y center
    this.rot = rot; //rotation
    this.height = height; //radius
    this.width = width;
    this.index = this.rt.addSprite(this);
  }
  draw() {
    if (this.rot !== 0) {
      this.ctx.save();
      this.ctx.translate(this.x, this.y);
      this.ctx.rotate(this.degToRad(this.rot));
      this.ctx.translate(-this.x, -this.y);
      //drawing sprite
      if (this.image instanceof HTMLImageElement)
        this.ctx.drawImage(
          this.image,
          this.x - this.width,
          this.y - this.height,
          this.width * 2,
          this.height * 2,
        );
      else
      {
      this.ctx.fillStyle = this.image;
        this.ctx.fillRect(
          this.x - this.width/2,
          this.y - this.height/2,
          this.width ,
          this.height,
        );
      }

      //end drawing
      this.ctx.restore();
    } else {
      if (this.image instanceof HTMLImageElement)
        this.ctx.drawImage(
          this.image,
          this.x - this.width/2,
          this.y - this.height/2,
          this.width ,
          this.height ,
        );
      else
      {
      this.ctx.fillStyle = this.image;
        this.ctx.fillRect(
          this.x - this.width,
          this.y - this.height,
          this.width * 2,
          this.height * 2,
        );
    }}
  }
  moveLeft(dist: number) {
    this.x -= dist;
  }
  moveRight(dist: number) {
    this.x += dist;
  }
  //rotate sprite
  rotate(deg: number) {
    this.rot += deg;
  }
  public get getIndex() {
    return this.index;
  }
  get getImg() {
    return this.image;
  }
  //draw sprite

  isPointOnSprite(x: number, y: number): boolean {
    let x1: number = this.x - this.width/2;
    let y1: number = this.y - this.height/2;
    let x2: number = this.x + this.width/2;
    let y2: number = this.y + this.height/2;
    if (x >= x1 && x <= x2 && y >= y1 && y <= y2) return true;

    return false;
  }
}
