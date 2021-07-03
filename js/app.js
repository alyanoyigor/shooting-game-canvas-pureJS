const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

canvas.width = innerWidth;
canvas.height = innerHeight;

const x = canvas.width / 2;
const y = canvas.height / 2;

const player = new Player(x, y, 30, "blue");

const bullets = [];
const enemies = [];

function spawnEnemies() {
  setInterval(() => {
    const enemyX = Math.random() * canvas.width;
    const enemyY = Math.random() * canvas.height;
    const angle = Math.atan2(y - enemyY, x - enemyX);
    const speed = { x: Math.cos(angle), y: Math.sin(angle) };
    enemies.push(new Enemy(speed, enemyX, enemyY, 30, "green"));
  }, 1000);
}

function animate() {
  requestAnimationFrame(animate);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  player.draw();
  bullets.forEach((b) => b.update());
  enemies.forEach((e) => e.update());
}
window.addEventListener("click", (e) => {
  const angle = Math.atan2(e.clientY - y, e.clientX - x);
  const speed = { x: Math.cos(angle), y: Math.sin(angle) };
  bullets.push(new Bullet(speed, x, y, 5, "red"));
});

animate();
spawnEnemies();
