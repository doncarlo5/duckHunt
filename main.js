const startButtonEl = document.getElementById("start-btn");
const restartButtonEl = document.getElementById("restart-btn");
const startPageSection = document.getElementById("start-page-section");
const gameScreenEl = document.getElementById("game-screen");
const gameInfoEl = document.getElementById("game-info");
const scoreEl = document.getElementById("score");
const livesEl = document.getElementById("lives");
const gameOverEl = document.getElementById("game-over");
const dialogEl = document.querySelector("dialog");
const fireSound = document.getElementById("fireSound");

let game;
let score = 0;
let lives = 3;

startButtonEl.addEventListener("click", startGame);
restartButtonEl.addEventListener("click", restartGame);
gameScreenEl.addEventListener("click", handleBulletImpact);

function startGame() {
  startPageSection.classList.add("hidden");
  game = new Game(gameScreenEl);
}

function restartGame() {
  score = 0;
  dialogEl.close();
  startGame();
}

function endGame() {
  dialogElement.showModal();
}

function handleBulletImpact(event) {
  fireSound.currentTime = 0;
  fireSound.play();
  const bulletImpact = document.createElement("img");
  bulletImpact.classList.add("bullet");
  bulletImpact.src = "./img/bullet-hole.png";
  bulletImpact.style.left = `${event.x - gameScreenEl.offsetLeft - 20}px`;
  bulletImpact.style.top = `${event.y - gameScreenEl.offsetTop - 20}px`;
  gameScreenEl.appendChild(bulletImpact);

  setTimeout(() => {
    bulletImpact.remove();
  }, 500);
}
