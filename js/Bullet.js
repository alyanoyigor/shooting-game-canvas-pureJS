class Bullet extends Player {
  constructor(speed, ...args) {
    super(...args);
    this.speed = speed;
  }
  update() {
    this.draw();
    this.x += this.speed.x;
    this.y += this.speed.y;
  }
}
