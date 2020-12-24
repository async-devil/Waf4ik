import catalog from './gradientCatalog.js';
import CTC from './cssToCanvas.js';

export class gradientGenerator {
  readonly htmlElement: HTMLHtmlElement = document.getElementsByTagName('html')[0];
  private getScreenHeight(): number {
    return this.htmlElement.clientHeight;
  }

  private getScreenWidth(): number {
    return this.htmlElement.clientWidth;
  }
  private randomArbitrary: number;
  getRandomArbitrary(min: number, max: number): number {
    let rand = min - 0.5 + Math.random() * (max - min);
    return Math.round(rand);
  }
  constructor() {
    const length = this.getNumberOfObjectValues(catalog);
    this.randomArbitrary = this.getRandomArbitrary(0, length);
  }

  getNumberOfObjectValues(object: object): number {
    var length = 0;
    for (var key in object) {
      if (object.hasOwnProperty(key)) {
        ++length;
      }
    }
    return length;
  }

  getGradient(ctx: CanvasRenderingContext2D) {
    let gradient: CanvasGradient;
    const randNum = this.randomArbitrary;
    const objectKey = Object.keys(catalog)[randNum];

    const generateGradient = () => {
      gradient = ctx.createLinearGradient(0, 0, this.getScreenWidth(), this.getScreenHeight());

      const randomGradientChoice = (choice: boolean, options?: any) => {
        if (!choice) {
          if (!options.theme || !catalog[options.theme]) return catalog.lighty;
          if (options.log === true) console.log(options[options.theme]);

          return catalog[options.theme];
        }
        if (options.log === true) console.log(objectKey);
        return catalog[objectKey];
      };

      const choice = randomGradientChoice(true, { theme: ' ', log: true }); //! Static gradient choosing is here <-------------

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
