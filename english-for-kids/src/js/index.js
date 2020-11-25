import categories from './categories';

function createCard(name, image) {
  const card = document.createElement('div');
  card.classList.add('card');
  const img = new Image();
  img.src = image;
  card.appendChild(img);
  const container = document.createElement('div');
  container.classList.add('card__container');
  const text = document.createElement('h4');
  text.innerHTML = name;
  container.appendChild(text);
  card.appendChild(container);
  return card;
}

const main = document.querySelector('.main .wrapper .main__container');

function createMain() {
  Object.keys(categories).forEach((category) => {
    const img = `assets/images/${categories[category].words[0].image}`;
    const cardHTML = createCard(category, img);
    main.appendChild(cardHTML);
  });
}

createMain();

const burgerList = document.querySelector('.burger-menu__list');
function createBurgerMenu() {
  Object.keys(categories).forEach((category) => {
    const burgerListItem = document.createElement('li');
    burgerListItem.innerHTML = category;
    burgerList.appendChild(burgerListItem);
  });
  const stat = document.createElement('li');
  stat.innerHTML = 'Statistics';
  burgerList.appendChild(stat);
}

function showBurgerMenu() {
  document.querySelector('.blackout').classList.toggle('active');
  document.querySelector('.burger').classList.toggle('active');
  document.querySelector('.burger-menu').classList.toggle('active');
}

createBurgerMenu();
const burger = document.querySelector('.burger');
burger.addEventListener('click', () => { showBurgerMenu(); });
document.querySelector('.blackout').addEventListener('click', () => {
  showBurgerMenu();
});
