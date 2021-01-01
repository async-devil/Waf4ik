//*---------------------------------------------Imports---------------------------------------------*/
import { RenderTarget } from './renderTarget.js';
import { roundSprite } from './sprite.js';
import { RectSprite } from './sprite.js';
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
let isMobile: boolean = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
let maxParticlesAmount: number = 5000;
if (isMobile) maxParticlesAmount = 250;
let particlesOnClick: number = 50;
if (isMobile) particlesOnClick = 20;
let menuSize: number = rnd.getWidth / 3;
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

//*----------------------------------------Creating ui--------------------------------------------------*/
let menuButtonImg: HTMLImageElement = new Image();
menuButtonImg.src = './img/menu.png';
let openButton: RectSprite = new RectSprite(rnd, menuButtonImg);

openButton.width = rnd.getHeight / 20;
openButton.height = rnd.getHeight / 20;

openButton.x = rnd.getWidth - openButton.width;
openButton.y = openButton.height + 10;
openButton.layer = 3;

let closeButtonImg: HTMLImageElement = new Image();
closeButtonImg.src = './img/close.png';
let closeButton: RectSprite = new RectSprite(rnd, closeButtonImg);
closeButton.width = rnd.getHeight / 20;
closeButton.height = rnd.getHeight / 20;

closeButton.x = rnd.getWidth - closeButton.width;
closeButton.y = closeButton.height + 10;
closeButton.isVisible = false;
closeButton.layer = 3;

let menu: RectSprite = new RectSprite(rnd, '#000b');
menu.height = rnd.getHeight;
menu.width = rnd.getWidth;
menu.isVisible = false;
menu.layer = 2;
//*-----------------------------Creating particles pool and setting particles everyTick--------------------------------------------------*/

let prtcPool: ParticlesPool = new ParticlesPool();
for (let i = 0; i < maxParticlesAmount; i++) {
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

  openButton.width = rnd.getHeight / 20;
  openButton.height = rnd.getHeight / 20;

  openButton.x = rnd.getWidth - openButton.width;
  openButton.y = openButton.height + 10;

  closeButton.width = rnd.getHeight / 20;
  closeButton.height = rnd.getHeight / 20;

  closeButton.x = rnd.getWidth - closeButton.width;
  closeButton.y = closeButton.height + 10;

  menu.height = rnd.getHeight;
  menu.width = rnd.getWidth;
};

//?----------------------------------------OnClick--------------------------------------------------*/
window.onclick = (point) => {
  //?click on waf4ik
  if (waf4ik.isPointOnSprite(point.x, point.y)) {
    targetRotation += 10;
    for (let i = 0; i < particlesOnClick; i++) {
      //!amount of particles spawned every click is here
      let prtc: Particle = prtcPool.removeParticle();
      prtc.setDegree = utilities.getRandomArbitrary(CONFIG.MIN_DEGREES, CONFIG.MAX_DEGREES); //! Degrees change is here
    }
  }
  //*----------------------------------------Menu on click--------------------------------------------------*/

  switch (openButton.isVisible) {
    case true:
      if (openButton.isPointOnSprite(point.x, point.y) && openButton.isVisible) {
        console.log('Click detected');
        closeButton.isVisible = true;
        openButton.isVisible = false;
        menu.isVisible = true;
      }
      break;

    case false:
      if (closeButton.isPointOnSprite(point.x, point.y)) {
        closeButton.isVisible = false;
        openButton.isVisible = true;
        menu.isVisible = false;
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
