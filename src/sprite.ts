import { RenderTarget } from './renderTarget';
import { objectBase } from './object';
import { rectObjectBase } from './object';
import { roundObjectBase } from './object';

export class roundSprite extends roundObjectBase {
  constructor(rt: RenderTarget, image: HTMLImageElement | string) {
    super(rt, image);
    rt.addObject(this);
  }
  get getImg() {
    return this.texture;
  }
}

export class RectSprite extends rectObjectBase {
  constructor(rt: RenderTarget, texture: HTMLImageElement | string) {
    super(rt, texture);
    rt.addObject(this);
  }
  get getImg() {
    return this.texture;
  }
}
