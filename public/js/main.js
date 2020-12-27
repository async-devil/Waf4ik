//*---------------------------------------------Imports---------------------------------------------*/
//import { utilities } from './utilities.js';
import { RenderTarget } from './renderTarget.js';
import { roundSprite } from './sprite.js';
import { gradientGenerator } from './gradientGenerator.js';
import ParticlesPool from './particlesPool.js';
import { utilities } from './utilities.js';
import CONFIG from '../configs/config.js';
//*------------------------------------------------------------------------------------------*/
//* Creating renderTarget
var rnd = new RenderTarget(document, 'canvas', 'black');
//* Creating background gradient
var gradientGen = new gradientGenerator();
var gradient;
gradient = gradientGen.getGradient(rnd.getCTX);
rnd.backGround = gradient;
//*----------------------------------------Public variables--------------------------------------------------*/
var targetRotation = 0;
var waf4ikSize = utilities.getWaf4ikSize(rnd);
var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
var maxParticlesAmount = 5000;
var particlesOnClick = 50;
if (isMobile)
    maxParticlesAmount = 1000;
if (isMobile)
    particlesOnClick = 20;
//*---------------------------------------------Creating waf4ik---------------------------------------------*/
var waf4ikImg = new Image();
waf4ikImg.src = './img/1.png';
var waf4ik = new roundSprite(rnd, waf4ikImg, rnd.getWidth / 2, rnd.getHeight / 2, 0, waf4ikSize);
//*-----------------------------Creating particles pool and setting particles everyTick--------------------------------------------------*/
var prtcPool = new ParticlesPool();
for (var i = 0; i < maxParticlesAmount; i++) {
    prtcPool.addDefaultParticle(rnd, waf4ik, CONFIG.MAX_DISTANCE, utilities.getWaf4ikSize(rnd) / 20);
    var prtc = prtcPool.particlesArr[i];
    utilities.setParticleEveryTick(rnd, prtcPool, prtc);
}
//*---------------------------------------------Events---------------------------------------------*/
//?----------------------------------------OnResize--------------------------------------------------*/
window.onresize = function () {
    rnd.updateRND();
    var waf4ikSize = utilities.getWaf4ikSize(rnd);
    waf4ik.radius = waf4ikSize;
    waf4ik.x = rnd.getWidth / 2;
    waf4ik.y = rnd.getHeight / 2;
    rnd.backGround = gradientGen.getGradient(rnd.getCTX);
    prtcPool.updateParticles(rnd);
};
//?----------------------------------------OnClick--------------------------------------------------*/
window.onclick = function (point) {
    //?click on waf4ik
    if (waf4ik.isPointOnSprite(point.x, point.y)) {
        targetRotation += 10;
        for (var i = 0; i < particlesOnClick; i++) {
            //!amount of particles spawned every click is here
            var prtc = prtcPool.removeParticle();
            prtc.setDegree = utilities.getRandomArbitrary(CONFIG.MIN_DEGREES, CONFIG.MAX_DEGREES); //! Degrees change is here
        }
    }
};
//* Called every frame
rnd.onUpdate = function () {
    waf4ik.rotate(((targetRotation - waf4ik.rot / 10) * rnd.deltaTime) / 100);
};
//*---------------------------------------------Start game---------------------------------------------*/
waf4ikImg.onload = function () {
    rnd.startEveryTick();
};
//# sourceMappingURL=main.js.map