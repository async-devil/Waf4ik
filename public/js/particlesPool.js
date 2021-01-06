import Particle from './particle.js';
import { utilities } from './utilities.js';
import CONFIG from '../configs/config.js';
class Params {
}
class ParticlesPool {
    constructor() {
        this.particlesArr = [];
        this.particlesParams = [];
    }
    addParticle(prtc) {
        // creating a copy of particles variable
        let params = new Params();
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
    removeParticle() {
        //getting first particle from the pool
        let prtc = this.particlesArr.shift();
        let params = this.particlesParams.shift();
        //restoring variables of particle
        try {
            prtc.x = params.x;
            prtc.y = params.y;
            prtc.radius = params.radius;
            prtc.doEveryTick = params.doEveryTick;
            prtc.isVisible = params.isVisible;
            return prtc;
        }
        catch (e) {
            console.warn('Not enough particles in the pool');
            throw new Error('');
        }
    }
    destroyParticle() {
        this.particlesArr.shift();
        this.particlesParams.shift();
    }
    addDefaultParticle(rt, waf4ik, maxDistanceFromWaf4ik = CONFIG.MAX_DISTANCE, radius = 10, gravity = CONFIG.PARTICLE_SPEED) {
        this.addParticle(new Particle(rt, waf4ik, maxDistanceFromWaf4ik, radius, gravity));
    }
    updateParticles(rnd) {
        for (let i = 0; i < this.particlesArr.length; i++) {
            let value = this.particlesArr[i];
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
//# sourceMappingURL=particlesPool.js.map