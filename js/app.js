const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

canvas.width = innerWidth;
canvas.height = innerHeight;

const x = canvas.width / 2;
const y = canvas.height / 2;

const player = new Player(x, y, 30, "blue");
player.draw();

window.addEventListener("click", (e) => {
  const bullet = new Bullet(
    null,
    canvas.width / 2,
    canvas.height / 2,
    5,
    "red"
  );
  bullet.draw();
});
