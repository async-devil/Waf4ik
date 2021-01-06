import { RenderTarget } from './renderTarget.js';
import { objectBase } from './object.js';
import { rectObjectBase } from './object.js';
import { roundObjectBase } from './object.js';

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
