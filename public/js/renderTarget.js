var RenderTarget = /** @class */ (function () {
    function RenderTarget(document, canvasName, backGround) {
        if (canvasName === void 0) { canvasName = '0'; }
        if (backGround === void 0) { backGround = 'white'; }
        this.newProperty = this;
        this.canvas = document.getElementById(canvasName);
        this.ctx = this.canvas.getContext('2d');
        this.htmlElement = document.getElementsByTagName('html')[0];
        this.height = this.htmlElement.clientHeight;
        this.width = this.htmlElement.clientWidth;
        this.canvas.height = this.height;
        this.canvas.width = this.width;
        this.backGround = backGround;
        this.spriteArr = [];
    }
    RenderTarget.prototype.addSprite = function (sprite) {
        return this.spriteArr.push(sprite);
    };
    RenderTarget.prototype.updateSize = function () {
        this.height = this.htmlElement.clientHeight;
        this.width = this.htmlElement.clientWidth;
        this.canvas.height = this.height;
        this.canvas.width = this.width;
    };
    RenderTarget.prototype.updateRND = function () {
        this.updateSize();
        this.ctx.fillStyle = this.backGround;
        this.ctx.fillRect(0, 0, this.width, this.height);
    };
    Object.defineProperty(RenderTarget.prototype, "getCTX", {
        get: function () {
            return this.ctx;
        },
        enumerable: false,
        configurable: true
    });
    RenderTarget.prototype.getSprite = function (index) {
        return this.spriteArr[index];
    };
    Object.defineProperty(RenderTarget.prototype, "getHeight", {
        get: function () {
            return this.height;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RenderTarget.prototype, "getWidth", {
        get: function () {
            return this.width;
        },
        enumerable: false,
        configurable: true
    });
    RenderTarget.prototype.drawLayer = function (index) {
        for (var i = this.spriteArr.length; i > 0; i--) {
            var value = this.spriteArr[i - 1];
            if (value.layer == index) {
                if (value.doEveryTick)
                    value.everyTick.call(1);
                if (value.isVisible)
                    value.draw();
            }
        }
    };
    RenderTarget.prototype.startEveryTick = function () {
        var _this = this;
        this.time2 = this.time1;
        this.time1 = performance.now();
        this.deltaTime = -1 * (this.time2 - this.time1) || 0;
        this.updateRND();
        this.drawLayer(1);
        this.drawLayer(2);
        this.drawLayer(3);
        this.onUpdate();
        window.requestAnimationFrame(function () { return _this.startEveryTick(); });
    };
    return RenderTarget;
}());
export { RenderTarget };
//# sourceMappingURL=renderTarget.js.map