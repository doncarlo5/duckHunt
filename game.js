class Game {
  constructor(gameScreenEl) {
    this.gameScreenEl = gameScreenEl;
  }

  startGame() {
    startPageSection.classList.add("hidden");
    this.score = 0;
    this.lives = 3;
    this.intervalId = null;
    this.counter = 1;
    this.ducks = [];
    this.update();
    this.updateScore();
    this.updateLives();
  }

  update() {
    this.intervalId = setInterval(() => {
      if (this.counter % 280 === 0) {
        if (Math.random() > 0.5) {
          const duck = new Duck(this.gameScreenEl);
          duck.element.addEventListener("click", () =>
            this.handleDuckClick(duck)
          );
          this.ducks.push(duck);
        } else {
          const duck = new BadDuck(this.gameScreenEl);
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
      if (this.score === 30) {
        this.endGame("You win!");
      }
    }, 1000 / 60);
  }

  updateScore() {
    scoreEl.textContent = this.score;
  }

  updateLives() {
    livesEl.textContent = this.lives;
  }

  endGame(message) {
    clearInterval(this.intervalId);
    endMsgEl.textContent = message;
    dialogEl.showModal();
  }

  restartGame() {
    dialogEl.close();
    for (const duck of this.ducks) {
      duck.element.remove();
    }
    this.ducks = [];
    this.startGame();
  }

  handleDuckOutOfScreen() {
    this.lives--;
    this.updateLives();

    if (this.lives === 0) {
      this.endGame("You lose!");
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
    if (this.lives === 0) {
      this.endGame("You lose!");
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
