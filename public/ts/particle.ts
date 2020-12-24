import { roundSprite } from './sprite.js';
import { RenderTarget } from './renderTarget.js';
import { utilities } from './utilities.js';
import CONFIG from '../configs/config.js';

class Particle {
  public radius: number;
  public particle: roundSprite;
  public maxDistanceFromWaf4ik: number;
  public gravity: number = 0;
  public rt: RenderTarget;
  public deg: number;

  private waf4ik: roundSprite;

  constructor(
    rt: RenderTarget,
    waf4ik: roundSprite,
    maxDistanceFromWaf4ik: number = CONFIG.MAX_DISTANCE,
    radius: number = 10,
    gravity: number = 10,
  ) {
    this.rt = rt;
    this.waf4ik = waf4ik;
    this.radius = radius;
    this.particle = new roundSprite(rt, waf4ik.getImg, 0, 0, 0, radius);
    this.maxDistanceFromWaf4ik = maxDistanceFromWaf4ik;
    this.gravity = gravity;
    this.setRandomCoordinates();
  }

  public setRandomCoordinates() {
    //?  pointX = x + distance * Math.cos(radians)
    //?  pointY = y + distance * Math.sin(radians)

    let distance: number = utilities.getRandomArbitrary(0, this.maxDistanceFromWaf4ik);
    let angle: number = utilities.getRandomArbitrary(0, 360);
    this.particle.x = this.waf4ik.x + distance * Math.cos(utilities.degreesToRadians(angle));
    this.particle.y = this.waf4ik.y + distance * Math.sin(utilities.degreesToRadians(angle));
  }

  public moveDown() {
    this.setY = this.getY + this.gravity;
  }

  public moveOnDegree() {
    const rad = utilities.degreesToRadians(this.deg);
    const changes = {
      x: this.gravity * Math.cos(rad),
      y: this.gravity * Math.sin(rad),
    };

    this.setX = this.getX + changes.x;
    this.setY = this.getY + changes.y;
  }

  public set setX(x: number) {
    this.particle.x = x;
  }

  public set setY(y: number) {
    this.particle.y = y;
  }

  public set setDegree(deg: number) {
    this.deg = deg;
  }

  public get getY() {
    return this.particle.y;
  }

  public get getX() {
    return this.particle.x;
  }

  public set bDoEveryTick(bDoEveryTick) {
    this.particle.doEveryTick = bDoEveryTick;
  }

  public get bDoEveryTick() {
    return this.particle.doEveryTick;
  }
  public set everyTick(fx: Function) {
    this.particle.everyTick = fx;
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
  set setRadius(radius: number) {
    this.particle.radius = radius;
  }
}

export { Particle as default };
