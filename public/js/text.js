import canvasTxt from './canvasTXT.js';
import { objectBase } from './object.js';
export class Text extends objectBase {
    constructor(rt) {
        super(rt);
        this.text = 'default string';
        this.font = 'Arial';
        this.color = 'white';
        this.fontSize = 100;
        this.width = 100;
        this.height = 100;
        this.y = 0;
        rt.addObject(this);
    }
    draw() {
        canvasTxt.align = 'center';
        canvasTxt.justify = true;
        canvasTxt.vAlign = 'middle';
        canvasTxt.font = this.font;
        canvasTxt.fontSize = this.fontSize;
        this.getCtx.fillStyle = this.color;
        canvasTxt.drawText(this.getCtx, this.text, this.x - (this.width >> 1), this.y - this.height / 2, this.width, this.height);
    }
}
//# sourceMappingURL=text.js.map