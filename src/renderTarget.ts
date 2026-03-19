export class RenderTarget {
  private readonly canvas: HTMLCanvasElement;
  private htmlElement: HTMLHtmlElement;
  private ctx: CanvasRenderingContext2D;
  public onUpdate: Function;
  public onresize: Function = () => {};

  public enableRNDonClick: boolean = true;
  public enableOnResize: boolean = true;
  public backGround: string | CanvasGradient | CanvasPattern;
  private objectsArr: any[] = [];
  private _onClick: Function;
  private deltaTime: number;
  private time1: number;
  private time2: number;

  constructor(
    document: Document,
    canvasName: string = '0',
    backGround: string | CanvasGradient | CanvasPattern = 'white',
  ) {
    //creating canvas
    this.canvas = <HTMLCanvasElement>document.getElementById(canvasName);
    this.ctx = <CanvasRenderingContext2D>this.canvas.getContext('2d');
    this.htmlElement = document.getElementsByTagName('html')[0];

    //setting canvas size
    this.canvas.height = this.htmlElement.clientHeight;
    this.canvas.width = this.htmlElement.clientWidth;

    //setting ivents
    this.backGround = backGround;
    window.onclick = (point) => {
      this.onClick(point);
    };
    window.onresize = () => {
      this.onResize();
    };
  }
  get DeltaTime() {
    return this.deltaTime;
  }
  private onResize() {
    this.updateSize();
    for (let i = 0; i < this.objectsArr.length; i++) {
      let value: any = this.objectsArr[i];
      if (value.doOnResize) value.onresize();
    }
    if (this.enableOnResize) this.onresize();
  }
  private onClick(point) {
    for (let i = 0; i < this.objectsArr.length; i++) {
      if (this.objectsArr[i].doOnClick) this.objectsArr[i].onClick(point);
    }
    if (this.enableRNDonClick) this._onClick(point);
  }
  set onclick(fx: Function) {
    this._onClick = fx;
  }
  addObject(object: any) {
    this.objectsArr.push(object);
  }
  get height() {
    return this.canvas.height;
  }
  get width() {
    return this.canvas.width;
  }
  updateSize() {
    this.canvas.height = this.htmlElement.clientHeight;
    this.canvas.width = this.htmlElement.clientWidth;
  }

  updateBackground() {
    this.ctx.fillStyle = this.backGround;
    this.ctx.fillRect(0, 0, this.width, this.height);
  }
  updateRND() {
    this.updateSize();
    this.ctx.fillStyle = this.backGround;
    this.ctx.fillRect(0, 0, this.width, this.height);
  }

  get getCTX() {
    return this.ctx;
  }
  get getHeight() {
    return this.height;
  }
  get getWidth() {
    return this.width;
  }
  private drawLayer(index: number) {
    for (let i = this.objectsArr.length; i > 0; i--) {
      let value: any = this.objectsArr[i - 1];
      if (value.layer == index) {
        if (value.doEveryTick) value.everyTick();
        if (value.isVisible) value.draw();
      }
    }
  }
  public startGame() {
    this.time2 = this.time1;
    this.time1 = performance.now();
    this.deltaTime = -1 * (this.time2 - this.time1) || 0;
    this.updateBackground();
    this.drawLayer(1);
    this.drawLayer(2);
    this.drawLayer(3);

    this.onUpdate();
    window.requestAnimationFrame(() => this.startGame());
  }
}
