import catalog from './gradientCatalog.js';
import CTC from './cssToCanvas.js';
var utilities = /** @class */ (function () {
    function utilities() {
    }
    utilities.getWaf4ikSize = function (rnd) {
        var smallestSize = 0;
        if (rnd.getHeight < rnd.getWidth)
            smallestSize = rnd.getHeight;
        else
            smallestSize = rnd.getWidth;
        return smallestSize / 4;
    };
    utilities.setParticleEveryTick = function (rnd, prtcPool, prtc) {
        prtc.everyTick = function () {
            prtc.moveOnDegree();
            if (prtc.getY > rnd.getHeight + 300) {
                prtc.setRandomCoordinates();
                prtcPool.addParticle(prtc);
            }
            if (prtc.getX > rnd.getWidth + 300) {
                prtc.setRandomCoordinates();
                prtcPool.addParticle(prtc);
            }
            if (prtc.getX < -300) {
                prtc.setRandomCoordinates();
                prtcPool.addParticle(prtc);
            }
        };
    };
    utilities.getScreenHeigt = function () {
        return this.htmlElement.clientHeight;
    };
    utilities.getScreenWidth = function () {
        return this.htmlElement.clientWidth;
    };
    utilities.degreesToRadians = function (degrees) {
        return (Math.PI / 180) * degrees;
    };
    utilities.getNumberOfObjectValues = function (object) {
        var length = 0;
        for (var key in object) {
            if (object.hasOwnProperty(key)) {
                ++length;
            }
        }
        return length;
    };
    utilities.getRandomArbitrary = function (min, max) {
        ///111111
        var rand = min - 0.5 + Math.random() * (max - min);
        return Math.round(rand);
    };
    utilities.getGradient = function (ctx) {
        var _this = this;
        var gradient;
        var length = this.getNumberOfObjectValues(catalog);
        var randNum = this.getRandomArbitrary(0, length); /////////////////////////////////////////////////////
        var objectKey = Object.keys(catalog)[randNum]; /////////////////////////////////////////11111111111111111111111111
        var generateGradient = function () {
            gradient = ctx.createLinearGradient(0, 0, _this.getScreenWidth(), _this.getScreenHeigt());
            var randomGradientChoice = function (choice, options) {
                if (!choice) {
                    if (!options.theme || !catalog[options.theme])
                        return catalog.lighty;
                    return catalog[options.theme];
                }
                return catalog[objectKey];
            };
            var choice = randomGradientChoice(true, { log: true, theme: '' }); //! Static gradient choosing is here <-------------
            var ctc = new CTC();
            ctc.set = choice;
            var list = ctc.getInfo;
            for (var i = 0; i < list.length; i += 1) {
                gradient.addColorStop(list[i][1], list[i][0]);
            }
        };
        generateGradient();
        return gradient;
    };
    utilities.htmlElement = document.getElementsByTagName('html')[0];
    return utilities;
}());
export { utilities };
//# sourceMappingURL=utilities.js.map