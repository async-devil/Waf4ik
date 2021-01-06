import { rectObjectBase } from './object.js';
import { RenderTarget } from './renderTarget.js';

class MenuButton extends rectObjectBase {
  readonly maxRows: number = 3;
  timePassed: number = 0;
  animationDuration = 100;
  OnClick() {
    this.timePassed = 0;
    this.doEveryTick = true;
    this.width = this.getRt.width / 20 + 10;
    this.height = this.width;
  }
  EveryTick() {
    this.timePassed += this.getRt.DeltaTime;
    if (this.timePassed >= this.animationDuration) {
      this.width = this.getRt.width / 20;
      this.height = this.width;
      this.doEveryTick = false;
    }
  }
  constructor(
    rt: RenderTarget,
    row: number,
    isLeft: boolean,
    texture: { isColor: boolean; fill: string },
  ) {
    super(rt);
    this.everyTick = this.EveryTick;
    rt.addObject(this);
    this.layer = 3;
    this.width = rt.width / 20;
    this.height = this.width;
    this.isVisible = false;

    if (texture.isColor === true) {
      this.texture = texture.fill;
    } else {
      let image: HTMLImageElement = new Image();
      image.src = texture.fill;
      this.texture = image;
    }

    let yCalc = () => {
      let _row = row;
      if (_row > this.maxRows) _row = 1;

      let heightScala = rt.height / this.maxRows + 1;
      return heightScala * _row;
    };

    let XYCalc: Function;
    if (isLeft === true) {
      XYCalc = () => {
        this.x = rt.width / 4 + this.width / 2 - 20;
        this.y = yCalc();
      };
    } else {
      XYCalc = () => {
        this.x = rt.width / 4 + rt.width / 2 - this.width / 2 + 20;
        this.y = yCalc();
      };
    }

    XYCalc();
    this.onresize = () => {
      XYCalc();
      this.width = rt.width / 20;
      this.height = this.width;
    };
  }
}
class Menu extends rectObjectBase {
  private isOpened: boolean = false;
  constructor(rt: RenderTarget, texture: HTMLImageElement | string) {
    super(rt, texture);
    rt.addObject(this);
    this.layer = 2;

    this.x = rt.width / 2;
    this.y = rt.getHeight / 2;

    this.width = rt.width;
    this.height = rt.getHeight;
    this.onresize = () => {
      this.x = rt.width / 2;
      this.y = rt.getHeight / 2;

      this.width = rt.width;
      this.height = rt.getHeight;
    };
  }
  open() {
    this.isOpened = true;
    this.enable();
  }
  close() {
    this.isOpened = false;
    this.disable();
  }
  get getIsOpened() {
    return this.isOpened;
  }
}

export { Menu, MenuButton };
