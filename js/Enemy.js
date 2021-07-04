class Enemy extends Bullet {}

function spawnEnemies() {
  setInterval(() => {
    const radius = Math.random() * 24 + 6;
    let enemyX;
    let enemyY;
    if (Math.random() < 0.5) {
      enemyX = Math.random() < 0.5 ? 0 - radius : canvas.width + radius;
      enemyY = Math.random() * canvas.height;
    } else {
      enemyX = Math.random() * canvas.width;
      enemyY = Math.random() < 0.5 ? 0 - radius : canvas.height + radius;
    }
    const angle = Math.atan2(
      canvas.height / 2 - enemyY,
      canvas.width / 2 - enemyX
    );
    const speed = { x: Math.cos(angle), y: Math.sin(angle) };
    const color = `hsl(${Math.random() * 360}, 50%, 50%)`;
    enemies.push(new Enemy(speed, enemyX, enemyY, radius, color));
  }, 1000);
}
