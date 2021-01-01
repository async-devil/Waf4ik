//*---------------------------------------------Imports---------------------------------------------*/
import { RenderTarget } from './renderTarget.js';
import { roundSprite } from './sprite.js';
import { RectSprite } from './sprite.js';
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
if (isMobile)
    maxParticlesAmount = 250;
var particlesOnClick = 50;
if (isMobile)
    particlesOnClick = 20;
var menuSize = rnd.getWidth / 3;
//*---------------------------------------------Creating waf4ik---------------------------------------------*/
var waf4ikImg = new Image();
waf4ikImg.src = './img/1.png';
var waf4ik = new roundSprite(rnd, waf4ikImg, rnd.getWidth / 2, rnd.getHeight / 2, 0, waf4ikSize);
//*----------------------------------------Creating ui--------------------------------------------------*/
var menuButtonImg = new Image();
menuButtonImg.src = './img/menu.png';
var openButton = new RectSprite(rnd, menuButtonImg);
openButton.width = rnd.getHeight / 20;
openButton.height = rnd.getHeight / 20;
openButton.x = rnd.getWidth - openButton.width;
openButton.y = openButton.height + 10;
openButton.layer = 3;
var closeButtonImg = new Image();
closeButtonImg.src = './img/close.png';
var closeButton = new RectSprite(rnd, closeButtonImg);
closeButton.width = rnd.getHeight / 20;
closeButton.height = rnd.getHeight / 20;
closeButton.x = rnd.getWidth - closeButton.width;
closeButton.y = closeButton.height + 10;
closeButton.isVisible = false;
closeButton.layer = 3;
var menu = new RectSprite(rnd, '#000b');
menu.height = rnd.getHeight;
menu.width = rnd.getWidth;
menu.isVisible = false;
menu.layer = 2;
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
rnd.onUpdate = function () {
    waf4ik.rotate(((targetRotation - waf4ik.rot / 10) * rnd.deltaTime) / 100);
};
//*---------------------------------------------Start game---------------------------------------------*/
waf4ikImg.onload = function () {
    rnd.startEveryTick();
};
//# sourceMappingURL=main.js.map