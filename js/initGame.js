const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const scoreEl = document.querySelector("#score-element");
const startGameButton = document.querySelector("#start-game-button");
const modalEl = document.querySelector("#modal-element");
const endScoreEl = document.querySelector("#end-score-element");

canvas.width = innerWidth;
canvas.height = innerHeight;

let bullets = [];
let enemies = [];
let particles = [];

let animationId;
let score = 0;

function init() {
  player = new Player(canvas.width / 2, canvas.height / 2, 10, "white");
  bullets = [];
  enemies = [];
  particles = [];
  score = 0;
  scoreEl.innerHTML = score;
  endScoreEl.innerHTML = score;
}
