/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is not neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/app.js":
/*!***********************!*\
  !*** ./src/js/app.js ***!
  \***********************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => /* binding */ App\n/* harmony export */ });\n/* harmony import */ var _sass_style_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../sass/style.scss */ \"./src/sass/style.scss\");\n/* harmony import */ var _burger__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./burger */ \"./src/js/burger.js\");\n/* harmony import */ var _card__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./card */ \"./src/js/card.js\");\n/* harmony import */ var _flipCard__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./flipCard */ \"./src/js/flipCard.js\");\n/* harmony import */ var _categories__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./categories */ \"./src/js/categories.js\");\n/* harmony import */ var _buttons__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./buttons */ \"./src/js/buttons.js\");\n/* harmony import */ var _sound__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./sound */ \"./src/js/sound.js\");\n/* harmony import */ var _statusBar__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./statusBar */ \"./src/js/statusBar.js\");\n/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./utils */ \"./src/js/utils.js\");\n/* harmony import */ var _statistics__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./statistics */ \"./src/js/statistics.js\");\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\nclass App {\r\n  constructor() {\r\n    this.isTrain = true;\r\n    this.main = document.querySelector('.main .wrapper .main__container');\r\n    this.categories = _categories__WEBPACK_IMPORTED_MODULE_4__.default;\r\n    this.burgerMenu = new _burger__WEBPACK_IMPORTED_MODULE_1__.default(this.categories);\r\n    this.cardsArr = [];\r\n    this.gameButton = (0,_buttons__WEBPACK_IMPORTED_MODULE_5__.createGameButton)();\r\n\r\n    this.errors = 0;\r\n    this.success = 0;\r\n    this.gameStart = false;\r\n    this.playSound = false;\r\n\r\n    const pictures = [];\r\n    Object.keys(_categories__WEBPACK_IMPORTED_MODULE_4__.default).forEach((element) => {\r\n      _categories__WEBPACK_IMPORTED_MODULE_4__.default[element].words.forEach((word) => {\r\n        pictures.push(word.image);\r\n      });\r\n    });\r\n    pictures.push('smile.png');\r\n    pictures.push('smile-sad.png');\r\n    (0,_utils__WEBPACK_IMPORTED_MODULE_8__.cachePictures)(pictures);\r\n    this.wordsRandArr = [];\r\n    this.startGame = this.startGame.bind(this);\r\n    this.talk = this.talk.bind(this);\r\n    this.nextWord = this.nextWord.bind(this);\r\n    this.toMain = this.toMain.bind(this);\r\n\r\n    this.successSound = document.querySelector('.success');\r\n    this.errorSound = document.querySelector('.error');\r\n    this.winSound = document.querySelector('.win');\r\n    this.loseSound = document.querySelector('.lose');\r\n\r\n    this.statistics = new _statistics__WEBPACK_IMPORTED_MODULE_9__.default(this.categories);\r\n  }\r\n\r\n  setListeners() {\r\n    this.burgerMenu.items.forEach((item) => {\r\n      if (item.innerHTML === 'Main') {\r\n        item.addEventListener('click', () => { this.showMain(); });\r\n      } else if (item.innerHTML === 'Statistics') {\r\n        item.addEventListener('click', () => {\r\n          (0,_buttons__WEBPACK_IMPORTED_MODULE_5__.activateIconHome)();\r\n          this.showStatistics();\r\n        });\r\n      } else {\r\n        item.addEventListener('click', (e) => {\r\n          const categoryName = e.target.innerHTML;\r\n          if (categoryName !== this.activeMenu) {\r\n            this.showCategory(categoryName);\r\n          }\r\n          if (this.burgerMenu.isActive()) this.burgerMenu.show();\r\n        });\r\n      }\r\n    });\r\n\r\n    this.burgerMenu.icon.addEventListener('click', () => {\r\n      if (!this.playSound) {\r\n        this.burgerMenu.show();\r\n      }\r\n    });\r\n\r\n    this.burgerMenu.overlay.addEventListener('click', () => {\r\n      this.burgerMenu.show();\r\n    });\r\n\r\n    document.querySelector('.home').addEventListener('click', () => {\r\n      if (!this.playSound) {\r\n        this.showMain();\r\n      }\r\n    });\r\n\r\n    document.querySelector('.switch-button input').addEventListener('change', () => {\r\n      if (!this.playSound) {\r\n        this.isTrain = !this.isTrain;\r\n        document.querySelector('.switch-button').classList.toggle('game');\r\n        this.clearGame();\r\n      }\r\n    });\r\n  }\r\n\r\n  start() {\r\n    const preloader = document.querySelector('.loader');\r\n    preloader.addEventListener('animationend', () => {\r\n      preloader.classList.add('disabled');\r\n      this.main.classList.remove('disabled');\r\n      document.querySelector('.header').classList.remove('disabled');\r\n      document.querySelector('.footer').classList.remove('disabled');\r\n    });\r\n    this.showMain();\r\n    this.setListeners();\r\n  }\r\n\r\n  clearMain() {\r\n    while (this.main.lastElementChild) {\r\n      this.main.removeChild(this.main.lastElementChild);\r\n    }\r\n  }\r\n\r\n  activeMenu() {\r\n    if (this.burgerMenu.activeItem) return this.burgerMenu.activeItem.innerHTML;\r\n    return null;\r\n  }\r\n\r\n  showMain() {\r\n    if (this.activeMenu() !== 'Main') {\r\n      this.clearGame();\r\n      (0,_buttons__WEBPACK_IMPORTED_MODULE_5__.deactivateIconHome)();\r\n      this.burgerMenu.changeActiveItem('Main');\r\n      this.clearMain();\r\n      delete this.categories.Difficult;\r\n      Object.keys(this.categories).forEach((category) => {\r\n        const img = `assets/images/${this.categories[category].words[0].image}`;\r\n        const card = new _card__WEBPACK_IMPORTED_MODULE_2__.default(category, img);\r\n        card.getElement().addEventListener('click', () => { this.showCategory(category); });\r\n        this.main.appendChild(card.getElement());\r\n      });\r\n    }\r\n    if (this.burgerMenu.isActive()) this.burgerMenu.show();\r\n  }\r\n\r\n  nextWord() {\r\n    this.playSound = false;\r\n    this.successSound.removeEventListener('ended', this.nextWord);\r\n    if (this.wordsRandArr.length > 0) {\r\n      this.currWord = this.wordsRandArr.pop();\r\n      (0,_sound__WEBPACK_IMPORTED_MODULE_6__.default)(this.currWord.word);\r\n    } else this.endGame();\r\n  }\r\n\r\n  toMain() {\r\n    setTimeout(() => {\r\n      this.playSound = false;\r\n      document.querySelector('.checkbox').disabled = false;\r\n      this.showMain();\r\n    }, 3000);\r\n    this.winSound.removeEventListener('ended', this.toMain);\r\n    this.loseSound.removeEventListener('ended', this.toMain);\r\n  }\r\n\r\n  endGame() {\r\n    document.querySelector('.checkbox').disabled = true;\r\n    this.playSound = true;\r\n    this.clearMain();\r\n    if (this.errors > 0) {\r\n      const message = document.createElement('span');\r\n      message.innerHTML = `ERRORS: ${this.errors}`;\r\n      (0,_statusBar__WEBPACK_IMPORTED_MODULE_7__.outputInStatusBar)(message);\r\n      this.loseSound.addEventListener('ended', this.toMain);\r\n      this.loseSound.play();\r\n      this.main.appendChild((0,_utils__WEBPACK_IMPORTED_MODULE_8__.createSmile)('smile-sad.png'));\r\n    } else {\r\n      this.winSound.addEventListener('ended', this.toMain);\r\n      this.winSound.play();\r\n      this.main.appendChild((0,_utils__WEBPACK_IMPORTED_MODULE_8__.createSmile)('smile.png'));\r\n    }\r\n  }\r\n\r\n  categoryListener(e) {\r\n    if (this.isTrain) (0,_sound__WEBPACK_IMPORTED_MODULE_6__.default)(e.target.closest('.front').querySelector('h4').innerHTML);\r\n    else if (this.gameStart && !this.playSound) {\r\n      const overlay = e.target.closest('.flip-card').querySelector('.overlay');\r\n      if (this.currWord.word === e.target.closest('.front').querySelector('h4').innerHTML) {\r\n        (0,_statusBar__WEBPACK_IMPORTED_MODULE_7__.add2status)(true);\r\n        this.success += 1;\r\n        this.statistics.setData(this.currWord.word, this.activeMenu(), true);\r\n        overlay.classList.add('active');\r\n        this.successSound.addEventListener('ended', this.nextWord, false);\r\n        this.playSound = true;\r\n        this.successSound.play();\r\n      } else {\r\n        (0,_statusBar__WEBPACK_IMPORTED_MODULE_7__.add2status)(false);\r\n        this.statistics.setData(this.currWord.word, this.activeMenu(), false);\r\n        this.errors += 1;\r\n        this.errorSound.play();\r\n      }\r\n    }\r\n  }\r\n\r\n  showCategory(category) {\r\n    if (category !== this.activeMenu()) {\r\n      this.clearGame();\r\n      this.cardsArr.length = 0;\r\n      (0,_buttons__WEBPACK_IMPORTED_MODULE_5__.activateIconHome)();\r\n      this.burgerMenu.changeActiveItem(category);\r\n      this.clearMain();\r\n      const wordArr = this.categories[category].words;\r\n      wordArr.forEach((item) => {\r\n        const img = `assets/images/${item.image}`;\r\n        const card = new _flipCard__WEBPACK_IMPORTED_MODULE_3__.default(item.word, item.translation, img, this.isTrain);\r\n        this.cardsArr.push(card.getElement());\r\n        this.main.appendChild(card.getElement());\r\n        card.getElement().querySelector('.front').addEventListener('click', (e) => {\r\n          this.categoryListener(e);\r\n        });\r\n      });\r\n      this.main.appendChild(this.gameButton);\r\n    }\r\n    if (this.burgerMenu.isActive()) this.burgerMenu.show();\r\n  }\r\n\r\n  clearGame() {\r\n    (0,_statusBar__WEBPACK_IMPORTED_MODULE_7__.clearStatusBar)();\r\n    this.errors = 0;\r\n    this.success = 0;\r\n    this.gameStart = false;\r\n    (0,_buttons__WEBPACK_IMPORTED_MODULE_5__.setGameButton)(this.gameButton, 'play_circle_filled', 'Start GAME');\r\n    this.gameButton.removeEventListener('click', this.startGame);\r\n    this.gameButton.removeEventListener('click', this.talk);\r\n    this.gameButton.addEventListener('click', this.startGame);\r\n    this.cardsArr.forEach((card) => { card.querySelector('.overlay').classList.remove('active'); });\r\n    if (this.isTrain) {\r\n      this.cardsArr.forEach((card) => { card.classList.remove('play'); });\r\n      this.gameButton.classList.remove('active');\r\n    } else {\r\n      this.cardsArr.forEach((card) => { card.classList.add('play'); });\r\n      this.gameButton.classList.add('active');\r\n    }\r\n  }\r\n\r\n  startGame() {\r\n    this.gameStart = true;\r\n    (0,_buttons__WEBPACK_IMPORTED_MODULE_5__.setGameButton)(this.gameButton, 'replay', 'Repeat');\r\n    this.wordsRandArr.length = 0;\r\n    const category = this.activeMenu() ?? 'Difficult';\r\n    this.categories[category].words.forEach((item) => { this.wordsRandArr.push(item); });\r\n    (0,_utils__WEBPACK_IMPORTED_MODULE_8__.shuffle)(this.wordsRandArr);\r\n    this.currWord = this.wordsRandArr.pop();\r\n    this.errors = 0;\r\n    this.success = 0;\r\n    this.gameButton.removeEventListener('click', this.startGame);\r\n    (0,_sound__WEBPACK_IMPORTED_MODULE_6__.default)(this.currWord.word);\r\n    this.gameButton.addEventListener('click', this.talk);\r\n  }\r\n\r\n  talk() {\r\n    (0,_sound__WEBPACK_IMPORTED_MODULE_6__.default)(this.currWord.word);\r\n  }\r\n\r\n  showDifficultWords() {\r\n    const difficultWord = this.statistics.data.filter((item) => item.clicks > 0\r\n        && item.percent < 100);\r\n    difficultWord.sort((a, b) => (a.percent > b.percent ? 1 : -1));\r\n    delete this.categories.Difficult;\r\n    this.categories.Difficult = { words: [] };\r\n    for (let index = 0; index < 8 && index < difficultWord.length; index += 1) {\r\n      this.categories.Difficult.words.push(difficultWord[index]);\r\n    }\r\n    if (difficultWord.length > 0) {\r\n      this.showCategory('Difficult');\r\n    } else {\r\n      const message = document.createElement('span');\r\n      message.innerHTML = 'No difficult words';\r\n      (0,_statusBar__WEBPACK_IMPORTED_MODULE_7__.outputInStatusBar)(message);\r\n    }\r\n  }\r\n\r\n  showStatistics() {\r\n    if (this.activeMenu() !== 'Statistics') {\r\n      this.burgerMenu.changeActiveItem('Statistics');\r\n      this.clearGame();\r\n      this.clearMain();\r\n      const statisticsButtons = (0,_buttons__WEBPACK_IMPORTED_MODULE_5__.createStatisticsButtons)();\r\n      this.main.appendChild(statisticsButtons);\r\n      statisticsButtons.querySelector('.statistics-buttons__reset').addEventListener('click', () => {\r\n        this.statistics.clear();\r\n      });\r\n      statisticsButtons.querySelector('.statistics-buttons__difficult').addEventListener('click', () => {\r\n        this.showDifficultWords();\r\n      });\r\n      this.statistics.createTable();\r\n      this.main.appendChild(this.statistics.table);\r\n    }\r\n    if (this.burgerMenu.isActive()) this.burgerMenu.show();\r\n  }\r\n}\r\n\n\n//# sourceURL=webpack://english-for-kids/./src/js/app.js?");

/***/ }),

/***/ "./src/js/burger.js":
/*!**************************!*\
  !*** ./src/js/burger.js ***!
  \**************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => /* binding */ BurgerMenu\n/* harmony export */ });\nclass BurgerMenu {\r\n  constructor(categories) {\r\n    this.element = document.querySelector('.burger-menu');\r\n    this.icon = document.querySelector('.burger');\r\n    this.overlay = document.querySelector('.blackout');\r\n    this.items = [];\r\n    const itemMain = document.querySelector('.mainPage');\r\n    this.items.push(itemMain);\r\n    this.activeItem = null;\r\n    const burgerList = document.querySelector('.burger-menu__list');\r\n    Object.keys(categories).forEach((category) => {\r\n      const burgerListItem = document.createElement('li');\r\n      burgerListItem.innerHTML = category;\r\n      this.items.push(burgerListItem);\r\n      burgerList.appendChild(burgerListItem);\r\n    });\r\n    const itemStatistics = document.createElement('li');\r\n    itemStatistics.classList.add('statisticsPage');\r\n    itemStatistics.innerHTML = 'Statistics';\r\n    this.items.push(itemStatistics);\r\n    burgerList.appendChild(itemStatistics);\r\n  }\r\n\r\n  show() {\r\n    this.overlay.classList.toggle('active');\r\n    this.icon.classList.toggle('active');\r\n    this.element.classList.toggle('active');\r\n  }\r\n\r\n  isActive() {\r\n    return this.element.className.includes('active');\r\n  }\r\n\r\n  findMenuItem(name) {\r\n    for (let i = 0; i < this.items.length; i += 1) {\r\n      if (this.items[i].innerHTML === name) {\r\n        return this.items[i];\r\n      }\r\n    }\r\n    return null;\r\n  }\r\n\r\n  changeActiveItem(category) {\r\n    if (this.activeItem) this.activeItem.classList.remove('active');\r\n    this.activeItem = this.findMenuItem(category);\r\n    if (this.activeItem) this.activeItem.classList.add('active');\r\n  }\r\n}\r\n\n\n//# sourceURL=webpack://english-for-kids/./src/js/burger.js?");

/***/ }),

/***/ "./src/js/buttons.js":
/*!***************************!*\
  !*** ./src/js/buttons.js ***!
  \***************************/
/*! namespace exports */
/*! export activateIconHome [provided] [no usage info] [missing usage info prevents renaming] */
/*! export createGameButton [provided] [no usage info] [missing usage info prevents renaming] */
/*! export createStatisticsButtons [provided] [no usage info] [missing usage info prevents renaming] */
/*! export deactivateIconHome [provided] [no usage info] [missing usage info prevents renaming] */
/*! export setGameButton [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"createGameButton\": () => /* binding */ createGameButton,\n/* harmony export */   \"setGameButton\": () => /* binding */ setGameButton,\n/* harmony export */   \"activateIconHome\": () => /* binding */ activateIconHome,\n/* harmony export */   \"deactivateIconHome\": () => /* binding */ deactivateIconHome,\n/* harmony export */   \"createStatisticsButtons\": () => /* binding */ createStatisticsButtons\n/* harmony export */ });\nfunction createGameButton() {\r\n  const gameButton = document.createElement('div');\r\n  gameButton.classList.add('game-button');\r\n  const gameButtonIcon = document.createElement('i');\r\n  gameButtonIcon.classList.add('material-icons', 'game-button__icon');\r\n  const gameButtonText = document.createElement('span');\r\n  gameButtonText.classList.add('game-button__text');\r\n  gameButton.appendChild(gameButtonIcon);\r\n  gameButton.appendChild(gameButtonText);\r\n  return gameButton;\r\n}\r\n\r\nfunction setGameButton(button, icon, text) {\r\n  const gameButtonIcon = button.querySelector('.game-button__icon');\r\n  const gameButtonText = button.querySelector('.game-button__text');\r\n  gameButtonIcon.innerHTML = icon;\r\n  gameButtonText.innerHTML = text;\r\n}\r\n\r\nfunction activateIconHome() {\r\n  const iconHome = document.querySelector('.home');\r\n  iconHome.classList.add('active');\r\n}\r\n\r\nfunction deactivateIconHome() {\r\n  const iconHome = document.querySelector('.home');\r\n  iconHome.classList.remove('active');\r\n}\r\n\r\nfunction createStatisticsButtons() {\r\n  const statButtons = document.createElement('div');\r\n  statButtons.classList.add('statistics-buttons');\r\n\r\n  const resetButton = document.createElement('button');\r\n  resetButton.classList.add('statistics-buttons__reset');\r\n  resetButton.innerHTML = 'Reset';\r\n\r\n  const difficultButton = document.createElement('button');\r\n  difficultButton.classList.add('statistics-buttons__difficult');\r\n  difficultButton.innerHTML = 'Repeat difficult words';\r\n\r\n  statButtons.appendChild(difficultButton);\r\n  statButtons.appendChild(resetButton);\r\n  return statButtons;\r\n}\r\n\r\n\r\n\n\n//# sourceURL=webpack://english-for-kids/./src/js/buttons.js?");

/***/ }),

/***/ "./src/js/card.js":
/*!************************!*\
  !*** ./src/js/card.js ***!
  \************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => /* binding */ Card\n/* harmony export */ });\nclass Card {\r\n  constructor(title, image) {\r\n    this.card = document.createElement('div');\r\n    this.card.classList.add('card');\r\n    const img = new Image();\r\n    img.src = image;\r\n    this.card.appendChild(img);\r\n    const container = document.createElement('div');\r\n    container.classList.add('card__container');\r\n    const text = document.createElement('h4');\r\n    text.innerHTML = title;\r\n    container.appendChild(text);\r\n    this.card.appendChild(container);\r\n  }\r\n\r\n  getElement() {\r\n    return this.card;\r\n  }\r\n}\r\n\n\n//# sourceURL=webpack://english-for-kids/./src/js/card.js?");

/***/ }),

/***/ "./src/js/categories.js":
/*!******************************!*\
  !*** ./src/js/categories.js ***!
  \******************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_exports__, __webpack_require__.r, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => __WEBPACK_DEFAULT_EXPORT__\n/* harmony export */ });\nconst categories = {\r\n  'Action (set A)': {\r\n    words: [\r\n      {\r\n        word: 'cry',\r\n        translation: 'плакать',\r\n        image: 'cry.jpg',\r\n        audioSrc: 'cry.mp3',\r\n      },\r\n      {\r\n        word: 'dance',\r\n        translation: 'танцевать',\r\n        image: 'dance.jpg',\r\n        audioSrc: 'dance.mp3',\r\n      },\r\n      {\r\n        word: 'dive',\r\n        translation: 'нырять',\r\n        image: 'dive.jpg',\r\n        audioSrc: 'dive.mp3',\r\n      },\r\n      {\r\n        word: 'draw',\r\n        translation: 'рисовать',\r\n        image: 'draw.jpg',\r\n        audioSrc: 'draw.mp3',\r\n      },\r\n      {\r\n        word: 'fish',\r\n        translation: 'ловить рыбу',\r\n        image: 'fish.jpg',\r\n        audioSrc: 'fish.mp3',\r\n      },\r\n      {\r\n        word: 'fly',\r\n        translation: 'летать',\r\n        image: 'fly.jpg',\r\n        audioSrc: 'fly.mp3',\r\n      },\r\n      {\r\n        word: 'hug',\r\n        translation: 'обнимать',\r\n        image: 'hug.jpg',\r\n        audioSrc: 'hug.mp3',\r\n      },\r\n      {\r\n        word: 'jump',\r\n        translation: 'прыгать',\r\n        image: 'jump.jpg',\r\n        audioSrc: 'jump.mp3',\r\n      },\r\n    ],\r\n  },\r\n  'Action (set B)': {\r\n    words: [\r\n      {\r\n        word: 'open',\r\n        translation: 'открывать',\r\n        image: 'open.jpg',\r\n        audioSrc: 'open.mp3',\r\n      },\r\n      {\r\n        word: 'play',\r\n        translation: 'играть',\r\n        image: 'play.jpg',\r\n        audioSrc: 'play.mp3',\r\n      },\r\n      {\r\n        word: 'point',\r\n        translation: 'указывать',\r\n        image: 'point.jpg',\r\n        audioSrc: 'point.mp3',\r\n      },\r\n      {\r\n        word: 'ride',\r\n        translation: 'ездить',\r\n        image: 'ride.jpg',\r\n        audioSrc: 'ride.mp3',\r\n      },\r\n      {\r\n        word: 'run',\r\n        translation: 'бегать',\r\n        image: 'run.jpg',\r\n        audioSrc: 'run.mp3',\r\n      },\r\n      {\r\n        word: 'sing',\r\n        translation: 'петь',\r\n        image: 'sing.jpg',\r\n        audioSrc: 'sing.mp3',\r\n      },\r\n      {\r\n        word: 'skip',\r\n        translation: 'пропускать, прыгать',\r\n        image: 'skip.jpg',\r\n        audioSrc: 'skip.mp3',\r\n      },\r\n      {\r\n        word: 'swim',\r\n        translation: 'плавать',\r\n        image: 'swim.jpg',\r\n        audioSrc: 'swim.mp3',\r\n      },\r\n    ],\r\n  },\r\n  'Action (set C)': {\r\n    words: [\r\n      {\r\n        word: 'read',\r\n        translation: 'читать',\r\n        image: 'read.jpg',\r\n        audioSrc: 'read.mp3',\r\n      },\r\n      {\r\n        word: 'write',\r\n        translation: 'писать',\r\n        image: 'write.jpg',\r\n        audioSrc: 'write.mp3',\r\n      },\r\n      {\r\n        word: 'drive',\r\n        translation: 'водить',\r\n        image: 'drive.jpg',\r\n        audioSrc: 'drive.mp3',\r\n      },\r\n      {\r\n        word: 'drink',\r\n        translation: 'пить',\r\n        image: 'drink.jpg',\r\n        audioSrc: 'drink.mp3',\r\n      },\r\n      {\r\n        word: 'eat',\r\n        translation: 'есть',\r\n        image: 'eat.jpg',\r\n        audioSrc: 'run.mp3',\r\n      },\r\n      {\r\n        word: 'shoot',\r\n        translation: 'стрелять',\r\n        image: 'shoot.jpg',\r\n        audioSrc: 'sing.mp3',\r\n      },\r\n      {\r\n        word: 'kiss',\r\n        translation: 'целовать',\r\n        image: 'kiss.jpg',\r\n        audioSrc: 'kiss.mp3',\r\n      },\r\n      {\r\n        word: 'throw',\r\n        translation: 'бросать',\r\n        image: 'throw.jpg',\r\n        audioSrc: 'throw.mp3',\r\n      },\r\n    ],\r\n  },\r\n  Adjective: {\r\n    words: [\r\n      {\r\n        word: 'small',\r\n        translation: 'маленький',\r\n        image: 'small.jpg',\r\n        audioSrc: 'small.mp3',\r\n      },\r\n      {\r\n        word: 'tall',\r\n        translation: 'высокий',\r\n        image: 'tall.jpg',\r\n        audioSrc: 'tall.mp3',\r\n      },\r\n      {\r\n        word: 'clever',\r\n        translation: 'умный',\r\n        image: 'clever.jpg',\r\n        audioSrc: 'clever.mp3',\r\n      },\r\n      {\r\n        word: 'heavy',\r\n        translation: 'тяжелый',\r\n        image: 'heavy.jpg',\r\n        audioSrc: 'heavy.mp3',\r\n      },\r\n      {\r\n        word: 'cold',\r\n        translation: 'холодный',\r\n        image: 'cold.jpg',\r\n        audioSrc: 'cold.mp3',\r\n      },\r\n      {\r\n        word: 'warm',\r\n        translation: 'тёплый',\r\n        image: 'warm.jpg',\r\n        audioSrc: 'warm.mp3',\r\n      },\r\n      {\r\n        word: 'friendly',\r\n        translation: 'дружелюбный',\r\n        image: 'friendly.jpg',\r\n        audioSrc: 'friendly.mp3',\r\n      },\r\n      {\r\n        word: 'messy',\r\n        translation: 'грязный',\r\n        image: 'messy.jpg',\r\n        audioSrc: 'swim.mp3',\r\n      },\r\n    ],\r\n  },\r\n  'Animal (set A)': {\r\n    words: [\r\n      {\r\n        word: 'cat',\r\n        translation: 'кот',\r\n        image: 'cat.jpg',\r\n        audioSrc: 'cat.mp3',\r\n      },\r\n      {\r\n        word: 'chick',\r\n        translation: 'цыплёнок',\r\n        image: 'chick.jpg',\r\n        audioSrc: 'chick.mp3',\r\n      },\r\n      {\r\n        word: 'chicken',\r\n        translation: 'курица',\r\n        image: 'chicken.jpg',\r\n        audioSrc: 'chicken.mp3',\r\n      },\r\n      {\r\n        word: 'dog',\r\n        translation: 'собака',\r\n        image: 'dog.jpg',\r\n        audioSrc: 'dog.mp3',\r\n      },\r\n      {\r\n        word: 'horse',\r\n        translation: 'лошадь',\r\n        image: 'horse.jpg',\r\n        audioSrc: 'horse.mp3',\r\n      },\r\n      {\r\n        word: 'pig',\r\n        translation: 'свинья',\r\n        image: 'pig.jpg',\r\n        audioSrc: 'pig.mp3',\r\n      },\r\n      {\r\n        word: 'rabbit',\r\n        translation: 'кролик',\r\n        image: 'rabbit.jpg',\r\n        audioSrc: 'rabbit.mp3',\r\n      },\r\n      {\r\n        word: 'sheep',\r\n        translation: 'овца',\r\n        image: 'sheep.jpg',\r\n        audioSrc: 'sheep.mp3',\r\n      },\r\n    ],\r\n  },\r\n  'Animal (set B)': {\r\n    words: [\r\n      {\r\n        word: 'bird',\r\n        translation: 'птица',\r\n        image: 'bird.jpg',\r\n        audioSrc: 'bird.mp3',\r\n      },\r\n      {\r\n        word: 'fish',\r\n        translation: 'рыба',\r\n        image: 'fish1.jpg',\r\n        audioSrc: 'fish.mp3',\r\n      },\r\n      {\r\n        word: 'frog',\r\n        translation: 'жаба',\r\n        image: 'frog.jpg',\r\n        audioSrc: 'frog.mp3',\r\n      },\r\n      {\r\n        word: 'giraffe',\r\n        translation: 'жирафа',\r\n        image: 'giraffe.jpg',\r\n        audioSrc: 'giraffe.mp3',\r\n      },\r\n      {\r\n        word: 'lion',\r\n        translation: 'лев',\r\n        image: 'lion.jpg',\r\n        audioSrc: 'lion.mp3',\r\n      },\r\n      {\r\n        word: 'mouse',\r\n        translation: 'мышь',\r\n        image: 'mouse.jpg',\r\n        audioSrc: 'mouse.mp3',\r\n      },\r\n      {\r\n        word: 'turtle',\r\n        translation: 'черепаха',\r\n        image: 'turtle.jpg',\r\n        audioSrc: 'turtle.mp3',\r\n      },\r\n      {\r\n        word: 'dolphin',\r\n        translation: 'дельфин',\r\n        image: 'dolphin.jpg',\r\n        audioSrc: 'dolphin.mp3',\r\n      },\r\n    ],\r\n  },\r\n  Clothes: {\r\n    words: [\r\n      {\r\n        word: 'skirt',\r\n        translation: 'юбка',\r\n        image: 'skirt.jpg',\r\n        audioSrc: 'skirt.mp3',\r\n      },\r\n      {\r\n        word: 'pants',\r\n        translation: 'брюки',\r\n        image: 'pants.jpg',\r\n        audioSrc: 'pants.mp3',\r\n      },\r\n      {\r\n        word: 'blouse',\r\n        translation: 'блузка',\r\n        image: 'blouse.jpg',\r\n        audioSrc: 'blouse.mp3',\r\n      },\r\n      {\r\n        word: 'dress',\r\n        translation: 'платье',\r\n        image: 'dress.jpg',\r\n        audioSrc: 'dress.mp3',\r\n      },\r\n      {\r\n        word: 'boot',\r\n        translation: 'ботинок',\r\n        image: 'boot.jpg',\r\n        audioSrc: 'boot.mp3',\r\n      },\r\n      {\r\n        word: 'shirt',\r\n        translation: 'рубашка',\r\n        image: 'shirt.jpg',\r\n        audioSrc: 'shirt.mp3',\r\n      },\r\n      {\r\n        word: 'coat',\r\n        translation: 'пальто',\r\n        image: 'coat.jpg',\r\n        audioSrc: 'coat.mp3',\r\n      },\r\n      {\r\n        word: 'shoe',\r\n        translation: 'туфли',\r\n        image: 'shoe.jpg',\r\n        audioSrc: 'shoe.mp3',\r\n      },\r\n    ],\r\n  },\r\n  Emotion: {\r\n    words: [\r\n      {\r\n        word: 'sad',\r\n        translation: 'грустный',\r\n        image: 'sad.jpg',\r\n        audioSrc: 'sad.mp3',\r\n      },\r\n      {\r\n        word: 'angry',\r\n        translation: 'сердитый',\r\n        image: 'angry.jpg',\r\n        audioSrc: 'angry.mp3',\r\n      },\r\n      {\r\n        word: 'happy',\r\n        translation: 'счастливый',\r\n        image: 'happy.jpg',\r\n        audioSrc: 'happy.mp3',\r\n      },\r\n      {\r\n        word: 'tired',\r\n        translation: 'уставший',\r\n        image: 'tired.jpg',\r\n        audioSrc: 'tired.mp3',\r\n      },\r\n      {\r\n        word: 'surprised',\r\n        translation: 'удивлённый',\r\n        image: 'surprised.jpg',\r\n        audioSrc: 'surprised.mp3',\r\n      },\r\n      {\r\n        word: 'scared',\r\n        translation: 'испуганный',\r\n        image: 'scared.jpg',\r\n        audioSrc: 'scared.mp3',\r\n      },\r\n      {\r\n        word: 'smile',\r\n        translation: 'улыбка',\r\n        image: 'smile.jpg',\r\n        audioSrc: 'smile.mp3',\r\n      },\r\n      {\r\n        word: 'laugh',\r\n        translation: 'смех',\r\n        image: 'laugh.jpg',\r\n        audioSrc: 'laugh.mp3',\r\n      },\r\n    ],\r\n  },\r\n};\r\n\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (categories);\r\n\n\n//# sourceURL=webpack://english-for-kids/./src/js/categories.js?");

/***/ }),

/***/ "./src/js/flipCard.js":
/*!****************************!*\
  !*** ./src/js/flipCard.js ***!
  \****************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => /* binding */ FlipCard\n/* harmony export */ });\nclass FlipCard {\r\n  constructor(word, translate, image, isTrain) {\r\n    this.card = document.createElement('div');\r\n    this.card.classList.add('flip-card');\r\n    if (!isTrain) this.card.classList.add('play');\r\n    const front = document.createElement('div');\r\n    front.classList.add('front', 'card');\r\n    let img = new Image();\r\n    img.src = image;\r\n    front.appendChild(img);\r\n    this.card.appendChild(front);\r\n\r\n    let container = document.createElement('div');\r\n    container.classList.add('card__container');\r\n    let text = document.createElement('h4');\r\n    text.innerHTML = word;\r\n    container.appendChild(text);\r\n    const icon = document.createElement('i');\r\n    icon.classList.add('material-icons', 'icon-loop');\r\n    icon.innerHTML = 'loop';\r\n    container.appendChild(icon);\r\n    front.appendChild(container);\r\n\r\n    const back = document.createElement('div');\r\n    back.classList.add('back', 'card');\r\n    img = new Image();\r\n    img.src = image;\r\n    back.appendChild(img);\r\n    container = document.createElement('div');\r\n    container.classList.add('card__container');\r\n    text = document.createElement('h4');\r\n    text.innerHTML = translate;\r\n    container.appendChild(text);\r\n    back.appendChild(container);\r\n    back.classList.add('back');\r\n    this.card.appendChild(back);\r\n\r\n    icon.addEventListener('click', (e) => {\r\n      e.stopPropagation();\r\n      e.target.closest('.flip-card').classList.add('flipH');\r\n    });\r\n\r\n    this.card.addEventListener('mouseleave', (e) => {\r\n      e.target.closest('.flip-card').classList.remove('flipH');\r\n    });\r\n\r\n    const overlay = document.createElement('div');\r\n    overlay.classList.add('overlay');\r\n    this.card.appendChild(overlay);\r\n  }\r\n\r\n  getElement() {\r\n    return this.card;\r\n  }\r\n}\r\n\n\n//# sourceURL=webpack://english-for-kids/./src/js/flipCard.js?");

/***/ }),

/***/ "./src/js/index.js":
/*!*************************!*\
  !*** ./src/js/index.js ***!
  \*************************/
/*! namespace exports */
/*! exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _app__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./app */ \"./src/js/app.js\");\n\r\n\r\nconst app = new _app__WEBPACK_IMPORTED_MODULE_0__.default();\r\napp.start();\r\n\n\n//# sourceURL=webpack://english-for-kids/./src/js/index.js?");

/***/ }),

/***/ "./src/js/sound.js":
/*!*************************!*\
  !*** ./src/js/sound.js ***!
  \*************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => /* binding */ voiceWord\n/* harmony export */ });\nfunction voiceWord(word) {\r\n  const audio = document.querySelector('.voice');\r\n  audio.src = `assets/audio/${word}.mp3`;\r\n  audio.play();\r\n}\r\n\n\n//# sourceURL=webpack://english-for-kids/./src/js/sound.js?");

/***/ }),

/***/ "./src/js/statistics.js":
/*!******************************!*\
  !*** ./src/js/statistics.js ***!
  \******************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => /* binding */ Statistics\n/* harmony export */ });\n/* harmony import */ var _storage__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./storage */ \"./src/js/storage.js\");\n\r\n\r\nclass Statistics {\r\n  constructor(categories) {\r\n    this.thead = ['Word', 'Translation', 'Category', 'Clicks', 'Right', 'Wrong', 'Correct %'];\r\n    this.data = (0,_storage__WEBPACK_IMPORTED_MODULE_0__.getLocal)('statistics');\r\n    if (!this.data) {\r\n      this.data = [];\r\n      Object.keys(categories).forEach((category) => {\r\n        categories[category].words.forEach((item) => {\r\n          this.data.push({\r\n            category,\r\n            word: item.word,\r\n            translation: item.translation,\r\n            clicks: 0,\r\n            right: 0,\r\n            wrong: 0,\r\n            percent: 0,\r\n            image: item.image,\r\n            audioSrc: item.audioSrc,\r\n          });\r\n        });\r\n      });\r\n      (0,_storage__WEBPACK_IMPORTED_MODULE_0__.setLocal)('statistics', this.data);\r\n    }\r\n  }\r\n\r\n  setData(word, category, right) {\r\n    const index = this.data.findIndex((item) => item.word === word);\r\n    if (index !== -1) {\r\n      this.data[index].clicks += 1;\r\n      if (right) {\r\n        this.data[index].right += 1;\r\n      } else {\r\n        this.data[index].wrong += 1;\r\n      }\r\n      this.data[index].percent = Math.ceil((this.data[index].right * 100)\r\n        / this.data[index].clicks);\r\n    }\r\n    (0,_storage__WEBPACK_IMPORTED_MODULE_0__.setLocal)('statistics', this.data);\r\n  }\r\n\r\n  clear() {\r\n    this.data.forEach((item) => {\r\n      const word = item;\r\n      word.clicks = 0;\r\n      word.right = 0;\r\n      word.wrong = 0;\r\n      word.percent = 0;\r\n    });\r\n    (0,_storage__WEBPACK_IMPORTED_MODULE_0__.setLocal)('statistics', this.data);\r\n    const rows = Array.from(this.table.rows).slice(1);\r\n    rows.forEach((item) => {\r\n      const row = item;\r\n      for (let index = 3; index <= 6; index += 1) {\r\n        row.cells[index].innerHTML = '0';\r\n      }\r\n    });\r\n  }\r\n\r\n  sortTable(rowTitle) {\r\n    const indexRowSort = this.thead.indexOf(rowTitle.innerHTML);\r\n    const rows = Array.from(this.table.rows).slice(1);\r\n    if (rowTitle.classList.contains('sort')) {\r\n      const row = this.table.querySelector('.sort');\r\n      if (row.classList.contains('asc')) {\r\n        row.classList.remove('asc');\r\n        row.classList.add('desc');\r\n      } else {\r\n        row.classList.remove('desc');\r\n        row.classList.add('asc');\r\n      }\r\n      rows.reverse();\r\n    } else {\r\n      const oldRowSort = this.table.querySelector('.sort');\r\n      oldRowSort.classList.remove('sort');\r\n      oldRowSort.classList.remove('asc');\r\n      oldRowSort.classList.remove('desc');\r\n      rowTitle.classList.add('sort', 'asc');\r\n      if (indexRowSort > 2) {\r\n        rows.sort((a, b) => {\r\n          const curr = parseInt(a.cells[indexRowSort].innerHTML, 10);\r\n          const next = parseInt(b.cells[indexRowSort].innerHTML, 10);\r\n          return curr > next ? 1 : -1;\r\n        });\r\n      } else {\r\n        rows.sort((a, b) => (a.cells[indexRowSort].innerHTML\r\n          > b.cells[indexRowSort].innerHTML ? 1 : -1));\r\n      }\r\n    }\r\n    this.table.tBodies[0].append(...rows);\r\n  }\r\n\r\n  createTable() {\r\n    this.table = document.createElement('table');\r\n    this.table.classList.add('statistics-table');\r\n    const tbody = document.createElement('tbody');\r\n    this.table.appendChild(tbody);\r\n    let tr = document.createElement('tr');\r\n    this.thead.forEach((item) => {\r\n      const th = document.createElement('th');\r\n      th.innerHTML = item;\r\n      if (item === 'Word') th.classList.add('sort', 'asc');\r\n      th.addEventListener('click', (e) => {\r\n        this.sortTable(e.target);\r\n      });\r\n      tr.appendChild(th);\r\n    });\r\n    tbody.appendChild(tr);\r\n    this.data.sort((a, b) => {\r\n      if (a.word === b.word) return 0;\r\n      if (a.word > b.word) return 1;\r\n      return -1;\r\n    });\r\n    this.data.forEach((item) => {\r\n      tr = document.createElement('tr');\r\n      tr.innerHTML = `<td>${item.word}</td><td>${item.translation}</td><td>${item.category}</td>`;\r\n      tr.innerHTML += `<td>${item.clicks}</td><td>${item.right}</td><td>${item.wrong}</td><td>${item.percent}</td>`;\r\n      tbody.appendChild(tr);\r\n    });\r\n  }\r\n}\r\n\n\n//# sourceURL=webpack://english-for-kids/./src/js/statistics.js?");

/***/ }),

/***/ "./src/js/statusBar.js":
/*!*****************************!*\
  !*** ./src/js/statusBar.js ***!
  \*****************************/
/*! namespace exports */
/*! export add2status [provided] [no usage info] [missing usage info prevents renaming] */
/*! export clearStatusBar [provided] [no usage info] [missing usage info prevents renaming] */
/*! export outputInStatusBar [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"clearStatusBar\": () => /* binding */ clearStatusBar,\n/* harmony export */   \"outputInStatusBar\": () => /* binding */ outputInStatusBar,\n/* harmony export */   \"add2status\": () => /* binding */ add2status\n/* harmony export */ });\nfunction clearStatusBar() {\r\n  const statusBar = document.querySelector('.game-status');\r\n  statusBar.innerHTML = '';\r\n}\r\n\r\nfunction outputInStatusBar(element, align = 'center', clear = true) {\r\n  const statBar = document.querySelector('.game-status');\r\n  statBar.className = 'game-status';\r\n  statBar.classList.add(align);\r\n  if (clear) statBar.innerHTML = '';\r\n  statBar.appendChild(element);\r\n}\r\n\r\nfunction add2status(success) {\r\n  const star = document.createElement('i');\r\n  star.classList.add('material-icons');\r\n  if (success) { star.innerHTML = 'star'; } else star.innerHTML = 'star_border';\r\n  outputInStatusBar(star, 'right', false);\r\n}\r\n\r\n\r\n\n\n//# sourceURL=webpack://english-for-kids/./src/js/statusBar.js?");

/***/ }),

/***/ "./src/js/storage.js":
/*!***************************!*\
  !*** ./src/js/storage.js ***!
  \***************************/
/*! namespace exports */
/*! export getLocal [provided] [no usage info] [missing usage info prevents renaming] */
/*! export setLocal [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"setLocal\": () => /* binding */ setLocal,\n/* harmony export */   \"getLocal\": () => /* binding */ getLocal\n/* harmony export */ });\nfunction setLocal(name, value) {\r\n  window.localStorage.setItem(name, JSON.stringify(value));\r\n}\r\n\r\nfunction getLocal(name) {\r\n  return JSON.parse(window.localStorage.getItem(name));\r\n}\r\n\r\n\r\n\n\n//# sourceURL=webpack://english-for-kids/./src/js/storage.js?");

/***/ }),

/***/ "./src/js/utils.js":
/*!*************************!*\
  !*** ./src/js/utils.js ***!
  \*************************/
/*! namespace exports */
/*! export cachePictures [provided] [no usage info] [missing usage info prevents renaming] */
/*! export createSmile [provided] [no usage info] [missing usage info prevents renaming] */
/*! export shuffle [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"shuffle\": () => /* binding */ shuffle,\n/* harmony export */   \"createSmile\": () => /* binding */ createSmile,\n/* harmony export */   \"cachePictures\": () => /* binding */ cachePictures\n/* harmony export */ });\n/* eslint-disable no-param-reassign */\r\nfunction shuffle(array) {\r\n  for (let i = array.length - 1; i > 0; i -= 1) {\r\n    const j = Math.floor(Math.random() * (i + 1));\r\n    [array[i], array[j]] = [array[j], array[i]];\r\n  }\r\n}\r\n\r\nfunction createSmile(source) {\r\n  const smile = new Image();\r\n  smile.classList.add('material-icons', 'smile');\r\n  smile.src = `assets/images/${source}`;\r\n  return smile;\r\n}\r\n\r\nfunction cachePictures(array) {\r\n  if (!cachePictures.set) cachePictures.set = new Set();\r\n  array.forEach((image) => {\r\n    const img = new Image();\r\n    img.src = `assets/images/${image}`;\r\n    cachePictures.set.add(img);\r\n    img.addEventListener('load', () => {\r\n      cachePictures.set.delete(img);\r\n    });\r\n  });\r\n}\r\n\r\n\r\n\n\n//# sourceURL=webpack://english-for-kids/./src/js/utils.js?");

/***/ }),

/***/ "./src/sass/style.scss":
/*!*****************************!*\
  !*** ./src/sass/style.scss ***!
  \*****************************/
/*! namespace exports */
/*! exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__.r, __webpack_exports__, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://english-for-kids/./src/sass/style.scss?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop)
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	// startup
/******/ 	// Load entry module
/******/ 	__webpack_require__("./src/js/index.js");
/******/ 	// This entry module used 'exports' so it can't be inlined
/******/ })()
;