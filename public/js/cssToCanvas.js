var CSSToCanavas = /** @class */ (function () {
    function CSSToCanavas() {
    }
    Object.defineProperty(CSSToCanavas.prototype, "set", {
        set: function (data) {
            this.data = data;
        },
        enumerable: false,
        configurable: true
    });
    CSSToCanavas.prototype.isCSS = function () {
        if (this.data.search(/linear-gradient\([^(]*(\([^)]*\)[^(]*)*[^)]*\)/gm) === -1) {
            return false;
        }
        return true;
    };
    CSSToCanavas.prototype.cssToCanvas = function () {
        var data = this.data;
        if (!this.isCSS()) {
            return [
                ['#FF0F7B', 0],
                ['#F89C2A', 1],
            ]; //! Error gradient
        }
        var points = [];
        data = data.replace(/(linear-gradient\()|(\);?$)/gm, '');
        points = data.split(/,(?!\d)/gm);
        if (points[0].search(/^\d{0,3}deg$/gm) !== -1) {
            points.splice(0, 1);
        }
        var pointsInfo = [];
        for (var i = 0; i < points.length; i += 1) {
            pointsInfo.push(points[i].replace(/^ /gm, '').split(' '));
            pointsInfo[i][1] = pointsInfo[i][1].replace('%', '');
            pointsInfo[i][1] = parseInt(pointsInfo[i][1]) / 100;
        }
        return pointsInfo;
    };
    Object.defineProperty(CSSToCanavas.prototype, "getInfo", {
        get: function () {
            if (!this.data)
                throw new Error('Data is not set');
            return this.cssToCanvas();
        },
        enumerable: false,
        configurable: true
    });
    return CSSToCanavas;
}());
export { CSSToCanavas as default };
//# sourceMappingURL=cssToCanvas.js.map