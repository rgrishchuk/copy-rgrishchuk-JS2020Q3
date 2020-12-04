export default class Card {
  constructor(title, image) {
    this.card = document.createElement('div');
    this.card.classList.add('card');
    const img = new Image();
    img.src = image;
    this.card.appendChild(img);
    const container = document.createElement('div');
    container.classList.add('card__container');
    const text = document.createElement('h4');
    text.innerHTML = title;
    container.appendChild(text);
    this.card.appendChild(container);
  }

  getElement() {
    return this.card;
  }
}
