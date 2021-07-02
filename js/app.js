const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

canvas.width = innerWidth;
canvas.height = innerHeight;

const x = canvas.width / 2;
const y = canvas.height / 2;

const player = new Player(x, y, 30, "blue");
player.draw();

const bullet = new Bullet(
  { x: 1, y: 1 },
  canvas.width / 2,
  canvas.height / 2,
  5,
  "red"
);

function animate() {
  requestAnimationFrame(animate);
  bullet.draw();
  bullet.update();
}
window.addEventListener("click", (e) => {});

animate();
