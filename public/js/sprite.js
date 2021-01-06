import { rectObjectBase } from './object.js';
import { roundObjectBase } from './object.js';
export class roundSprite extends roundObjectBase {
    constructor(rt, image) {
        super(rt, image);
        rt.addObject(this);
    }
    get getImg() {
        return this.texture;
    }
}
export class RectSprite extends rectObjectBase {
    constructor(rt, texture) {
        super(rt, texture);
        rt.addObject(this);
    }
    get getImg() {
        return this.texture;
    }
}
//# sourceMappingURL=sprite.js.map