import catalog from './gradientCatalog.js';
import CTC from './cssToCanvas.js';
export class utilities {
    static getWaf4ikSize(rnd) {
        let smallestSize = 0;
        if (rnd.getHeight < rnd.width)
            smallestSize = rnd.getHeight;
        else
            smallestSize = rnd.width;
        return smallestSize / 4;
    }
    static setParticleEveryTick(rnd, prtcPool, prtc) {
        prtc.everyTick = () => {
            prtc.moveOnDegree();
            if (prtc.y > rnd.getHeight + 300) {
                prtc.setRandomCoordinates();
                prtcPool.addParticle(prtc);
            }
            if (prtc.x > rnd.width + 300) {
                prtc.setRandomCoordinates();
                prtcPool.addParticle(prtc);
            }
            if (prtc.x < -300) {
                prtc.setRandomCoordinates();
                prtcPool.addParticle(prtc);
            }
        };
    }
    static getScreenHeigt() {
        return this.htmlElement.clientHeight;
    }
    static getScreenWidth() {
        return this.htmlElement.clientWidth;
    }
    static degreesToRadians(degrees) {
        return (Math.PI / 180) * degrees;
    }
    static getNumberOfObjectValues(object) {
        var length = 0;
        for (var key in object) {
            if (object.hasOwnProperty(key)) {
                ++length;
            }
        }
        return length;
    }
    static getRandomArbitrary(min, max) {
        let rand = min - 0.5 + Math.random() * (max - min);
        return Math.round(rand);
    }
    static getGradient(ctx) {
        let gradient;
        const length = this.getNumberOfObjectValues(catalog);
        const randNum = this.getRandomArbitrary(0, length);
        const objectKey = Object.keys(catalog)[randNum];
        const generateGradient = () => {
            gradient = ctx.createLinearGradient(0, 0, this.getScreenWidth(), this.getScreenHeigt());
            const randomGradientChoice = (choice, options) => {
                if (!choice) {
                    if (!options.theme || !catalog[options.theme])
                        return catalog.lighty;
                    return catalog[options.theme];
                }
                return catalog[objectKey];
            };
            const choice = randomGradientChoice(true, { log: true, theme: '' }); //! Static gradient choosing is here <-------------
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
utilities.htmlElement = document.getElementsByTagName('html')[0];
//# sourceMappingURL=utilities.js.map