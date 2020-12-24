import Particle from './particle.js';
import { utilities } from './utilities.js';
import CONFIG from '../configs/config.js';
var Params = /** @class */ (function () {
    function Params() {
    }
    return Params;
}());
var ParticlesPool = /** @class */ (function () {
    function ParticlesPool() {
        this.particlesArr = [];
        this.particlesParams = [];
    }
    ParticlesPool.prototype.addParticle = function (prtc) {
        // creating a copy of particles variable
        var params = new Params();
        params.x = prtc.getX;
        params.y = prtc.getY;
        params.radius = prtc.particle.radius;
        params.doEveryTick = prtc.bDoEveryTick;
        //disabling particle to store it in the pool
        prtc.setX = 100;
        prtc.setY = -100000;
        prtc.bDoEveryTick = false;
        //saving params and particle in the pool
        this.particlesParams.push(params);
        this.particlesArr.push(prtc);
    };
    ParticlesPool.prototype.removeParticle = function () {
        //getting first particle from the pool
        var prtc = this.particlesArr.shift();
        var params = this.particlesParams.shift();
        //restoring variables of particle
        try {
            prtc.setX = params.x;
            prtc.setY = params.y;
            prtc.particle.radius = params.radius;
            prtc.bDoEveryTick = params.doEveryTick;
            return prtc;
        }
        catch (e) {
            console.warn('Not enough particles in the pool');
            throw new Error('');
        }
    };
    ParticlesPool.prototype.destroyParticle = function () {
        this.particlesArr.shift();
        this.particlesParams.shift();
    };
    ParticlesPool.prototype.addDefaultParticle = function (rt, waf4ik, maxDistanceFromWaf4ik, radius, gravity) {
        if (maxDistanceFromWaf4ik === void 0) { maxDistanceFromWaf4ik = CONFIG.MAX_DISTANCE; }
        if (radius === void 0) { radius = 10; }
        if (gravity === void 0) { gravity = CONFIG.PARTICLE_SPEED; }
        this.addParticle(new Particle(rt, waf4ik, maxDistanceFromWaf4ik, radius, gravity));
    };
    ParticlesPool.prototype.updateParticles = function (rnd) {
        for (var i = 0; i < this.particlesArr.length; i++) {
            var value = this.particlesArr[i];
            this.particlesParams[i].x = value.createRandXpoint();
            this.particlesParams[i].y = value.createRandYpoint();
            this.particlesParams[i].radius = utilities.getWaf4ikSize(rnd) / 20;
        }
    };
    ParticlesPool.prototype.clear = function () {
        this.particlesArr = [];
        this.particlesParams = [];
    };
    return ParticlesPool;
}());
export { ParticlesPool as default };
//# sourceMappingURL=particlesPool.js.map