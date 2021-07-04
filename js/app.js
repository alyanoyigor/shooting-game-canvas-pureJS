

window.addEventListener("click", (e) => {
  const angle = Math.atan2(
    e.clientY - canvas.height / 2,
    e.clientX - canvas.width / 2
  );
  const speed = { x: Math.cos(angle) * 5, y: Math.sin(angle) * 5 };
  bullets.push(
    new Bullet(speed, canvas.width / 2, canvas.height / 2, 5, "white")
  );
});

startGameButton.addEventListener("click", () => {
  init();
  animate();
  spawnEnemies();
  modalEl.style.display = "none";
});
