var roundSprite = /** @class */ (function () {
    function roundSprite(rt, //rendering context
    image, //image
    x, //center x
    y, //center y
    rot, // transform
    radius) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        if (rot === void 0) { rot = 0; }
        if (radius === void 0) { radius = 100; }
        this.isVisible = true; // is visible
        this.everyTick = function () { }; //called everyFrame
        this.doEveryTick = true;
        this.doOnClic = false;
        this.layer = 1;
        this.onClick = function () { };
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
        return Math.pow(dot1 - this.x, 2) + Math.pow(dot2 - this.y, 2);
    };
    //rotate sprite
    roundSprite.prototype.rotate = function (deg) {
        this.rot += deg;
    };
    roundSprite.prototype.moveLeft = function (dist) {
        this.x - +dist;
    };
    roundSprite.prototype.moveRight = function (dist) {
        this.x += dist;
    };
    Object.defineProperty(roundSprite.prototype, "getIndex", {
        get: function () {
            return this.index;
        },
        enumerable: false,
        configurable: true
    });
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
var RectSprite = /** @class */ (function () {
    function RectSprite(rt, //rendering context
    image, //image
    x, //x center
    y, //y center
    rot, // transform
    //width: number = 100,
    height, //height
    width) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        if (rot === void 0) { rot = 0; }
        if (height === void 0) { height = 100; }
        if (width === void 0) { width = 100; }
        this.layer = 1;
        this.isVisible = true; // is visible
        this.height = 0;
        this.width = 0;
        //public radius: number; //radius
        this.everyTick = function () { }; //called everyFrame
        this.doEveryTick = true;
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
    RectSprite.prototype.degToRad = function (deg) {
        //convert deg to rad
        return (deg * Math.PI) / 180;
    };
    RectSprite.prototype.dotDistSquare = function (dot1, dot2) {
        return Math.pow(dot1 - this.x, 2) + Math.pow(dot2 - this.y, 2);
    };
    RectSprite.prototype.draw = function () {
        if (this.rot !== 0) {
            this.ctx.save();
            this.ctx.translate(this.x, this.y);
            this.ctx.rotate(this.degToRad(this.rot));
            this.ctx.translate(-this.x, -this.y);
            //drawing sprite
            if (this.image instanceof HTMLImageElement)
                this.ctx.drawImage(this.image, this.x - this.width, this.y - this.height, this.width * 2, this.height * 2);
            else {
                this.ctx.fillStyle = this.image;
                this.ctx.fillRect(this.x - this.width / 2, this.y - this.height / 2, this.width, this.height);
            }
            //end drawing
            this.ctx.restore();
        }
        else {
            if (this.image instanceof HTMLImageElement)
                this.ctx.drawImage(this.image, this.x - this.width / 2, this.y - this.height / 2, this.width, this.height);
            else {
                this.ctx.fillStyle = this.image;
                this.ctx.fillRect(this.x - this.width, this.y - this.height, this.width * 2, this.height * 2);
            }
        }
    };
    RectSprite.prototype.moveLeft = function (dist) {
        this.x -= dist;
    };
    RectSprite.prototype.moveRight = function (dist) {
        this.x += dist;
    };
    //rotate sprite
    RectSprite.prototype.rotate = function (deg) {
        this.rot += deg;
    };
    Object.defineProperty(RectSprite.prototype, "getIndex", {
        get: function () {
            return this.index;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RectSprite.prototype, "getImg", {
        get: function () {
            return this.image;
        },
        enumerable: false,
        configurable: true
    });
    //draw sprite
    RectSprite.prototype.isPointOnSprite = function (x, y) {
        var x1 = this.x - this.width / 2;
        var y1 = this.y - this.height / 2;
        var x2 = this.x + this.width / 2;
        var y2 = this.y + this.height / 2;
        if (x >= x1 && x <= x2 && y >= y1 && y <= y2)
            return true;
        return false;
    };
    return RectSprite;
}());
export { RectSprite };
//# sourceMappingURL=sprite.js.map