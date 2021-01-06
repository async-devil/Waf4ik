import { roundSprite } from './sprite.js';
import { RenderTarget } from './renderTarget.js';
import { utilities } from './utilities.js';
import CONFIG from '../configs/config.js';
import { roundObjectBase } from './object.js';

class Particle extends roundObjectBase {
  private waf4ik: roundSprite;
  private maxDistanceFromWaf4ik: number;
  private gravity: number;
  public deg;
  constructor(
    rt: RenderTarget,
    waf4ik: roundSprite,
    maxDistanceFromWaf4ik: number = CONFIG.MAX_DISTANCE,
    radius: number = 10,
    gravity: number = 10,
  ) {
    super(rt, waf4ik.getImg);
    rt.addObject(this);
    this.waf4ik = waf4ik;
    this.radius = radius;
    this.radius = radius;
    this.maxDistanceFromWaf4ik = maxDistanceFromWaf4ik;
    this.gravity = gravity;
    this.setRandomCoordinates();
  }
  public setRandomCoordinates() {
    let distance: number = utilities.getRandomArbitrary(0, this.maxDistanceFromWaf4ik);
    let angle: number = utilities.getRandomArbitrary(0, 360);
    this.x = this.waf4ik.x + distance * Math.cos(utilities.degreesToRadians(angle));
    this.y = this.waf4ik.y + distance * Math.sin(utilities.degreesToRadians(angle));
  }
  public moveDown() {
    this.y = this.y + this.gravity;
  }

  public moveOnDegree() {
    let speed: number = 0;
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
    let distance: number = utilities.getRandomArbitrary(0, this.maxDistanceFromWaf4ik);
    let angle: number = utilities.getRandomArbitrary(0, 360);
    return this.waf4ik.x + distance * Math.cos(utilities.degreesToRadians(angle));
  }
  createRandYpoint() {
    let distance: number = utilities.getRandomArbitrary(0, this.maxDistanceFromWaf4ik);
    let angle: number = utilities.getRandomArbitrary(0, 360);
    return this.waf4ik.y + distance * Math.sin(utilities.degreesToRadians(angle));
  }
}
export { Particle as default };
