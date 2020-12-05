export default class FlipCard {
  constructor(word, translate, image, isTrain) {
    this.card = document.createElement('div');
    this.card.classList.add('flip-card');
    if (!isTrain) this.card.classList.add('play');
    const front = document.createElement('div');
    front.classList.add('front', 'card');
    let imgContainer = document.createElement('div');
    imgContainer.classList.add('image__container');
    imgContainer.style.backgroundImage = `url(${image})`;
    front.appendChild(imgContainer);
    this.card.appendChild(front);

    let container = document.createElement('div');
    container.classList.add('card__container');
    let text = document.createElement('h4');
    text.innerHTML = word;
    container.appendChild(text);
    const icon = document.createElement('i');
    icon.classList.add('material-icons', 'icon-loop');
    icon.innerHTML = 'loop';
    container.appendChild(icon);
    front.appendChild(container);

    const back = document.createElement('div');
    back.classList.add('back', 'card');
    imgContainer = document.createElement('div');
    imgContainer.classList.add('image__container');
    imgContainer.style.backgroundImage = `url(${image})`;
    back.appendChild(imgContainer);
    container = document.createElement('div');
    container.classList.add('card__container');
    text = document.createElement('h4');
    text.innerHTML = translate;
    container.appendChild(text);
    back.appendChild(container);
    back.classList.add('back');
    this.card.appendChild(back);

    icon.addEventListener('click', (e) => {
      e.stopPropagation();
      e.target.closest('.flip-card').classList.add('flipH');
    });

    this.card.addEventListener('mouseleave', (e) => {
      e.target.closest('.flip-card').classList.remove('flipH');
    });

    const overlay = document.createElement('div');
    overlay.classList.add('overlay');
    this.card.appendChild(overlay);
  }

  getElement() {
    return this.card;
  }
}
