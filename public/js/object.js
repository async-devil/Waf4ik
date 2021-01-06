export class objectBase {
    //functions
    //constructor
    constructor(rt, texture = 'red') {
        //transform
        this.x = 0;
        this.y = 0;
        this.rot = 0;
        this.layer = 1;
        //events
        this.everyTick = () => { };
        this.onClick = (point) => { };
        this.onresize = () => { };
        //flags
        this.doOnClick = true;
        this.doEveryTick = true;
        this.isVisible = true;
        this.doOnResize = true;
        //render
        this.texture = 'red';
        this.rt = rt;
        this.texture = texture;
    }
    //getters
    get getRt() {
        return this.rt;
    }
    get getCtx() {
        return this.rt.getCTX;
    }
    degToRad(deg) {
        //convert deg to rad
        return (deg * Math.PI) / 180;
    }
    disable() {
        this.isVisible = false;
        this.doEveryTick = false;
        this.doOnClick = true;
        this.doOnResize = false;
    }
    enable() {
        this.isVisible = true;
        this.doEveryTick = true;
        this.doOnClick = true;
        this.doOnResize = true;
    }
}
export class roundObjectBase extends objectBase {
    constructor(rt, texture = 'red', radius = 100) {
        super(rt, texture);
        this.radius = 100;
        this.radius = radius;
    }
    isPointOnSprite(x1, y1) {
        if (this.dotDistSquare(x1, y1) <= this.radius * this.radius)
            return true;
        return false;
    }
    rotate(deltaRot) {
        this.rot += deltaRot;
    }
    //drawing sprite unrotated
    _draw(ctx, image) {
        if (image instanceof HTMLImageElement) {
            ctx.drawImage(image, this.x - this.radius, this.y - this.radius, this.radius * 2, this.radius * 2);
        }
        else {
            ctx.fillStyle = image;
            ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
            ctx.fill();
        }
    }
    dotDistSquare(dot1, dot2) {
        return Math.pow(dot1 - this.x, 2) + Math.pow(dot2 - this.y, 2);
    }
    draw() {
        let image = this.texture;
        let ctx = this.getCtx;
        //drawing spriteUnrotated
        if (this.rot == 0)
            this._draw(ctx, image);
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
    set onclick(fx) {
        this.onClick = (point) => {
            if (this.isPointOnSprite(point.x, point.y)) {
                fx();
            }
        };
    }
}
export class rectObjectBase extends objectBase {
    constructor() {
        super(...arguments);
        this.width = 100;
        this.height = 100;
    }
    //draws sprite unrotated
    _draw() {
        if (this.texture instanceof HTMLImageElement)
            this.getCtx.drawImage(this.texture, this.x - (this.width >> 1), this.y - (this.height >> 1), this.width, this.height);
        else {
            this.getCtx.fillStyle = this.texture;
            this.getCtx.fillRect(this.x - (this.width >> 1), this.y - (this.height >> 1), this.width, this.height);
        }
    }
    draw() {
        if (this.rot == 0) {
            this._draw();
        }
        else {
            this.getCtx.save();
            this.getCtx.translate(this.x, this.y);
            this.getCtx.rotate(this.degToRad(this.rot));
            this.getCtx.translate(-this.x, -this.y);
            this._draw();
            this.getCtx.restore();
        }
    }
    isPointOnSprite(x, y) {
        let x1 = this.x - (this.width >> 1);
        let y1 = this.y - (this.height >> 1);
        let x2 = this.x + (this.width >> 1);
        let y2 = this.y + (this.height >> 1);
        if (x >= x1 && x <= x2 && y >= y1 && y <= y2)
            return true;
        return false;
    }
    set onclick(fx) {
        this.onClick = (point) => {
            if (this.isPointOnSprite(point.x, point.y)) {
                fx();
            }
        };
    }
}
//# sourceMappingURL=object.js.map