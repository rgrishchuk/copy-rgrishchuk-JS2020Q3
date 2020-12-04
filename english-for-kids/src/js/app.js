import '../sass/style.scss';
import BurgerMenu from './burger';
import Card from './card';
import FlipCard from './flipCard';
import categories from './categories';
import {
  createGameButton, setGameButton, activateIconHome, deactivateIconHome, createStatisticsButtons,
} from './buttons';
import voiceWord from './sound';
import { clearStatusBar, outputInStatusBar, add2status } from './statusBar';
import { shuffle, createSmile, cachePictures } from './utils';
import Statistics from './statistics';

export default class App {
  constructor() {
    this.isTrain = true;
    this.main = document.querySelector('.main .wrapper .main__container');
    this.categories = categories;
    this.burgerMenu = new BurgerMenu(this.categories);
    this.cardsArr = [];
    this.gameButton = createGameButton();

    this.errors = 0;
    this.success = 0;
    this.gameStart = false;
    this.playSound = false;

    const pictures = [];
    Object.keys(categories).forEach((element) => {
      categories[element].words.forEach((word) => {
        pictures.push(word.image);
      });
    });
    pictures.push('smile.png');
    pictures.push('smile-sad.png');
    cachePictures(pictures);
    this.wordsRandArr = [];
    this.startGame = this.startGame.bind(this);
    this.talk = this.talk.bind(this);
    this.nextWord = this.nextWord.bind(this);
    this.toMain = this.toMain.bind(this);

    this.successSound = document.querySelector('.success');
    this.errorSound = document.querySelector('.error');
    this.winSound = document.querySelector('.win');
    this.loseSound = document.querySelector('.lose');

    this.statistics = new Statistics(this.categories);
  }

  setListeners() {
    this.burgerMenu.items.forEach((item) => {
      if (item.innerHTML === 'Main') {
        item.addEventListener('click', () => { this.showMain(); });
      } else if (item.innerHTML === 'Statistics') {
        item.addEventListener('click', () => {
          activateIconHome();
          this.showStatistics();
        });
      } else {
        item.addEventListener('click', (e) => {
          const categoryName = e.target.innerHTML;
          if (categoryName !== this.activeMenu) {
            this.showCategory(categoryName);
          }
          if (this.burgerMenu.isActive()) this.burgerMenu.show();
        });
      }
    });

    this.burgerMenu.icon.addEventListener('click', () => {
      if (!this.playSound) {
        this.burgerMenu.show();
      }
    });

    this.burgerMenu.overlay.addEventListener('click', () => {
      this.burgerMenu.show();
    });

    document.querySelector('.home').addEventListener('click', () => {
      if (!this.playSound) {
        this.showMain();
      }
    });

    document.querySelector('.switch-button input').addEventListener('change', () => {
      if (!this.playSound) {
        this.isTrain = !this.isTrain;
        document.querySelector('.switch-button').classList.toggle('game');
        this.clearGame();
      }
    });
  }

  start() {
    const preloader = document.querySelector('.loader');
    preloader.addEventListener('animationend', () => {
      preloader.classList.add('disabled');
      this.main.classList.remove('disabled');
      document.querySelector('.header').classList.remove('disabled');
      document.querySelector('.footer').classList.remove('disabled');
    });
    this.showMain();
    this.setListeners();
  }

  clearMain() {
    while (this.main.lastElementChild) {
      this.main.removeChild(this.main.lastElementChild);
    }
  }

  activeMenu() {
    if (this.burgerMenu.activeItem) return this.burgerMenu.activeItem.innerHTML;
    return null;
  }

  showMain() {
    if (this.activeMenu() !== 'Main') {
      this.clearGame();
      deactivateIconHome();
      this.burgerMenu.changeActiveItem('Main');
      this.clearMain();
      delete this.categories.Difficult;
      Object.keys(this.categories).forEach((category) => {
        const img = `assets/images/${this.categories[category].words[0].image}`;
        const card = new Card(category, img);
        card.getElement().addEventListener('click', () => { this.showCategory(category); });
        this.main.appendChild(card.getElement());
      });
    }
    if (this.burgerMenu.isActive()) this.burgerMenu.show();
  }

  nextWord() {
    this.playSound = false;
    this.successSound.removeEventListener('ended', this.nextWord);
    if (this.wordsRandArr.length > 0) {
      this.currWord = this.wordsRandArr.pop();
      voiceWord(this.currWord.word);
    } else this.endGame();
  }

  toMain() {
    setTimeout(() => {
      this.playSound = false;
      document.querySelector('.checkbox').disabled = false;
      this.showMain();
    }, 3000);
    this.winSound.removeEventListener('ended', this.toMain);
    this.loseSound.removeEventListener('ended', this.toMain);
  }

  endGame() {
    document.querySelector('.checkbox').disabled = true;
    this.playSound = true;
    this.clearMain();
    if (this.errors > 0) {
      const message = document.createElement('span');
      message.innerHTML = `ERRORS: ${this.errors}`;
      outputInStatusBar(message);
      this.loseSound.addEventListener('ended', this.toMain);
      this.loseSound.play();
      this.main.appendChild(createSmile('smile-sad.png'));
    } else {
      this.winSound.addEventListener('ended', this.toMain);
      this.winSound.play();
      this.main.appendChild(createSmile('smile.png'));
    }
  }

  categoryListener(e) {
    if (this.isTrain) voiceWord(e.target.closest('.front').querySelector('h4').innerHTML);
    else if (this.gameStart && !this.playSound) {
      const overlay = e.target.closest('.flip-card').querySelector('.overlay');
      if (this.currWord.word === e.target.closest('.front').querySelector('h4').innerHTML) {
        add2status(true);
        this.success += 1;
        this.statistics.setData(this.currWord.word, this.activeMenu(), true);
        overlay.classList.add('active');
        this.successSound.addEventListener('ended', this.nextWord, false);
        this.playSound = true;
        this.successSound.play();
      } else {
        add2status(false);
        this.statistics.setData(this.currWord.word, this.activeMenu(), false);
        this.errors += 1;
        this.errorSound.play();
      }
    }
  }

  showCategory(category) {
    if (category !== this.activeMenu()) {
      this.clearGame();
      this.cardsArr.length = 0;
      activateIconHome();
      this.burgerMenu.changeActiveItem(category);
      this.clearMain();
      const wordArr = this.categories[category].words;
      wordArr.forEach((item) => {
        const img = `assets/images/${item.image}`;
        const card = new FlipCard(item.word, item.translation, img, this.isTrain);
        this.cardsArr.push(card.getElement());
        this.main.appendChild(card.getElement());
        card.getElement().querySelector('.front').addEventListener('click', (e) => {
          this.categoryListener(e);
        });
      });
      this.main.appendChild(this.gameButton);
    }
    if (this.burgerMenu.isActive()) this.burgerMenu.show();
  }

  clearGame() {
    clearStatusBar();
    this.errors = 0;
    this.success = 0;
    this.gameStart = false;
    setGameButton(this.gameButton, 'play_circle_filled', 'Start GAME');
    this.gameButton.removeEventListener('click', this.startGame);
    this.gameButton.removeEventListener('click', this.talk);
    this.gameButton.addEventListener('click', this.startGame);
    this.cardsArr.forEach((card) => { card.querySelector('.overlay').classList.remove('active'); });
    if (this.isTrain) {
      this.cardsArr.forEach((card) => { card.classList.remove('play'); });
      this.gameButton.classList.remove('active');
    } else {
      this.cardsArr.forEach((card) => { card.classList.add('play'); });
      this.gameButton.classList.add('active');
    }
  }

  startGame() {
    this.gameStart = true;
    setGameButton(this.gameButton, 'replay', 'Repeat');
    this.wordsRandArr.length = 0;
    const category = this.activeMenu() ?? 'Difficult';
    this.categories[category].words.forEach((item) => { this.wordsRandArr.push(item); });
    shuffle(this.wordsRandArr);
    this.currWord = this.wordsRandArr.pop();
    this.errors = 0;
    this.success = 0;
    this.gameButton.removeEventListener('click', this.startGame);
    voiceWord(this.currWord.word);
    this.gameButton.addEventListener('click', this.talk);
  }

  talk() {
    voiceWord(this.currWord.word);
  }

  showDifficultWords() {
    const difficultWord = this.statistics.data.filter((item) => item.clicks > 0
        && item.percent < 100);
    difficultWord.sort((a, b) => (a.percent > b.percent ? 1 : -1));
    delete this.categories.Difficult;
    this.categories.Difficult = { words: [] };
    for (let index = 0; index < 8 && index < difficultWord.length; index += 1) {
      this.categories.Difficult.words.push(difficultWord[index]);
    }
    if (difficultWord.length > 0) {
      this.showCategory('Difficult');
    } else {
      const message = document.createElement('span');
      message.innerHTML = 'No difficult words';
      outputInStatusBar(message);
    }
  }

  showStatistics() {
    if (this.activeMenu() !== 'Statistics') {
      this.burgerMenu.changeActiveItem('Statistics');
      this.clearGame();
      this.clearMain();
      const statisticsButtons = createStatisticsButtons();
      this.main.appendChild(statisticsButtons);
      statisticsButtons.querySelector('.statistics-buttons__reset').addEventListener('click', () => {
        this.statistics.clear();
      });
      statisticsButtons.querySelector('.statistics-buttons__difficult').addEventListener('click', () => {
        this.showDifficultWords();
      });
      this.statistics.createTable();
      this.main.appendChild(this.statistics.table);
    }
    if (this.burgerMenu.isActive()) this.burgerMenu.show();
  }
}
