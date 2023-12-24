const startButtonEl = document.getElementById("start-btn");
const tryAgainBtnEl = document.getElementById("tryAgain-btn");
const nextLevelBtnEl = document.getElementById("nextLevel-btn");
const startPageSection = document.getElementById("start-page-section");
const gameScreenEl = document.getElementById("game-screen");
const gameInfoEl = document.getElementById("game-info");
const scoreEl = document.getElementById("score");
const livesEl = document.getElementById("lives");
const looseEl = document.getElementById("loose-end");
const winEl = document.getElementById("win-end");
const fireSound = document.getElementById("fireSound");
const duckSound = document.getElementById("duckSound");
const buttonSound = document.getElementById("buttonSound");
const rulesButtonEl = document.getElementById("rules-btn");
const gameStartEl = document.getElementById("game-start");
const gameRules = document.getElementById("game-rules");
const backBtnEl = document.getElementById("back-btn");
const menuLooseBtn = document.getElementById("menuLoose-btn");
const menuWinBtn = document.getElementById("menuWin-btn");
const levelNumberEl = document.getElementById("levelNumber");
const buttonsEl = document.querySelectorAll("button");
const hurtSound = document.getElementById("hurtSound");
const introSound = document.getElementById("introSound");
const looseSound = document.getElementById("looseSound");
const winSound = document.getElementById("winSound");
const muteButton = document.getElementById("mute-button");
const allSounds = document.querySelectorAll("audio");

let game = new Game(gameScreenEl);

startButtonEl.addEventListener("click", () => game.startGame());
tryAgainBtnEl.addEventListener("click", () => game.restartGame());
nextLevelBtnEl.addEventListener("click", () => game.nextLevel());
rulesButtonEl.addEventListener("click", () => game.rulesGame());
backBtnEl.addEventListener("click", () => game.backGame());
menuLooseBtn.addEventListener("click", () => game.menuLooseGame());
menuWinBtn.addEventListener("click", () => game.menuWinGame());
gameScreenEl.addEventListener("click", (event) =>
  game.handleBulletImpact(event)
);
muteButton.addEventListener("click", toggleMute);

buttonsEl.forEach((button) => {
  button.addEventListener("click", () => {
    buttonSound.currentTime = 0;
    buttonSound.play();
  });
});

function toggleMute() {
  allSounds.forEach((sound) => {
    sound.muted = !sound.muted;
  });
  muteButton.textContent = allSounds[0].muted ? "🔇" : "🔈";
}

toggleMute();
toggleMute();
