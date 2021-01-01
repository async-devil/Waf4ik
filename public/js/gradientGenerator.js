import catalog from './gradientCatalog.js';
import CTC from './cssToCanvas.js';
var gradientGenerator = /** @class */ (function () {
    function gradientGenerator() {
        this.htmlElement = document.getElementsByTagName('html')[0];
        var length = this.getNumberOfObjectValues(catalog);
        this.randomArbitrary = this.getRandomArbitrary(0, length);
    }
    gradientGenerator.prototype.getScreenHeight = function () {
        return this.htmlElement.clientHeight;
    };
    gradientGenerator.prototype.getScreenWidth = function () {
        return this.htmlElement.clientWidth;
    };
    gradientGenerator.prototype.getRandomArbitrary = function (min, max) {
        var rand = min - 0.5 + Math.random() * (max - min);
        return Math.round(rand);
    };
    gradientGenerator.prototype.getNumberOfObjectValues = function (object) {
        var length = 0;
        for (var key in object) {
            if (object.hasOwnProperty(key)) {
                ++length;
            }
        }
        return length;
    };
    gradientGenerator.prototype.getGradient = function (ctx) {
        var _this = this;
        var gradient;
        var randNum = this.randomArbitrary;
        var objectKey = Object.keys(catalog)[randNum];
        var generateGradient = function () {
            gradient = ctx.createLinearGradient(0, 0, _this.getScreenWidth(), _this.getScreenHeight());
            var randomGradientChoice = function (choice, options) {
                if (!choice) {
                    if (!options.theme || !catalog[options.theme])
                        return catalog.lighty;
                    if (options.log === true)
                        console.log(catalog[options.theme]);
                    return catalog[options.theme];
                }
                if (options.log === true)
                    console.log(objectKey);
                return catalog[objectKey];
            };
            var choice = randomGradientChoice(true, { theme: '', log: true }); //! Static gradient choosing is here <-------------
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
    return gradientGenerator;
}());
export { gradientGenerator };
//# sourceMappingURL=gradientGenerator.js.map