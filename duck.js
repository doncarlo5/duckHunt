const duckSound = document.getElementById("duckSound");

class Duck {
  constructor(gameScreenEl) {
    this.gameScreenEl = gameScreenEl;
    this.x = -50;
    this.y = 100;
    this.width = 100;
    this.height = 100;
    this.element = document.createElement("img");
    this.element.src = "./img/duck-img.gif";
    this.element.style.position = "absolute";
    this.element.style.width = `${this.width}px`;
    this.element.style.height = `${this.height}px`;
    this.element.style.left = `${this.x}px`;
    this.element.draggable = false;
    this.element.classList.add("duck");
    this.gameScreenEl.append(this.element);
  }

  move() {
    this.x += 2;
    this.updatePosition();
  }

  updatePosition() {
    this.element.style.left = `${this.x}px`;
  }

  quack() {
    duckSound.currentTime = 0;
    duckSound.play();
  }
}
