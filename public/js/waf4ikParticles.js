import { utilities } from './utilities.js';
var Waf4ikPartials = /** @class */ (function () {
    function Waf4ikPartials(renderingContext, transformParams) {
        if (transformParams === void 0) { transformParams = { rotation: 0, radius: 0 }; }
        this.renderingContext = renderingContext;
        this.transformParams = transformParams;
    }
    Object.defineProperty(Waf4ikPartials.prototype, "MainWaf4ikCoordinates", {
        set: function (coordinates) {
            this.mainWaf4ikCoordinates = coordinates;
        },
        enumerable: false,
        configurable: true
    });
    Waf4ikPartials.prototype.getPointsBasedOnDistanceAndAngle = function (distance, angle) {
        this.ParticleCoordinates = {
            /*
              ?   pointX = x + distance * Math.cos(radians)
              ?   pointY = y + distance * Math.sin(radians)
            */
            x: this.mainWaf4ikCoordinates.x + distance * Math.cos(utilities.degreesToRadians(angle)),
            y: this.mainWaf4ikCoordinates.x + distance * Math.sin(utilities.degreesToRadians(angle))
        };
    };
    Object.defineProperty(Waf4ikPartials.prototype, "particleKillY", {
        set: function (killY) {
            this.killY = killY;
        },
        enumerable: false,
        configurable: true
    });
    Waf4ikPartials.prototype.moveYParticleController = function () {
        var moveParticle = 
        //^ If y > killY then go down, else up
        this.ParticleCoordinates.y > this.killY ? this.moveParticleDown : this.moveParticleUp;
        return {
            coordinates: moveParticle(this.killY),
            renderingContext: this.renderingContext,
            transformParam: this.transformParams
        };
    };
    Waf4ikPartials.prototype.moveParticleDown = function (killY) {
        this.ParticleCoordinates.y -= 1;
        if (this.ParticleCoordinates.y === killY)
            return 'kill';
        return this.ParticleCoordinates;
    };
    Waf4ikPartials.prototype.moveParticleUp = function (killY) {
        this.ParticleCoordinates.y += 1;
        if (this.ParticleCoordinates.y === killY)
            return 'kill';
        return this.ParticleCoordinates;
    };
    return Waf4ikPartials;
}());
export { Waf4ikPartials as default };
//# sourceMappingURL=waf4ikParticles.js.map