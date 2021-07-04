const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

canvas.width = innerWidth;
canvas.height = innerHeight;

const x = canvas.width / 2;
const y = canvas.height / 2;

const player = new Player(x, y, 10, "white");

const bullets = [];
const enemies = [];
const particles = [];

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
    const angle = Math.atan2(y - enemyY, x - enemyX);
    const speed = { x: Math.cos(angle), y: Math.sin(angle) };
    const color = `hsl(${Math.random() * 360}, 50%, 50%)`;
    enemies.push(new Enemy(speed, enemyX, enemyY, radius, color));
  }, 1000);
}

let animationId;

function animate() {
  animationId = requestAnimationFrame(animate);
  ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  player.draw();
  particles.forEach((particle, particleIndex) => {
    if (particle.alpha <= 0) {
      particles.splice(particleIndex, 1);
    } else {
      particle.update();
    }
  });
  bullets.forEach((bullet, bulletIndex) => {
    bullet.update();
    //remove from edges of screen
    if (
      bullet.x + bullet.radius < 0 ||
      bullet.x - bullet.radius > canvas.width ||
      bullet.y + bullet.radius < 0 ||
      bullet.y - bullet.radius > canvas.height
    ) {
      setTimeout(() => bullets.splice(bulletIndex, 1), 0);
    }
  });

  enemies.forEach((enemy, enemyIndex) => {
    enemy.update();

    // end game
    const distance = Math.hypot(player.x - enemy.x, player.y - enemy.y);
    if (distance - player.radius - enemy.radius < 1) {
      cancelAnimationFrame(animationId);
    }

    bullets.forEach((bullet, bulletIndex) => {
      const distance = Math.hypot(bullet.x - enemy.x, bullet.y - enemy.y);
      // when bullet touch enemy
      if (distance - bullet.radius - enemy.radius < 1) {
        // create explosions
        for (let i = 0; i < enemy.radius * 2; i++) {
          particles.push(
            new Particle(
              {
                x: (Math.random() - 0.5) * (Math.random() * 6),
                y: (Math.random() - 0.5) * (Math.random() * 6),
              },
              bullet.x,
              bullet.y,
              Math.random() * 2,
              enemy.color
            )
          );
        }
        if (enemy.radius - 10 > 8) {
          gsap.to(enemy, {
            radius: enemy.radius - 10,
          });
          setTimeout(() => {
            bullets.splice(bulletIndex, 1);
          }, 0);
        } else {
          setTimeout(() => {
            enemies.splice(enemyIndex, 1);
            bullets.splice(bulletIndex, 1);
          }, 0);
        }
      }
    });
  });
}
window.addEventListener("click", (e) => {
  const angle = Math.atan2(e.clientY - y, e.clientX - x);
  const speed = { x: Math.cos(angle) * 5, y: Math.sin(angle) * 5 };
  bullets.push(new Bullet(speed, x, y, 5, "white"));
});

animate();
spawnEnemies();
