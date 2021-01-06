import { utilities } from './utilities.js';
import CONFIG from '../configs/config.js';
import { roundObjectBase } from './object.js';
class Particle extends roundObjectBase {
    constructor(rt, waf4ik, maxDistanceFromWaf4ik = CONFIG.MAX_DISTANCE, radius = 10, gravity = 10) {
        super(rt, waf4ik.getImg);
        rt.addObject(this);
        this.waf4ik = waf4ik;
        this.radius = radius;
        this.radius = radius;
        this.maxDistanceFromWaf4ik = maxDistanceFromWaf4ik;
        this.gravity = gravity;
        this.setRandomCoordinates();
    }
    setRandomCoordinates() {
        let distance = utilities.getRandomArbitrary(0, this.maxDistanceFromWaf4ik);
        let angle = utilities.getRandomArbitrary(0, 360);
        this.x = this.waf4ik.x + distance * Math.cos(utilities.degreesToRadians(angle));
        this.y = this.waf4ik.y + distance * Math.sin(utilities.degreesToRadians(angle));
    }
    moveDown() {
        this.y = this.y + this.gravity;
    }
    moveOnDegree() {
        let speed = 0;
        speed = (this.getRt.DeltaTime * this.gravity) / 16;
        const rad = utilities.degreesToRadians(this.deg);
        const changes = {
            x: speed * Math.cos(rad),
            y: speed * Math.sin(rad),
        };
        this.x = this.x + changes.x;
        this.y = this.y + changes.y;
    }
    createRandXpoint() {
        let distance = utilities.getRandomArbitrary(0, this.maxDistanceFromWaf4ik);
        let angle = utilities.getRandomArbitrary(0, 360);
        return this.waf4ik.x + distance * Math.cos(utilities.degreesToRadians(angle));
    }
    createRandYpoint() {
        let distance = utilities.getRandomArbitrary(0, this.maxDistanceFromWaf4ik);
        let angle = utilities.getRandomArbitrary(0, 360);
        return this.waf4ik.y + distance * Math.sin(utilities.degreesToRadians(angle));
    }
}
export { Particle as default };
//# sourceMappingURL=particle.js.map