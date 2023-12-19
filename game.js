class Game {
  constructor(gameScreenEl) {
    this.gameScreenEl = gameScreenEl;
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
      if (this.counter % 180 === 0) {
        const duck = new Duck(this.gameScreenEl);
        duck.element.addEventListener("click", () =>
          this.handleDuckClick(duck)
        );
        this.ducks.push(duck);
        this.counter = 0;
      }
      this.counter++;
      for (const duck of this.ducks) {
        console.log(this.gameScreenEl.style.width);
        duck.move();
        this.checkOutDuck(duck);
      }
      if (this.score === 30) {
        this.endGame();
      }
    }, 1000 / 60);
  }

  updateScore() {
    scoreEl.textContent = this.score;
  }

  updateLives() {
    livesEl.textContent = this.lives;
  }

  endGame() {
    clearInterval(this.intervalId);
    dialogEl.showModal();
  }

  gameOver() {
    clearInterval(this.intervalId);
    dialogEl.showModal();
  }

  handleDuckOutOfScreen() {
    this.lives--;
    this.updateLives();

    if (this.lives === 0) {
      console.log(this.ducks);
      this.gameOver();
    } else {
      this.gameScreenEl.parentElement.classList.add("blink");
      setTimeout(() => {
        this.gameScreenEl.parentElement.classList.remove("blink");
      }, 1000);
    }
  }

  handleDuckClick(duck) {
    duck.quack();
    this.score += 10;
    this.updateScore();
    duck.element.remove();
    const duckIndex = this.ducks.indexOf(duck);
    if (duckIndex !== -1) {
      this.ducks.splice(duckIndex, 1);
    }
    this.displayCapturedDuck();
    setTimeout(() => {
      duck.element.remove();
      this.hideCapturedDuck();
    }, 500);
  }

  checkOutDuck(duck) {
    const duckRect = duck.element.getBoundingClientRect();
    const screenRect = this.gameScreenEl.getBoundingClientRect();
    if (duckRect.left > screenRect.right) {
      this.handleDuckOutOfScreen();
      duck.element.remove();
      this.ducks.shift();
    }
  }

  displayCapturedDuck() {
    debugger;
    const capturedDuckImage = document.getElementById("capturedDuck");
    capturedDuckImage.style.display = "block";
  }

  hideCapturedDuck() {
    const capturedDuckImage = document.getElementById("capturedDuck");
    capturedDuckImage.style.display = "none";
  }
}
