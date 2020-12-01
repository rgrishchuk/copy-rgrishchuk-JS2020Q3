import categories from './categories';
import { setLocal, getLocal } from './storage';
import { clearStatusBar, outputInStatusBar } from './statusBar';

let activeMenu = null;
let isTrain = true;
const iconHome = document.querySelector('.home');
const audio = document.querySelector('.voice');
const successSound = document.querySelector('.success');
const errorSound = document.querySelector('.error');
const winSound = document.querySelector('.win');
const loseSound = document.querySelector('.lose');
const cardsArr = [];

const theadStat = ['Word', 'Translation', 'Category', 'Clicks', 'Right', 'Wrong', 'Correct %'];
let statistics = null;

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

function createStatistics() {
  statistics = getLocal('statistics');
  if (!statistics) {
    statistics = [];
    Object.keys(categories).forEach((category) => {
      categories[category].words.forEach((item) => {
        statistics.push({
          category,
          word: item.word,
          translation: item.translation,
          clicks: 0,
          right: 0,
          wrong: 0,
          percent: 0,
          image: item.image,
          audioSrc: item.audioSrc,
        });
      });
    });
    setLocal('statistics', statistics);
  }
}
createStatistics();

function toStatistics(word, category, right) {
  const index = statistics.findIndex((element) => element.word === word);
  if (index !== -1) {
    statistics[index].clicks += 1;
    if (right) {
      statistics[index].right += 1;
    } else {
      statistics[index].wrong += 1;
    }
    statistics[index].percent = Math.ceil((statistics[index].right * 100)
    / statistics[index].clicks);
  }
  setLocal('statistics', statistics);
}

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
  outputInStatusBar(star, 'right', false);
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
    const message = document.createElement('span');
    message.innerHTML = `ERRORS: ${gameState.errors}`;
    outputInStatusBar(message);
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
        toStatistics(gameState.currWord.word, activeMenu, true);
        overlay.classList.add('active');
        successSound.addEventListener('ended', nextWord, false);
        gameState.playSound = true;
        successSound.play();
      } else {
        add2status(false);
        toStatistics(gameState.currWord.word, activeMenu, false);
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
  document.body.classList.toggle('noScroll');
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
  clearStatusBar();
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
function changeActiveMenuItem(category) {
  const oldMenuItem = document.querySelector('li.active');
  if (oldMenuItem) oldMenuItem.classList.remove('active');
  const newActiveMenu = findMenuItem(category);
  if (newActiveMenu) newActiveMenu.classList.add('active');
}

function showCategory(category) {
  if (category !== activeMenu) {
    clearGame();
    cardsArr.length = 0;
    iconHome.classList.add('active');
    changeActiveMenuItem(category);
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
    changeActiveMenuItem('Main');
    activeMenu = 'Main';
    clearMain();
    delete categories.Difficult;
    Object.keys(categories).forEach((category) => {
      const img = `assets/images/${categories[category].words[0].image}`;
      const cardHTML = createCard(category, img);
      cardHTML.addEventListener('click', () => { showCategory(category); });
      main.appendChild(cardHTML);
    });
  }
  if (isActiveBurger()) showBurgerMenu();
}

let statTable = null;

function sortStatTable(rowTitle) {
  const indexRowSort = theadStat.indexOf(rowTitle.innerHTML);
  const rows = Array.from(statTable.rows).slice(1);
  if (rowTitle.classList.contains('sort')) {
    const row = statTable.querySelector('.sort');
    if (row.classList.contains('asc')) {
      row.classList.remove('asc');
      row.classList.add('desc');
    } else {
      row.classList.remove('desc');
      row.classList.add('asc');
    }
    rows.reverse();
  } else {
    const oldRowSort = statTable.querySelector('.sort');
    oldRowSort.classList.remove('sort');
    oldRowSort.classList.remove('asc');
    oldRowSort.classList.remove('desc');
    rowTitle.classList.add('sort', 'asc');
    if (indexRowSort > 2) {
      rows.sort((a, b) => {
        const curr = parseInt(a.cells[indexRowSort].innerHTML, 10);
        const next = parseInt(b.cells[indexRowSort].innerHTML, 10);
        return curr > next ? 1 : -1;
      });
    } else {
      rows.sort((a, b) => (a.cells[indexRowSort].innerHTML
        > b.cells[indexRowSort].innerHTML ? 1 : -1));
    }
  }
  statTable.tBodies[0].append(...rows);
}

function createStatTable() {
  statTable = null;
  statTable = document.createElement('table');
  statTable.classList.add('statistics-table');
  const tbody = document.createElement('tbody');
  statTable.appendChild(tbody);
  let tr = document.createElement('tr');
  theadStat.forEach((item) => {
    const th = document.createElement('th');
    th.innerHTML = item;
    if (item === 'Word') th.classList.add('sort', 'asc');
    th.addEventListener('click', (e) => {
      sortStatTable(e.target);
    });
    tr.appendChild(th);
  });
  tbody.appendChild(tr);
  statistics.sort((a, b) => {
    if (a.word === b.word) return 0;
    if (a.word > b.word) return 1;
    return -1;
  });
  statistics.forEach((item) => {
    tr = document.createElement('tr');
    tr.innerHTML = `<td>${item.word}</td><td>${item.translation}</td><td>${item.category}</td>`;
    tr.innerHTML += `<td>${item.clicks}</td><td>${item.right}</td><td>${item.wrong}</td><td>${item.percent}</td>`;
    tbody.appendChild(tr);
  });
}

function resetStatistics() {
  statistics.forEach((item) => {
    const word = item;
    word.clicks = 0;
    word.right = 0;
    word.wrong = 0;
    word.percent = 0;
  });
  setLocal('statistics', statistics);
  const rows = Array.from(statTable.rows).slice(1);
  rows.forEach((item) => {
    const row = item;
    for (let index = 3; index <= 6; index += 1) {
      row.cells[index].innerHTML = '0';
    }
  });
}

function showDifficultWords() {
  const difficultWord = statistics.filter((item) => item.clicks > 0 && item.percent < 100);
  difficultWord.sort((a, b) => (a.percent > b.percent ? 1 : -1));
  delete categories.Difficult;
  categories.Difficult = { words: [] };
  for (let index = 0; index < 8 && index < difficultWord.length; index += 1) {
    categories.Difficult.words.push(difficultWord[index]);
  }
  if (difficultWord.length > 0) {
    showCategory('Difficult');
  } else {
    const message = document.createElement('span');
    message.innerHTML = 'No difficult words';
    outputInStatusBar(message);
  }
}

function createStateButtons() {
  const statButtons = document.createElement('div');
  statButtons.classList.add('statistics-buttons');

  const resetButton = document.createElement('button');
  resetButton.classList.add('statistics-buttons__reset');
  resetButton.innerHTML = 'Reset';

  const difficultButton = document.createElement('button');
  difficultButton.classList.add('statistics-buttons__difficult');
  difficultButton.innerHTML = 'Repeat difficult words';

  statButtons.appendChild(difficultButton);
  statButtons.appendChild(resetButton);
  main.appendChild(statButtons);

  resetButton.addEventListener('click', () => {
    resetStatistics();
  });

  difficultButton.addEventListener('click', () => {
    showDifficultWords();
  });
}

function showStatistics() {
  if (activeMenu !== 'Statistics') {
    changeActiveMenuItem('Statistics');
    activeMenu = 'Statistics';
    clearGame();
    clearMain();
    createStateButtons();
    createStatTable();
    main.appendChild(statTable);
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
  stat.classList.add('statisticsPage');
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

document.querySelector('.statisticsPage').addEventListener('click', () => {
  iconHome.classList.add('active');
  showStatistics();
});
