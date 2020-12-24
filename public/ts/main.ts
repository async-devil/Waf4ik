//*---------------------------------------------Imports---------------------------------------------*/
//import { utilities } from './utilities.js';
import { RenderTarget } from './renderTarget.js';
import { roundSprite } from './sprite.js';
import { gradientGenerator } from './gradientGenerator.js';
import Particle from './particle.js';
import ParticlesPool from './particlesPool.js';
import { utilities } from './utilities.js';
import CONFIG from '../configs/config.js';
//*------------------------------------------------------------------------------------------*/

//* Creating renderTarget
const rnd = new RenderTarget(document, 'canvas', 'black');

//* Creating background gradient
let gradientGen: gradientGenerator = new gradientGenerator();
let gradient: CanvasGradient;
gradient = gradientGen.getGradient(rnd.getCTX);
rnd.backGround = gradient;

//*----------------------------------------Public variables--------------------------------------------------*/

let targetRotation: number = 0;
let waf4ikSize: number = utilities.getWaf4ikSize(rnd);

//*---------------------------------------------Creating waf4ik---------------------------------------------*/

let waf4ikImg: HTMLImageElement = new Image();
waf4ikImg.src = './img/1.png';

let waf4ik: roundSprite = new roundSprite(
  rnd,
  waf4ikImg,
  rnd.getWidth / 2,
  rnd.getHeight / 2,
  0,
  waf4ikSize,
);

//*-----------------------------Creating particles pool and setting particles everyTick--------------------------------------------------*/

let prtcPool: ParticlesPool = new ParticlesPool();
for (let i = 0; i < 5000; i++) {
  prtcPool.addDefaultParticle(rnd, waf4ik, CONFIG.MAX_DISTANCE, utilities.getWaf4ikSize(rnd) / 20);

  let prtc = prtcPool.particlesArr[i];
  utilities.setParticleEveryTick(rnd, prtcPool, prtc);
}

//*---------------------------------------------Events---------------------------------------------*/

//?----------------------------------------OnResize--------------------------------------------------*/
window.onresize = function () {
  rnd.updateRND();

  let waf4ikSize: number = utilities.getWaf4ikSize(rnd);
  waf4ik.radius = waf4ikSize;

  waf4ik.x = rnd.getWidth / 2;
  waf4ik.y = rnd.getHeight / 2;

  rnd.backGround = gradientGen.getGradient(rnd.getCTX);
  prtcPool.updateParticles(rnd);
};

//?----------------------------------------OnClick--------------------------------------------------*/
window.onclick = (point) => {
  //?click on waf4ik
  if (waf4ik.isPointOnSprite(point.x, point.y)) {
    targetRotation += 10;
    for (let i = 0; i < 50; i++) {
      //!amount of particles spawned every click is here
      let prtc: Particle = prtcPool.removeParticle();
      prtc.setDegree = utilities.getRandomArbitrary(CONFIG.MIN_DEGREES, CONFIG.MAX_DEGREES); //! Degrees change is here
    }
  }
};
//* Called every frame
rnd.onUpdate = () => {
  waf4ik.rotate(((targetRotation - waf4ik.rot / 10) * rnd.deltaTime) / 100);
};

//*---------------------------------------------Start game---------------------------------------------*/
waf4ikImg.onload = () => {
  rnd.startEveryTick();
};
