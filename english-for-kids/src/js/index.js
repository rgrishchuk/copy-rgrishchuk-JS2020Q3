import categories from './categories';

let activeMenu = null;
let isTrain = true;
const iconHome = document.querySelector('.home');
const statusBar = document.querySelector('.game-status');
const audio = document.querySelector('.voice');
const successSound = document.querySelector('.success');
const errorSound = document.querySelector('.error');
const winSound = document.querySelector('.win');
const loseSound = document.querySelector('.lose');
const cardsArr = [];
const gameState = {};
const wordsRandArr = [];

const gameButton = document.createElement('div');
gameButton.classList.add('game-button');
const gameButtonIcon = document.createElement('i');
gameButtonIcon.classList.add('material-icons', 'game-button__icon');
const gameButtonText = document.createElement('span');
gameButtonText.classList.add('game-button__text');
gameButton.appendChild(gameButtonIcon);
gameButton.appendChild(gameButtonText);

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    // eslint-disable-next-line no-param-reassign
    [array[i], array[j]] = [array[j], array[i]];
  }
}

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
  audio.src = `assets/audio/${word}.mp3`;
  audio.play();
}

function talk() {
  voiceWord(gameState.currWord.word);
}

function startGame() {
  gameState.start = true;
  gameButtonIcon.innerHTML = 'replay';
  gameButtonText.innerHTML = 'Repeat';
  wordsRandArr.length = 0;
  // generate array random words
  categories[activeMenu].words.forEach((item) => { wordsRandArr.push(item); });
  shuffle(wordsRandArr);
  gameState.currWord = wordsRandArr.pop();
  gameState.errors = 0;
  gameState.success = 0;
  gameButton.removeEventListener('click', startGame);
  voiceWord(gameState.currWord.word);
  gameButton.addEventListener('click', talk);
}

function add2status(success) {
  const star = document.createElement('i');
  star.classList.add('material-icons');
  if (success) { star.innerHTML = 'star'; } else star.innerHTML = 'star_border';
  statusBar.appendChild(star);
}

const main = document.querySelector('.main .wrapper .main__container');
function clearMain() {
  while (main.lastElementChild) {
    main.removeChild(main.lastElementChild);
  }
}

function toMain() {
  setTimeout(() => {
    gameState.playSound = false;
    document.querySelector('.checkbox').disabled = false;
    // eslint-disable-next-line no-use-before-define
    showMain();
  }, 3000);
  winSound.removeEventListener('ended', toMain);
  loseSound.removeEventListener('ended', toMain);
}

function endGame() {
  document.querySelector('.checkbox').disabled = true;
  gameState.playSound = true;
  clearMain();
  const smile = new Image();
  smile.classList.add('material-icons', 'smile');
  if (gameState.errors > 0) {
    statusBar.innerHTML = `ERRORS: ${gameState.errors}`;
    loseSound.addEventListener('ended', toMain, false);
    loseSound.play();
    smile.src = 'assets/images/smile-sad.png';
  } else {
    winSound.addEventListener('ended', toMain, false);
    winSound.play();
    smile.src = 'assets/images/smile.png';
  }
  main.appendChild(smile);
}

function nextWord() {
  gameState.playSound = false;
  successSound.removeEventListener('ended', nextWord);
  if (wordsRandArr.length > 0) {
    gameState.currWord = wordsRandArr.pop();
    voiceWord(gameState.currWord.word);
  } else endGame();
}

function createFlipCard(word, translate, image) {
  const card = document.createElement('div');
  card.classList.add('flip-card');
  if (!isTrain) card.classList.add('play');
  const front = document.createElement('div');
  front.classList.add('front', 'card');
  let img = new Image();
  img.src = image;
  front.appendChild(img);
  card.appendChild(front);

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
  card.appendChild(back);

  icon.addEventListener('click', (e) => {
    e.stopPropagation();
    e.target.closest('.flip-card').classList.add('flipH');
  });

  card.addEventListener('mouseleave', (e) => {
    e.target.closest('.flip-card').classList.remove('flipH');
  });

  front.addEventListener('click', (e) => {
    if (isTrain) voiceWord(e.target.closest('.front').querySelector('h4').innerHTML);
    else if (gameState.start && !gameState.playSound) {
      const overlay = e.target.closest('.flip-card').querySelector('.overlay');
      if (gameState.currWord.word === e.target.closest('.front').querySelector('h4').innerHTML) {
        add2status(true);
        gameState.success += 1;
        overlay.classList.add('active');
        successSound.addEventListener('ended', nextWord, false);
        gameState.playSound = true;
        successSound.play();
      } else {
        add2status(false);
        gameState.errors += 1;
        errorSound.play();
      }
    }
  });

  const overlay = document.createElement('div');
  overlay.classList.add('overlay');
  card.appendChild(overlay);

  return card;
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

function clearGame() {
  statusBar.innerHTML = '';
  gameState.errors = 0;
  gameState.success = 0;
  gameState.start = false;
  gameButtonIcon.innerHTML = 'play_circle_filled';
  gameButtonText.innerHTML = 'Start GAME';
  gameButton.removeEventListener('click', startGame);
  gameButton.removeEventListener('click', talk);
  gameButton.removeEventListener('click', startGame);
  gameButton.addEventListener('click', startGame);
  cardsArr.forEach((card) => { card.querySelector('.overlay').classList.remove('active'); });
  if (isTrain) {
    cardsArr.forEach((card) => { card.classList.remove('play'); });
    gameButton.classList.remove('active');
  } else {
    cardsArr.forEach((card) => { card.classList.add('play'); });
    gameButton.classList.add('active');
  }
}

function showCategory(category) {
  if (category !== activeMenu) {
    clearGame();
    cardsArr.length = 0;
    iconHome.classList.add('active');
    document.querySelector('li.active').classList.remove('active');
    const newActiveMenu = findMenuItem(category);
    if (newActiveMenu) newActiveMenu.classList.add('active');
    activeMenu = category;
    clearMain();
    const wordArr = categories[category].words;
    wordArr.forEach((item) => {
      const img = `assets/images/${item.image}`;
      const card = createFlipCard(item.word, item.translation, img);
      cardsArr.push(card);
      main.appendChild(card);
    });

    main.appendChild(gameButton);
  }
  if (isActiveBurger()) showBurgerMenu();
}

function showMain() {
  if (activeMenu !== 'Main') {
    clearGame();
    iconHome.classList.remove('active');
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
burger.addEventListener('click', () => { 
  if (!gameState.playSound) {
    showBurgerMenu();
  }
});
document.querySelector('.blackout').addEventListener('click', () => {
  showBurgerMenu();
});

const switchButton = document.querySelector('.switch-button input');
switchButton.addEventListener('change', () => {
  if (!gameState.playSound) {
    isTrain = !isTrain;
    document.querySelector('.switch-button').classList.toggle('game');
    clearGame();
  }
});

document.querySelector('.mainPage').addEventListener('click', () => { showMain(); });
iconHome.addEventListener('click', () => {
  if (!gameState.playSound) {
    showMain();
  }
});
