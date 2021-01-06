import catalog from './gradientCatalog.js';
import CTC from './cssToCanvas.js';
import Particle from './particle.js';
import ParticlesPool from './particlesPool.js';
import { RenderTarget } from './renderTarget.js';
export class utilities {
  static readonly htmlElement: HTMLHtmlElement = document.getElementsByTagName('html')[0];
  static getWaf4ikSize(rnd: RenderTarget) {
    let smallestSize: number = 0;
    if (rnd.getHeight < rnd.width) smallestSize = rnd.getHeight;
    else smallestSize = rnd.width;
    return smallestSize / 4;
  }
  static setParticleEveryTick(rnd: RenderTarget, prtcPool: ParticlesPool, prtc: Particle) {
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
  static getScreenHeigt(): number {
    return this.htmlElement.clientHeight;
  }

  static getScreenWidth(): number {
    return this.htmlElement.clientWidth;
  }

  static degreesToRadians(degrees): number {
    return (Math.PI / 180) * degrees;
  }

  static getNumberOfObjectValues(object: object): number {
    var length = 0;
    for (var key in object) {
      if (object.hasOwnProperty(key)) {
        ++length;
      }
    }
    return length;
  }

  static getRandomArbitrary(min: number, max: number): number {
    let rand = min - 0.5 + Math.random() * (max - min);
    return Math.round(rand);
  }
  static getGradient(ctx: CanvasRenderingContext2D) {
    let gradient: CanvasGradient;
    const length = this.getNumberOfObjectValues(catalog);
    const randNum = this.getRandomArbitrary(0, length);
    const objectKey = Object.keys(catalog)[randNum];

    const generateGradient = () => {
      gradient = ctx.createLinearGradient(0, 0, this.getScreenWidth(), this.getScreenHeigt());
      interface options {
        log?: boolean;
        theme?: string;
      }
      const randomGradientChoice = (choice: boolean, options?: options) => {
        if (!choice) {
          if (!options.theme || !catalog[options.theme]) return catalog.lighty;
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
