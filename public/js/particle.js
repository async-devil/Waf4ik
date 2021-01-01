import { roundSprite } from './sprite.js';
import { utilities } from './utilities.js';
import CONFIG from '../configs/config.js';
var Particle = /** @class */ (function () {
    function Particle(rt, waf4ik, maxDistanceFromWaf4ik, radius, gravity) {
        if (maxDistanceFromWaf4ik === void 0) { maxDistanceFromWaf4ik = CONFIG.MAX_DISTANCE; }
        if (radius === void 0) { radius = 10; }
        if (gravity === void 0) { gravity = 10; }
        this.gravity = 0;
        this.rt = rt;
        this.waf4ik = waf4ik;
        this.radius = radius;
        this.particle = new roundSprite(rt, waf4ik.getImg, 0, 0, 0, radius);
        this.maxDistanceFromWaf4ik = maxDistanceFromWaf4ik;
        this.gravity = gravity;
        this.setRandomCoordinates();
    }
    Particle.prototype.setRandomCoordinates = function () {
        //?  pointX = x + distance * Math.cos(radians)
        //?  pointY = y + distance * Math.sin(radians)
        var distance = utilities.getRandomArbitrary(0, this.maxDistanceFromWaf4ik);
        var angle = utilities.getRandomArbitrary(0, 360);
        this.particle.x = this.waf4ik.x + distance * Math.cos(utilities.degreesToRadians(angle));
        this.particle.y = this.waf4ik.y + distance * Math.sin(utilities.degreesToRadians(angle));
    };
    Particle.prototype.moveDown = function () {
        this.setY = this.getY + this.gravity;
    };
    Particle.prototype.moveOnDegree = function () {
        var speed = 0;
        speed = (this.rt.deltaTime * this.gravity) / 16;
        var rad = utilities.degreesToRadians(this.deg);
        var changes = {
            x: speed * Math.cos(rad),
            y: speed * Math.sin(rad)
        };
        this.setX = this.getX + changes.x;
        this.setY = this.getY + changes.y;
    };
    Object.defineProperty(Particle.prototype, "bIsVisible", {
        get: function () {
            return this.particle.isVisible;
        },
        set: function (isVisible) {
            this.particle.isVisible = isVisible;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Particle.prototype, "setX", {
        set: function (x) {
            this.particle.x = x;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Particle.prototype, "setY", {
        set: function (y) {
            this.particle.y = y;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Particle.prototype, "setDegree", {
        set: function (deg) {
            this.deg = deg;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Particle.prototype, "getY", {
        get: function () {
            return this.particle.y;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Particle.prototype, "getX", {
        get: function () {
            return this.particle.x;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Particle.prototype, "bDoEveryTick", {
        get: function () {
            return this.particle.doEveryTick;
        },
        set: function (bDoEveryTick) {
            this.particle.doEveryTick = bDoEveryTick;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Particle.prototype, "everyTick", {
        set: function (fx) {
            this.particle.everyTick = fx;
        },
        enumerable: false,
        configurable: true
    });
    Particle.prototype.createRandXpoint = function () {
        var distance = utilities.getRandomArbitrary(0, this.maxDistanceFromWaf4ik);
        var angle = utilities.getRandomArbitrary(0, 360);
        return this.waf4ik.x + distance * Math.cos(utilities.degreesToRadians(angle));
    };
    Particle.prototype.createRandYpoint = function () {
        var distance = utilities.getRandomArbitrary(0, this.maxDistanceFromWaf4ik);
        var angle = utilities.getRandomArbitrary(0, 360);
        return this.waf4ik.y + distance * Math.sin(utilities.degreesToRadians(angle));
    };
    Object.defineProperty(Particle.prototype, "setRadius", {
        set: function (radius) {
            this.particle.radius = radius;
        },
        enumerable: false,
        configurable: true
    });
    return Particle;
}());
export { Particle as default };
//# sourceMappingURL=particle.js.map