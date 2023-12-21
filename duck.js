class Duck {
  constructor(gameScreenEl, velocity) {
    this.gameScreenEl = gameScreenEl;
    this.x = -50;
    this.y = 100;
    this.velocity = velocity;
    this.width = 20;
    this.height = 20;
    this.element = document.createElement("img");
    this.element.src = "./img/duck-img.gif";
    this.element.style.position = "absolute";
    this.element.style.width = `${this.width}vh`;
    this.element.style.height = `${this.height}vh`;
    this.element.style.left = `${this.x}px`;
    this.element.draggable = false;
    this.element.classList.add("goodDuck");
    this.gameScreenEl.append(this.element);
    this.type = "duck";
  }

  move() {
    this.x += this.velocity;
    this.updatePosition();
  }

  updatePosition() {
    this.element.style.left = `${this.x}px`;
  }
}

class BadDuck extends Duck {
  constructor(gameScreenEl, velocity) {
    super(gameScreenEl, velocity);
    this.element.src = "./img/duck-red.gif";
    this.element.classList.add("badDuck");
    this.isABadDuck = true;
  }
}
