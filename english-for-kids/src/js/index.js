import categories from './categories';

let activeMenu = null;
let isTrain = true;

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

function voiceWord(word) {
  const audio = document.querySelector('.voice');
  audio.src = `assets/audio/${word}.mp3`;
  audio.play();
}

function createFlipCard(word, translate, image) {
  const card = document.createElement('div');
  card.classList.add('flip-card');

  const front = document.createElement('div');
  front.classList.add('front', 'card');
  let img = new Image();
  img.src = image;
  front.appendChild(img);
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
  img = new Image();
  img.src = image;
  back.appendChild(img);
  container = document.createElement('div');
  container.classList.add('card__container');
  text = document.createElement('h4');
  text.innerHTML = translate;
  container.appendChild(text);
  back.appendChild(container);
  back.classList.add('back');

  card.appendChild(front);
  card.appendChild(back);

  icon.addEventListener('click', (e) => {
    e.stopPropagation();
    e.target.closest('.flip-card').classList.add('flipH');
  });

  card.addEventListener('mouseleave', (e) => {
    e.target.closest('.flip-card').classList.remove('flipH');
  });

  front.addEventListener('click', (e) => {
    voiceWord(e.target.closest('.front').querySelector('h4').innerHTML);
  });
  return card;
}

const main = document.querySelector('.main .wrapper .main__container');
function clearMain() {
  while (main.lastElementChild) {
    main.removeChild(main.lastElementChild);
  }
}

function isActiveBurger() {
  return document.querySelector('.burger-menu.active');
}

function showBurgerMenu() {
  document.querySelector('.blackout').classList.toggle('active');
  document.querySelector('.burger').classList.toggle('active');
  document.querySelector('.burger-menu').classList.toggle('active');
}

function findMenuItem(name) {
  const listItems = document.querySelectorAll('.burger-menu__list li');
  for (let i = 0; i < listItems.length; i += 1) {
    if (listItems[i].innerHTML === name) {
      return listItems[i];
    }
  }
  return null;
}

function showCategory(category) {
  if (category !== activeMenu) {
    document.querySelector('li.active').classList.remove('active');
    const newActiveMenu = findMenuItem(category);
    if (newActiveMenu) newActiveMenu.classList.add('active');
    activeMenu = category;
    clearMain();
    const wordArr = categories[category].words;
    wordArr.forEach((item) => {
      const img = `assets/images/${item.image}`;
      const card = createFlipCard(item.word, item.translation, img);
      main.appendChild(card);
    });
  }
  if (isActiveBurger()) showBurgerMenu();
}

function showMain() {
  if (activeMenu !== 'Main') {
    document.querySelector('li.active').classList.remove('active');
    document.querySelector('.mainPage').classList.add('active');
    activeMenu = 'Main';
    clearMain();
    Object.keys(categories).forEach((category) => {
      const img = `assets/images/${categories[category].words[0].image}`;
      const cardHTML = createCard(category, img);
      cardHTML.addEventListener('click', () => { showCategory(category); });
      main.appendChild(cardHTML);
    });
  }
  if (isActiveBurger()) showBurgerMenu();
}

const burgerList = document.querySelector('.burger-menu__list');
function createBurgerMenu() {
  Object.keys(categories).forEach((category) => {
    const burgerListItem = document.createElement('li');
    burgerListItem.innerHTML = category;
    burgerList.appendChild(burgerListItem);
    burgerListItem.addEventListener('click', (e) => {
      const categoryName = e.target.innerHTML;
      if (categoryName !== activeMenu) {
        showCategory(categoryName);
      }
      if (isActiveBurger()) showBurgerMenu();
    });
  });
  const stat = document.createElement('li');
  stat.innerHTML = 'Statistics';
  burgerList.appendChild(stat);
}

showMain();
createBurgerMenu();
const burger = document.querySelector('.burger');
burger.addEventListener('click', () => { showBurgerMenu(); });
document.querySelector('.blackout').addEventListener('click', () => {
  showBurgerMenu();
});

const switchButton = document.querySelector('.switch-button input');
switchButton.addEventListener('change', () => {
  isTrain = !isTrain;
  document.querySelector('.switch-button').classList.toggle('game');
});

document.querySelector('.mainPage').addEventListener('click', () => { showMain(); });
