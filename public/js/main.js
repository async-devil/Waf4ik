//*---------------------------------------------Imports---------------------------------------------*/
import { RenderTarget } from './renderTarget.js';
import { roundSprite } from './sprite.js';
import { RectSprite } from './sprite.js';
import { gradientGenerator } from './gradientGenerator.js';
import ParticlesPool from './particlesPool.js';
import { utilities } from './utilities.js';
import CONFIG from '../configs/config.js';
import { Menu, MenuButton } from './menu.js';
import { Text } from './text.js';
//*------------------------------------------------------------------------------------------*/
//* Creating renderTarget
const rnd = new RenderTarget(document, 'canvas', 'black');
//* Creating background gradient
let gradientGen = new gradientGenerator();
let gradient;
gradient = gradientGen.getGradient(rnd.getCTX);
rnd.backGround = gradient;
//*----------------------------------------Public variables--------------------------------------------------*/
let rotationSpeed = 10;
let targetRotation = 0;
let waf4ikSize = utilities.getWaf4ikSize(rnd);
let isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
let maxParticlesAmount = 5000;
if (isMobile)
    maxParticlesAmount = 250;
let particlesOnClick = 50;
if (isMobile)
    particlesOnClick = 20;
let menuSize = rnd.width / 3;
//*---------------------------------------------Creating waf4ik---------------------------------------------*/
let waf4ikImg = new Image();
waf4ikImg.src = './img/1.png';
let waf4ik = new roundSprite(rnd, waf4ikImg);
waf4ik.x = rnd.width / 2;
waf4ik.y = rnd.height / 2;
waf4ik.radius = waf4ikSize;
//*----------------------------------------Creating ui--------------------------------------------------*/
let menuButtonImg = new Image();
menuButtonImg.src = './img/menu.png';
let openButton = new RectSprite(rnd, menuButtonImg);
openButton.width = rnd.height / 20;
openButton.height = rnd.height / 20;
openButton.x = rnd.width - openButton.width;
openButton.y = openButton.height + 10;
openButton.layer = 3;
let closeButtonImg = new Image();
closeButtonImg.src = './img/close.png';
let closeButton = new RectSprite(rnd, closeButtonImg);
closeButton.width = rnd.height / 20;
closeButton.height = rnd.height / 20;
closeButton.x = rnd.width - closeButton.width;
closeButton.y = closeButton.height + 10;
closeButton.disable();
closeButton.doOnResize = true;
closeButton.layer = 3;
let menu = new Menu(rnd, '#000b');
menu.x = rnd.width / 2;
menu.y = rnd.height / 2;
menu.height = rnd.height;
menu.width = rnd.width;
menu.isVisible = false;
menu.layer = 2;
let leftButton1 = new MenuButton(rnd, 1, true, {
    isColor: false,
    fill: '../img/minimum-speed.png',
});
leftButton1.onclick = () => {
    rotationSpeed -= 1.5;
    leftButton1.OnClick();
};
let rightButton1 = new MenuButton(rnd, 1, false, {
    isColor: false,
    fill: '../img/maximum-speed.png',
});
rightButton1.onclick = () => {
    rotationSpeed += 1.5;
    rightButton1.OnClick();
};
let leftButton2 = new MenuButton(rnd, 2, true, {
    isColor: false,
    fill: '../img/remove.png',
});
leftButton2.onclick = () => {
    leftButton2.OnClick();
    if (particlesOnClick > 0)
        particlesOnClick -= 1.5;
};
let rightButton2 = new MenuButton(rnd, 2, false, {
    isColor: false,
    fill: '../img/add.png',
});
rightButton2.onclick = () => {
    rightButton2.OnClick();
    particlesOnClick += 10;
};
let txt1 = new Text(rnd);
txt1.isVisible = false;
txt1.layer = 3;
txt1.text = 'Rotation speed';
txt1.x = rnd.width / 2;
txt1.y = leftButton1.y + 1;
txt1.height = leftButton1.height;
txt1.width = rnd.width - leftButton1.x * 2 - leftButton1.width - 10;
txt1.fontSize = rnd.width / 30;
let txt2 = new Text(rnd);
txt2.isVisible = false;
txt2.text = 'Particles amount';
txt2.layer = 3;
txt2.x = rnd.width >> 1;
txt2.y = leftButton2.y + 1;
txt2.height = leftButton1.height;
txt2.width = rnd.width - leftButton1.x * 2 - leftButton1.width - 10;
txt2.fontSize = rnd.width / 30;
//*-----------------------------Creating particles pool and setting particles everyTick--------------------------------------------------*/
let prtcPool = new ParticlesPool();
for (let i = 0; i < maxParticlesAmount; i++) {
    prtcPool.addDefaultParticle(rnd, waf4ik, CONFIG.MAX_DISTANCE, utilities.getWaf4ikSize(rnd) / 20);
    let prtc = prtcPool.particlesArr[i];
    utilities.setParticleEveryTick(rnd, prtcPool, prtc);
}
//*---------------------------------------------Events---------------------------------------------*/
waf4ik.onclick = () => {
    targetRotation += rotationSpeed;
    for (let i = 0; i < particlesOnClick; i++) {
        //!amount of particles spawned every click is here
        let prtc = prtcPool.removeParticle();
        prtc.deg = utilities.getRandomArbitrary(CONFIG.MIN_DEGREES, CONFIG.MAX_DEGREES);
    }
};
//?----------------------------------------OnResize--------------------------------------------------*/
waf4ik.onresize = () => {
    let waf4ikSize = utilities.getWaf4ikSize(rnd);
    waf4ik.radius = waf4ikSize;
    waf4ik.x = rnd.width / 2;
    waf4ik.y = rnd.height / 2;
};
openButton.onresize = () => {
    openButton.width = rnd.height / 20;
    openButton.height = rnd.height / 20;
    openButton.x = rnd.width - openButton.width;
    openButton.y = openButton.height + 10;
};
closeButton.onresize = () => {
    closeButton.width = rnd.height / 20;
    closeButton.height = rnd.height / 20;
    closeButton.x = rnd.width - closeButton.width;
    closeButton.y = closeButton.height + 10;
};
menu.onresize = () => {
    menu.x = rnd.width / 2;
    menu.y = rnd.height / 2;
    menu.height = rnd.height;
    menu.width = rnd.width;
};
rnd.onresize = () => {
    rnd.backGround = gradientGen.getGradient(rnd.getCTX);
    prtcPool.updateParticles(rnd);
};
txt1.onresize = () => {
    txt1.x = rnd.width / 2;
    txt1.y = leftButton1.y + 1;
    txt1.height = leftButton1.height;
    txt1.width = rnd.width - leftButton1.x * 2 - leftButton1.width - 10;
    txt1.fontSize = rnd.width / 30;
};
txt2.onresize = () => {
    txt2.x = rnd.width >> 1;
    txt2.y = leftButton2.y + 1;
    txt2.height = leftButton1.height;
    txt2.width = rnd.width - leftButton1.x * 2 - leftButton1.width - 10;
    txt2.fontSize = rnd.width / 30;
};
//?----------------------------------------OnClick--------------------------------------------------*/
rnd.onclick = (point) => {
    //?click on waf4ik
    //*----------------------------------------Menu on click--------------------------------------------------*/
    switch (openButton.isVisible) {
        case true:
            if (openButton.isPointOnSprite(point.x, point.y)) {
                console.log('Click detected');
                closeButton.isVisible = true;
                openButton.isVisible = false;
                menu.isVisible = true;
                leftButton1.isVisible = true;
                leftButton1.doOnClick = true;
                leftButton2.isVisible = true;
                leftButton2.doOnClick = true;
                rightButton1.isVisible = true;
                rightButton1.doOnClick = true;
                rightButton2.isVisible = true;
                rightButton2.doOnClick = true;
                txt1.isVisible = true;
                txt2.isVisible = true;
            }
            break;
        case false:
            if (closeButton.isPointOnSprite(point.x, point.y)) {
                closeButton.isVisible = false;
                openButton.isVisible = true;
                menu.isVisible = false;
                leftButton1.isVisible = false;
                leftButton1.doOnClick = false;
                leftButton2.isVisible = false;
                leftButton2.doOnClick = false;
                rightButton1.isVisible = false;
                rightButton1.doOnClick = false;
                rightButton2.isVisible = false;
                rightButton2.doOnClick = false;
                txt1.isVisible = false;
                txt2.isVisible = false;
            }
            break;
    }
};
//* Called every frame
rnd.onUpdate = () => {
    waf4ik.rotate(((targetRotation - waf4ik.rot / 10) * rnd.DeltaTime) / 100);
};
//*---------------------------------------------Start game---------------------------------------------*/
waf4ikImg.onload = () => {
    rnd.startGame();
};
//# sourceMappingURL=main.js.map