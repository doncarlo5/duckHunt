const startButtonEl = document.getElementById("start-btn");
const restartButtonEl = document.getElementById("restart-btn");
const startPageSection = document.getElementById("start-page-section");
const gameScreenEl = document.getElementById("game-screen");
const gameInfoEl = document.getElementById("game-info");
const scoreEl = document.getElementById("score");
const livesEl = document.getElementById("lives");
const dialogEl = document.querySelector("dialog");
const fireSound = document.getElementById("fireSound");
const duckSound = document.getElementById("duckSound");
const endMsgEl = document.getElementById("end-msg");
const rulesButtonEl = document.getElementById("rules-btn");
const gameStartEl = document.getElementById("game-start");
const gameRules = document.getElementById("game-rules");
const backBtnEl = document.getElementById("back-btn");

let game = new Game(gameScreenEl);

startButtonEl.addEventListener("click", () => game.startGame());
restartButtonEl.addEventListener("click", () => game.restartGame());
rulesButtonEl.addEventListener("click", () => game.rulesGame());
backBtnEl.addEventListener("click", () => game.backGame());
gameScreenEl.addEventListener("click", (event) =>
  game.handleBulletImpact(event)
);