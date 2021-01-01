import { utilities } from './utilities.js';

const catalog = {
  //? https://uigradients.com

  fancyBlue: `linear-gradient( #21D4FD 0%, #B721FF 100%);`,
  slavaUkraini: `linear-gradient( #52ACFF 25%, #FFE32C 100%);`,
  lighty: `linear-gradient( #FFDEE9 0%, #B5FFFC 100%);`,
  mini: `linear-gradient(#30e8bf 0%, #ff8235 100%)`,
  pacific: `linear-gradient(#34e89e 0%, #0f3443 100%)`,
  honeyDew: `linear-gradient(#43c6ac 0%, #f8ffae 100%)`,
  radar: `linear-gradient(#a770ef 0%, #cf8bf3 50%, #fdb99b 100%)`,
  velvetSun: `linear-gradient(#e1eec3 0%, #f05053 100%)`,
  crimsonTide: `linear-gradient(#642b73 0%, #c6426e 100%)`,
  telegram: `linear-gradient(#1c92d2 0%, #f2fcfe 100%)`,
  relay: `linear-gradient(#3a1c71 0%, #d76d77 50%, #ffaf7b 100%)`,
  intuitivePurple: `linear-gradient(#da22ff 0%, #9733ee 100%)`,
  mojito: `linear-gradient(#1d976c 0%, #93f9b9 100%)`,
  boraBora: `linear-gradient(#2bc0e4 0%, #eaecc6 100%)`,
  dania: `linear-gradient(#be93c5 0%, #7bc6cc 100%)`,
  blackRose: `linear-gradient(#f4c4f3 0%, #fc67fa 100%)`,
  r1: 'linear-gradient(#f6b5d1 0%, #c8d8bf 50%, #de573e 100%)',
  r3: 'linear-gradient(#10a599 0%, #50a451 50%, #fce095 100%)',
  r5: 'linear-gradient(#621e41 0%, #ae39cf 50%, #0acdd3 100%)',
  r6: 'linear-gradient(#94df92 0%, #d77bf4 50%, #95555a 100%)',
  r7: 'linear-gradient(#de7a7c 0%, #b61ef1 50%, #4c40bf 100%)',
  r8: 'linear-gradient(#8646c7 0%, #29e4ac 100%)',
  r10: 'linear-gradient(#268406 0%, #1b897e 50%, #37f4b1 100%)',
  r11: 'linear-gradient(#9f5bf3 0%, #e65dad 50%, #d2a370 100%)',
  r12: 'linear-gradient(#0ac8e6 0%, #abd41f 50%, #fbae10 100%)',
  r13: 'linear-gradient(#9ea303 0%, #69be06 50%, #f38831 100%)',
};

// const generate = () => {
//   let hexSymb = ['a', 'b', 'c', 'd', 'e', 'f', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
//   const generateHEXcolor = () => {
//     let rGrad = [];
//     for (let i = 0; i < 6; i += 1) {
//       rGrad.push(hexSymb[utilities.getRandomArbitrary(0, hexSymb.length)]);
//     }
//     let result = rGrad.join('');
//     return result;
//   };
//   catalog[
//     `random`
//   ] = `linear-gradient(#${generateHEXcolor()} 0%, #${generateHEXcolor()} 50%, #${generateHEXcolor()} 100%)`;
// };

export { catalog as default };
