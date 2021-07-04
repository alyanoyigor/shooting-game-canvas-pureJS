class Particle extends Enemy {
  constructor(...args) {
    super(...args);
    this.alpha = 0.8;
  }
  draw() {
    ctx.save();
    ctx.globalAlpha = this.alpha;
    super.draw();
    ctx.restore();
  }
  update() {
    this.speed.x *= 0.99;
    this.speed.y *= 0.99;
    super.update();
    this.alpha -= 0.01;
  }
}
