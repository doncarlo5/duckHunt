class Game {
  constructor(gameScreenEl) {
    this.gameScreenEl = gameScreenEl;
    this.difficulty = 3;
  }

  startGame() {
    introSound.currentTime = 0;
    introSound.play();
    startPageSection.classList.add("hidden");
    this.score = 0;
    this.lives = 3;
    this.level = 1;
    this.ducksKilled = 0;
    this.intervalId = null;
    this.counter = 1;
    this.ducks = [];
    this.update();
    this.updateScore();
    this.updateLives();
    this.updateLevel();
  }

  menuLooseGame() {
    looseEl.style.display = "none";
    startPageSection.classList.remove("hidden");
  }

  menuWinGame() {
    winEl.style.display = "none";
    startPageSection.classList.remove("hidden");
  }

  rulesGame() {
    gameStartEl.classList.add("hidden");
    gameRules.style.display = "block";
  }

  backGame() {
    gameStartEl.classList.remove("hidden");
    gameRules.style.display = "none";
  }

  update() {
    this.intervalId = setInterval(() => {
      const randomFrequency = Math.floor(Math.random() * (250 - 50 + 1)) + 50;

      if (this.counter % randomFrequency === 0) {
        if (Math.random() > 0.5) {
          const duck = new Duck(this.gameScreenEl, this.difficulty);
          duck.element.addEventListener("click", () =>
            this.handleDuckClick(duck)
          );
          this.ducks.push(duck);
        } else {
          const duck = new BadDuck(this.gameScreenEl, this.difficulty);
          duck.element.addEventListener("click", () =>
            this.handleDuckClick(duck)
          );
          this.ducks.push(duck);
        }
        this.counter = 0;
      }
      this.counter++;
      for (const duck of this.ducks) {
        duck.move();
        this.checkOutDuck(duck);
      }
      if (this.ducksKilled === 3) {
        this.winGame();
      }
    }, 1000 / 60);
  }

  nextLevel() {
    clearInterval(this.intervalId);
    for (const duck of this.ducks) {
      duck.element.remove();
    }
    this.ducks = [];
    winEl.style.display = "none";
    this.difficulty = this.difficulty * 1.5;
    this.level++;
    this.updateScore();
    this.update();
    this.updateLevel();
    this.ducksKilled = 0;
  }

  winGame() {
    winSound.currentTime = 0;
    winSound.play();
    clearInterval(this.intervalId);
    winEl.style.display = "flex";
  }

  updateScore() {
    scoreEl.textContent = this.score;
  }

  updateLives() {
    livesEl.textContent = this.lives;
  }

  updateLevel() {
    levelNumberEl.textContent = `Level ${this.level} completed !`;
  }

  looseGame() {
    looseSound.currentTime = 0;
    looseSound.play();
    looseSound.volume = 0.5;
    clearInterval(this.intervalId);
    looseEl.style.display = "flex";
  }

  restartGame() {
    looseEl.style.display = "none";
    for (const duck of this.ducks) {
      duck.element.remove();
    }
    this.ducks = [];
    this.startGame();
    this.ducksKilled = 0;
  }

  handleDuckOutOfScreen() {
    this.lives--;
    this.updateLives();
    hurtSound.currentTime = 0;
    hurtSound.play();

    if (this.lives === 0) {
      this.looseGame();
    } else {
      this.gameScreenEl.parentElement.classList.add("blink");
      setTimeout(() => {
        this.gameScreenEl.parentElement.classList.remove("blink");
      }, 1000);
    }
  }

  handleBulletImpact(event) {
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

  handleDuckClick(duck) {
    this.handleShot();
    if (duck.isABadDuck) {
      this.handleBadDuckShot();
    } else {
      this.score += 10;
      this.ducksKilled++;
      this.updateScore();
    }
    duck.element.remove();
    const duckIndex = this.ducks.indexOf(duck);
    if (duckIndex !== -1) {
      this.ducks.splice(duckIndex, 1);
    }
  }

  handleBadDuckShot() {
    this.lives--;
    this.updateLives();
    hurtSound.currentTime = 0;
    hurtSound.play();
    if (this.lives === 0) {
      this.looseGame();
    } else {
      this.gameScreenEl.parentElement.classList.add("blink");
      setTimeout(() => {
        this.gameScreenEl.parentElement.classList.remove("blink");
      }, 1000);
    }
  }

  handleShot() {
    duckSound.currentTime = 0;
    duckSound.play();
  }

  checkOutDuck(duck) {
    const duckRect = duck.element.getBoundingClientRect();
    const screenRect = this.gameScreenEl.getBoundingClientRect();
    if (duckRect.left > screenRect.right && !duck.isABadDuck) {
      this.handleDuckOutOfScreen();
      duck.element.remove();
      this.ducks.shift();
    }
  }
}
