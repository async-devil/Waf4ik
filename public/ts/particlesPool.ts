import { RenderTarget } from './renderTarget.js';
import Particle from './particle.js';
import { roundSprite } from './sprite.js';
import { utilities } from './utilities.js';
import CONFIG from '../configs/config.js';

class Params {
  doEveryTick: boolean;
  x: number;
  y: number;
  radius: number;
  isVisible: boolean;
}

class ParticlesPool {
  particlesArr: Particle[] = [];
  particlesParams: Params[] = [];

  addParticle(prtc: Particle) {
    // creating a copy of particles variable
    let params: Params = new Params();
    params.x = prtc.x;
    params.y = prtc.y;
    params.isVisible = prtc.isVisible;
    params.radius = prtc.radius;
    params.doEveryTick = prtc.doEveryTick;

    //disabling particle to store it in the pool
    prtc.isVisible = false;
    prtc.doEveryTick = false;

    //saving params and particle in the pool
    this.particlesParams.push(params);
    this.particlesArr.push(prtc);
  }
  removeParticle(): Particle {
    //getting first particle from the pool
    let prtc: Particle = this.particlesArr.shift();
    let params: Params = this.particlesParams.shift();

    //restoring variables of particle
    try {
      prtc.x = params.x;
      prtc.y = params.y;
      prtc.radius = params.radius;
      prtc.doEveryTick = params.doEveryTick;
      prtc.isVisible = params.isVisible;
      return prtc;
    } catch (e) {
      console.warn('Not enough particles in the pool');
      throw new Error('');
    }
  }
  destroyParticle() {
    this.particlesArr.shift();
    this.particlesParams.shift();
  }
  addDefaultParticle(
    rt: RenderTarget,
    waf4ik: roundSprite,
    maxDistanceFromWaf4ik: number = CONFIG.MAX_DISTANCE,
    radius: number = 10,
    gravity: number = CONFIG.PARTICLE_SPEED,
  ) {
    this.addParticle(new Particle(rt, waf4ik, maxDistanceFromWaf4ik, radius, gravity));
  }
  updateParticles(rnd: RenderTarget) {
    for (let i = 0; i < this.particlesArr.length; i++) {
      let value: Particle = this.particlesArr[i];
      this.particlesParams[i].x = value.createRandXpoint();
      this.particlesParams[i].y = value.createRandYpoint();
      this.particlesParams[i].radius = utilities.getWaf4ikSize(rnd) / 20;
    }
  }
  clear() {
    this.particlesArr = [];
    this.particlesParams = [];
  }
}

export { ParticlesPool as default };
