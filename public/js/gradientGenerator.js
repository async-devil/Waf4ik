import catalog from './gradientCatalog.js';
import CTC from './cssToCanvas.js';
export class gradientGenerator {
    constructor() {
        this.htmlElement = document.getElementsByTagName('html')[0];
        const length = this.getNumberOfObjectValues(catalog);
        this.randomArbitrary = this.getRandomArbitrary(0, length);
    }
    getScreenHeight() {
        return this.htmlElement.clientHeight;
    }
    getScreenWidth() {
        return this.htmlElement.clientWidth;
    }
    getRandomArbitrary(min, max) {
        let rand = min - 0.5 + Math.random() * (max - min);
        return Math.round(rand);
    }
    getNumberOfObjectValues(object) {
        var length = 0;
        for (var key in object) {
            if (object.hasOwnProperty(key)) {
                ++length;
            }
        }
        return length;
    }
    getGradient(ctx) {
        let gradient;
        const randNum = this.randomArbitrary;
        const objectKey = Object.keys(catalog)[randNum];
        const generateGradient = () => {
            gradient = ctx.createLinearGradient(0, 0, this.getScreenWidth(), this.getScreenHeight());
            const randomGradientChoice = (choice, options) => {
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
            const choice = randomGradientChoice(true, { theme: '', log: true }); //! Static gradient choosing is here <-------------
            const ctc = new CTC();
            ctc.set = choice;
            const list = ctc.getInfo;
            for (let i = 0; i < list.length; i += 1) {
                gradient.addColorStop(list[i][1], list[i][0]);
            }
        };
        generateGradient();
        return gradient;
    }
}
//# sourceMappingURL=gradientGenerator.js.map