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

/***/ "./src/js/index.js":
/*!*************************!*\
  !*** ./src/js/index.js ***!
  \*************************/
/*! namespace exports */
/*! exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _puzzle__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./puzzle */ \"./src/js/puzzle.js\");\n/* harmony import */ var _menu_menu__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./menu/menu */ \"./src/js/menu/menu.js\");\n\r\n\r\n// const timer = new Timer();\r\n// timer.start();\r\n// setInterval(() => { console.log(timer.getTime())},1000);\r\n// define menu\r\nconst menu = new _menu_menu__WEBPACK_IMPORTED_MODULE_1__.default(400);\r\ndocument.body.prepend(menu.element);\r\nmenu.pause.addEventListener('click', pause);\r\n\r\nconst gemPuzzle = new _puzzle__WEBPACK_IMPORTED_MODULE_0__.default(400, 9, 'num');\r\ngemPuzzle.generateCells();\r\nconsole.log(gemPuzzle.cells);\r\nconsole.log(gemPuzzle);\r\ngemPuzzle.draw();\r\n\r\nfunction pause() {\r\n  if (gemPuzzle.isPaused) {\r\n    gemPuzzle.start();\r\n    menu.setTitle('pause', 'PAUSE GAME');\r\n    menu.setValue('pause', '<i class=\"material-icons-outlined\">pause_circle_outline</i>');\r\n  } else {\r\n    gemPuzzle.pause();\r\n    menu.setTitle('pause', 'RESUME GAME');\r\n    menu.setValue('pause', '<i class=\"material-icons-outlined\">play_circle_outline</i>');\r\n  }\r\n}\n\n//# sourceURL=webpack://gem-puzzle/./src/js/index.js?");

/***/ }),

/***/ "./src/js/menu/menu.js":
/*!*****************************!*\
  !*** ./src/js/menu/menu.js ***!
  \*****************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => /* binding */ Menu\n/* harmony export */ });\n/* harmony import */ var _mn_items__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./mn_items */ \"./src/js/menu/mn_items.js\");\n\r\n\r\nclass Menu {\r\n  constructor(width) {\r\n    this.element = document.createElement('div');\r\n    this.element.classList.add('menu');\r\n    this.element.style.width = `${width}px`;\r\n    const ul = document.createElement('ul');\r\n    ul.classList.add('menu__list');\r\n    _mn_items__WEBPACK_IMPORTED_MODULE_0__.default.forEach((item) => {\r\n      const li = document.createElement('li');\r\n      li.classList.add('menu__list__item', 'active');\r\n      li.innerHTML = item.value;\r\n      li.title = item.title;\r\n      ul.appendChild(li);\r\n      this[item.name] = li;\r\n    });\r\n    this.element.appendChild(ul);\r\n  }\r\n\r\n  setValue(item, value) {\r\n    this[item].innerHTML = value;\r\n  }\r\n\r\n  setTitle(item, title) {\r\n    this[item].title = title;\r\n  }\r\n\r\n  isActive(item) {\r\n    // return this[item]\r\n  }\r\n}\r\n\n\n//# sourceURL=webpack://gem-puzzle/./src/js/menu/menu.js?");

/***/ }),

/***/ "./src/js/menu/mn_items.js":
/*!*********************************!*\
  !*** ./src/js/menu/mn_items.js ***!
  \*********************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_exports__, __webpack_require__.r, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => __WEBPACK_DEFAULT_EXPORT__\n/* harmony export */ });\nconst menuItems = [\r\n  {\r\n    name: 'pause',\r\n    value: '<i class=\"material-icons-outlined\">pause_circle_outline</i>',\r\n    title: 'PAUSE GAME',\r\n  },\r\n  {\r\n    name: 'settings',\r\n    value: '<i class=\"material-icons-outlined\">settings</i>',\r\n    title: 'SETTINGS',\r\n  },\r\n];\r\n\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (menuItems);\r\n\n\n//# sourceURL=webpack://gem-puzzle/./src/js/menu/mn_items.js?");

/***/ }),

/***/ "./src/js/puzzle.js":
/*!**************************!*\
  !*** ./src/js/puzzle.js ***!
  \**************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => /* binding */ GemPuzzle\n/* harmony export */ });\n/* harmony import */ var _timer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./timer */ \"./src/js/timer.js\");\n/* harmony import */ var _statbar__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./statbar */ \"./src/js/statbar.js\");\n\r\n\r\n/* eslint-disable no-param-reassign */\r\n/* eslint-disable object-shorthand */\r\nfunction getRandomIntInclusive(min, max) {\r\n  min = Math.ceil(min);\r\n  max = Math.floor(max);\r\n  return Math.floor(Math.random() * (max - min + 1)) + min;\r\n}\r\n\r\nclass GemPuzzle {\r\n  constructor(size, numbers, type = 'num') {\r\n    this.size = size;\r\n    this.cellSize = (this.size / Math.sqrt(numbers));\r\n    this.numbers = numbers;\r\n    this.moves = 0;\r\n    this.type = type;\r\n    this.statusbar = new _statbar__WEBPACK_IMPORTED_MODULE_1__.default(size);\r\n    this.timer = new _timer__WEBPACK_IMPORTED_MODULE_0__.default(this.statusbar);\r\n    this.statusbar.setTimer(this.timer);\r\n    this.statusbar.setMoves(this.moves);\r\n    this.isEnableEvent = true;\r\n    this.isPaused = false;\r\n    if (this.type === 'img') {\r\n      this.img = new Image();\r\n      this.img.src = `assets/images/${getRandomIntInclusive(1, 150)}.jpg`;\r\n      // this.img.src = 'assets/images/33.jpg';\r\n      console.log(this.img);\r\n    }\r\n  }\r\n\r\n  // isSolvable(numbers) {\r\n  //   let sum = 0;\r\n  //   let emptyIndex = 0;\r\n  //   for (let i = 0; i < numbers.length; i++) {\r\n  //     console.log(sum);\r\n  //     if (numbers[i] !== 0) {\r\n  //       for (let j = i + 1; j < numbers.length; j++) {\r\n  //         if (numbers[i] > numbers[j] && numbers[i] !== 0 && numbers[j] !== 0) {\r\n  //           console.log(`${numbers[i]} - ${numbers[j]}`);\r\n  //           sum = sum + 1;\r\n  //         };\r\n  //       }\r\n  //     } else {emptyIndex = i + 1};\r\n  //   }\r\n  //   sum = sum + Math.ceil(emptyIndex / Math.sqrt(this.numbers));\r\n  //   console.log(numbers);\r\n  //   //console.log(emptyIndex % Math.sqrt(this.numbers) + 1);\r\n  //   console.log(Math.ceil(emptyIndex / Math.sqrt(this.numbers)));\r\n  //   console.log(sum);\r\n  //   console.log(sum % 2 === 0);\r\n  //   //return (sum % 2) === 0;\r\n  //   if (this.numbers % 2 === 0) {\r\n  //     return (sum % 2 === 0)\r\n  //   } else {\r\n  //     return (sum % 2 !== 0)\r\n  //   }\r\n  // }\r\n\r\n  move(index) {\r\n    const cell = this.cells[index];\r\n    if (Math.abs(cell.top - this.empty.top) + Math.abs(cell.left - this.empty.left) > 1) {\r\n      // cell.element.style.left = `${cell.left * this.cellSize}px`;\r\n      // cell.element.style.top = `${cell.top * this.cellSize}px`;\r\n      return;\r\n    }\r\n    const currLeft = cell.left;\r\n    const currTop = cell.top;\r\n    cell.left = this.empty.left;\r\n    cell.top = this.empty.top;\r\n    cell.element.style.left = `${cell.left * this.cellSize}px`;\r\n    cell.element.style.top = `${cell.top * this.cellSize}px`;\r\n    this.empty.left = currLeft;\r\n    this.empty.top = currTop;\r\n    this.empty.element.style.left = `${this.empty.left * this.cellSize}px`;\r\n    this.empty.element.style.top = `${this.empty.top * this.cellSize}px`;\r\n    this.moves += 1;\r\n    this.statusbar.setMoves(this.moves);\r\n  }\r\n\r\n  generateCells() {\r\n    let numbers = [...Array(this.numbers).keys()]\r\n      .map((item) => item);\r\n    numbers = numbers.slice(1).concat(0);\r\n    let emptyIndex = null;\r\n    let emptyLeft = null;\r\n    let emptyTop = null;\r\n    let nearIndex = null;\r\n    const near = [];\r\n    const cellsInRow = Math.sqrt(this.numbers);\r\n    const rows = this.numbers / cellsInRow;\r\n    // console.log(`${rows} - ${cellsInRow}`);\r\n    for (let i = 0; i < 100 * cellsInRow; i += 1) {\r\n      near.length = 0;\r\n      emptyIndex = numbers.indexOf(0);\r\n      emptyLeft = (emptyIndex) % cellsInRow;\r\n      emptyTop = (emptyIndex - emptyLeft) / cellsInRow;\r\n      if (emptyTop !== 0) {\r\n        near.push(emptyIndex - cellsInRow);\r\n      }\r\n      if (emptyLeft !== 0) {\r\n        near.push(emptyIndex - 1);\r\n      }\r\n      if (emptyTop !== rows - 1) {\r\n        near.push(emptyIndex + cellsInRow);\r\n      }\r\n      if (emptyLeft !== cellsInRow - 1) {\r\n        near.push(emptyIndex + 1);\r\n      }\r\n      nearIndex = near[getRandomIntInclusive(0, near.length - 1)];\r\n      numbers[emptyIndex] = numbers[nearIndex];\r\n      numbers[nearIndex] = 0;\r\n      // console.log(`nearIndex ${nearIndex}`);\r\n      // console.log(near);\r\n      // console.log(numbers);\r\n      // console.log(near);\r\n      // console.log(`${emptyLeft} - ${emptyTop}`);\r\n      // console.log(emptyIndex);\r\n    }\r\n    // numbers = [3, 4, 2, 0, 5, 8, 7, 1, 6];\r\n    this.cells = [];\r\n    numbers.forEach((num) => this.cells.push({ value: num }));\r\n  }\r\n\r\n  draw() {\r\n    let gameBox = document.querySelector('.box');\r\n    if (gameBox == null) {\r\n      gameBox = document.createElement('div');\r\n      gameBox.classList.add('box');\r\n      gameBox.style.height = `${this.size}px`;\r\n      gameBox.style.width = `${this.size}px`;\r\n      document.body.prepend(gameBox);\r\n      document.body.prepend(this.statusbar.element);\r\n    } else {\r\n      while (gameBox.firstChild) {\r\n        gameBox.removeChild(gameBox.firstChild);\r\n      }\r\n    }\r\n    const cellsInRow = Math.sqrt(this.numbers);\r\n    this.cells.forEach((cell, index) => {\r\n      const left = (index) % cellsInRow;\r\n      const top = (index - left) / cellsInRow;\r\n\r\n      const cellElement = document.createElement('div');\r\n      cellElement.classList.add('cell');\r\n      cellElement.style.height = `${this.cellSize}px`;\r\n      cellElement.style.width = `${this.cellSize}px`;\r\n      cellElement.style.left = `${left * this.cellSize}px`;\r\n      cellElement.style.top = `${top * this.cellSize}px`;\r\n      if (cell.value === 0) {\r\n        cellElement.classList.add('empty');\r\n        gameBox.appendChild(cellElement);\r\n        this.empty = {\r\n          left: left,\r\n          top: top,\r\n          element: cellElement,\r\n        };\r\n      } else {\r\n        cell.top = top;\r\n        cell.left = left;\r\n        cell.element = cellElement;\r\n        if (this.type === 'num') { cellElement.innerHTML = cell.value; } else { cellElement.innerHTML = cell.value; this.insertImg(cellElement, cell); }\r\n        gameBox.appendChild(cellElement);\r\n        this.addEventCell(cellElement, index);\r\n      }\r\n    });\r\n    this.timer.start();\r\n  }\r\n\r\n  addEventCell(cell, index) {\r\n    cell.addEventListener('transitionstart', () => {\r\n      this.isEnableEvent = false;\r\n    });\r\n\r\n    cell.addEventListener('transitionend', () => {\r\n      this.isEnableEvent = true;\r\n      if (this.isFinish()) {\r\n        this.timer.stop();\r\n        alert('You win!!!');\r\n      }\r\n    });\r\n\r\n    cell.addEventListener('mousedown', (event) => {\r\n      if (!this.isEnableEvent) { return; }\r\n      const cellCopy = cell.cloneNode(true);\r\n      cellCopy.classList.add('copy');\r\n      document.body.appendChild(cellCopy);\r\n      let elemBelow = null;\r\n\r\n      const shiftX = event.clientX - cell.getBoundingClientRect().left;\r\n      const shiftY = event.clientY - cell.getBoundingClientRect().top;\r\n      const startLeft = `${event.pageX - shiftX}px`;\r\n      const startTop = `${event.pageY - shiftY}px`;\r\n      // cell.classList.add('hidden');\r\n\r\n      cellCopy.classList.add('not-animate');\r\n      cellCopy.style.zIndex = 1000;\r\n      // document.body.appendChild(cell);\r\n\r\n      function moveAt(pageX, pageY) {\r\n        cellCopy.style.left = `${pageX - shiftX}px`;\r\n        cellCopy.style.top = `${pageY - shiftY}px`;\r\n      }\r\n\r\n      function onMouseMove(event) {\r\n        moveAt(event.pageX, event.pageY);\r\n        cellCopy.classList.add('hidden');\r\n        elemBelow = document.elementFromPoint(event.clientX, event.clientY);\r\n        cellCopy.classList.remove('hidden');\r\n      }\r\n\r\n      cellCopy.ondragstart = () => false;\r\n      moveAt(event.pageX, event.pageY);\r\n      document.addEventListener('mousemove', onMouseMove);\r\n      cellCopy.onmouseup = () => {\r\n        document.removeEventListener('mousemove', onMouseMove);\r\n        cellCopy.onmouseup = null;\r\n        cellCopy.style.zIndex = 0;\r\n        cellCopy.classList.add('hidden');\r\n        cellCopy.parentNode.removeChild(cellCopy);\r\n        if (elemBelow && elemBelow.closest('.empty')) {\r\n          this.move(index);\r\n        } else if (Math.abs(parseFloat(cellCopy.style.left) - parseFloat(startLeft)) < 5\r\n            && Math.abs(parseFloat(cellCopy.style.top) - parseFloat(startTop)) < 5) {\r\n          this.move(index);\r\n        }\r\n        // else { this.isEnableEvent = true; }\r\n      };\r\n    });\r\n  }\r\n\r\n  insertImg(cellElement, cell) {\r\n    const cellsInRow = Math.sqrt(this.numbers);\r\n    const left = (cell.value - 1) % cellsInRow;\r\n    const top = (cell.value - 1 - left) / cellsInRow;\r\n    const fragmentSize = this.size / Math.sqrt(this.numbers);\r\n    const imgTop = 0 - top * fragmentSize;\r\n    const imgLeft = 0 - left * fragmentSize;\r\n    cellElement.style.backgroundSize = `${this.size}px ${this.size}px`;\r\n    cellElement.style.backgroundPosition = `${imgLeft}px ${imgTop}px`;\r\n    cellElement.style.backgroundImage = `url('${this.img.src}')`;\r\n  }\r\n\r\n  pause() {\r\n    this.isPaused = true;\r\n    this.timer.stop();\r\n  }\r\n\r\n  start() {\r\n    this.isPaused = false;\r\n    this.timer.start();\r\n  }\r\n\r\n  isFinish() {\r\n    return this.cells.every((cell) => {\r\n      if (cell.value === 0) {\r\n        return true;\r\n      }\r\n      return cell.value === cell.top * Math.sqrt(this.numbers) + cell.left + 1;\r\n    });\r\n  }\r\n}\r\n\n\n//# sourceURL=webpack://gem-puzzle/./src/js/puzzle.js?");

/***/ }),

/***/ "./src/js/statbar.js":
/*!***************************!*\
  !*** ./src/js/statbar.js ***!
  \***************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => /* binding */ StatusBar\n/* harmony export */ });\nclass StatusBar {\r\n  constructor(width) {\r\n    this.element = document.createElement('div');\r\n    this.element.classList.add('statusbar');\r\n    this.setWidth(width);\r\n    // add timer\r\n    let el = document.createElement('div');\r\n    el.classList.add('timer');\r\n    let title = document.createElement('span');\r\n    title.classList.add('timer__title');\r\n    title.innerHTML = '<i class=\"material-icons\">timer</i>';\r\n    el.appendChild(title);\r\n    let value = document.createElement('span');\r\n    value.classList.add('timer__value');\r\n    this.timer = value;\r\n    el.appendChild(value);\r\n    this.element.appendChild(el);\r\n    // add moves\r\n    el = document.createElement('div');\r\n    el.classList.add('moves');\r\n    title = document.createElement('span');\r\n    title.classList.add('moves__title');\r\n    title.innerHTML = 'Moves:';\r\n    el.appendChild(title);\r\n    value = document.createElement('span');\r\n    value.classList.add('moves__value');\r\n    this.moves = value;\r\n    el.appendChild(value);\r\n    this.element.appendChild(el);\r\n  }\r\n\r\n  setWidth(width) {\r\n    this.element.style.width = `${width}px`;\r\n  }\r\n\r\n  setTimer(timer) {\r\n    let min = `${timer.min}`;\r\n    let sec = `${timer.sec}`;\r\n    if (min.length === 1) { min = `0${min}`; }\r\n    if (sec.length === 1) { sec = `0${sec}`; }\r\n    this.timer.innerHTML = `${min}:${sec}`;\r\n  }\r\n\r\n  setMoves(moves) {\r\n    this.moves.innerHTML = moves;\r\n  }\r\n}\r\n\n\n//# sourceURL=webpack://gem-puzzle/./src/js/statbar.js?");

/***/ }),

/***/ "./src/js/timer.js":
/*!*************************!*\
  !*** ./src/js/timer.js ***!
  \*************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => /* binding */ Timer\n/* harmony export */ });\n// import StatusBar from './statbar';\r\nclass Timer {\r\n  constructor(statusBar) {\r\n    this.min = 0;\r\n    this.sec = 0;\r\n    this.statusBar = statusBar;\r\n    console.log(this.statusBar);\r\n  }\r\n\r\n  time() {\r\n    if (this.sec === 59) {\r\n      this.min += 1;\r\n      this.sec = 0;\r\n    } else this.sec += 1;\r\n    if (this.statusBar) {\r\n      this.statusBar.setTimer(this);\r\n    }\r\n  }\r\n\r\n  getTime() {\r\n    return { min: this.min, sec: this.sec };\r\n  }\r\n\r\n  clear() {\r\n    this.min = 0;\r\n    this.sec = 0;\r\n  }\r\n\r\n  start() {\r\n    console.log('start timer');\r\n    const time = this.time.bind(this);\r\n    this.timer = setInterval(time, 1000);\r\n    // this.timer = setInterval( () => { this.time() }, 1000);\r\n  }\r\n\r\n  stop() {\r\n    if (this.timer) {\r\n      clearInterval(this.timer);\r\n    }\r\n  }\r\n}\r\n\n\n//# sourceURL=webpack://gem-puzzle/./src/js/timer.js?");

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