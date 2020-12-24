var roundSprite = /** @class */ (function () {
    function roundSprite(rt, //rendering context
    image, //image
    x, y, rot, // transform
    //width: number = 100,
    radius) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        if (rot === void 0) { rot = 0; }
        if (radius === void 0) { radius = 100; }
        this.everyTick = function () { }; //called everyFrame
        this.doEveryTick = true;
        this.rt = rt;
        this.ctx = rt.getCTX;
        this.image = image; //image
        this.x = x; //x center
        this.y = y; //y center
        this.rot = rot; //rotation
        this.radius = radius; //radius
        this.index = this.rt.addSprite(this);
    }
    roundSprite.prototype.degToRad = function (deg) {
        //convert deg to rad
        return (deg * Math.PI) / 180;
    };
    roundSprite.prototype.dotDistSquare = function (dot1, dot2) {
        return Math.pow(dot1 - this.x, 2) + Math.pow(dot2 - this.y, 2); // Do not touch this shit
    };
    //rotate sprite
    roundSprite.prototype.rotate = function (deg) {
        this.rot += deg;
    };
    Object.defineProperty(roundSprite.prototype, "getIndex", {
        get: function () {
            return this.index;
        },
        enumerable: false,
        configurable: true
    });
    roundSprite.prototype.destroy = function () {
        this.rt.removeSpreite(this.index);
    };
    Object.defineProperty(roundSprite.prototype, "getImg", {
        get: function () {
            return this.image;
        },
        enumerable: false,
        configurable: true
    });
    //draw sprite
    roundSprite.prototype.draw = function () {
        if (this.rot !== 0) {
            this.ctx.save();
            this.ctx.translate(this.x, this.y);
            this.ctx.rotate(this.degToRad(this.rot));
            this.ctx.translate(-this.x, -this.y);
            this.ctx.drawImage(this.image, this.x - this.radius, this.y - this.radius, this.radius * 2, this.radius * 2);
            this.ctx.restore();
        }
        else {
            this.ctx.drawImage(this.image, this.x - this.radius, this.y - this.radius, this.radius * 2, this.radius * 2);
        }
    };
    roundSprite.prototype.isPointOnSprite = function (x1, y1) {
        if (this.dotDistSquare(x1, y1) <= this.radius * this.radius)
            return true;
        return false;
    };
    return roundSprite;
}());
export { roundSprite };
//# sourceMappingURL=sprite.js.map