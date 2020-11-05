import Timer from './timer';
import StatusBar from './statbar';
/* eslint-disable no-param-reassign */
/* eslint-disable object-shorthand */
function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default class GemPuzzle {
  constructor(size, numbers, type = 'num', sound) {
    this.size = size;
    this.cellSize = (this.size / Math.sqrt(numbers));
    this.numbers = numbers;
    this.moves = 0;
    this.type = type;
    this.statusbar = new StatusBar(size);
    this.timer = new Timer(this.statusbar);
    this.statusbar.setTimer(this.timer);
    this.statusbar.setMoves(this.moves);
    this.isEnableEvent = true;
    this.isPaused = false;
    if (this.type === 'img') {
      this.img = new Image();
      this.img.src = `assets/images/${getRandomIntInclusive(1, 150)}.jpg`;
      // this.img.src = 'assets/images/33.jpg';
      console.log(this.img);
    }
    this.setSettings(this.numbers, this.type, sound);
  }

  showImage() {
    document.querySelectorAll('.cell').forEach((cell) => {
      cell.parentNode.removeChild(cell);
    });
    const gameBox = document.querySelector('.box');
    gameBox.style.backgroundSize = `${this.size}px ${this.size}px`;
    gameBox.style.backgroundImage = `url('${this.img.src}')`;
  }

  newGame() {
    this.timer.stop();
    this.timer.clear();
    this.moves = 0;
    this.statusbar.setMoves(this.moves);
    this.statusbar.setTimer(this.timer);
    this.numbers = this.settings.numbers;
    this.cellSize = (this.size / Math.sqrt(this.numbers));
    this.type = this.settings.type;
    this.isEnableEvent = true;
    this.isPaused = false;
    const gameBox = document.querySelector('.box');
    gameBox.style.backgroundSize = '';
    gameBox.style.backgroundImage = '';
    if (this.type === 'img') {
      this.img = new Image();
      this.img.src = `assets/images/${getRandomIntInclusive(1, 150)}.jpg`;
    }
  }

  setSettings(numbers, type, sound) {
    this.settings = {
      numbers: numbers,
      type: type,
      sound: sound,
    };
  }

  move(index) {
    const cell = this.cells[index];
    if (Math.abs(cell.top - this.empty.top) + Math.abs(cell.left - this.empty.left) > 1) {
      // cell.element.style.left = `${cell.left * this.cellSize}px`;
      // cell.element.style.top = `${cell.top * this.cellSize}px`;
      return;
    }
    if (this.settings.sound) {
      const audio = document.querySelector('.audio__move');
      if (audio !== null) {
        audio.currentTime = 0;
        audio.play();
      }
    }
    const currLeft = cell.left;
    const currTop = cell.top;
    cell.left = this.empty.left;
    cell.top = this.empty.top;
    cell.element.style.left = `${cell.left * this.cellSize}px`;
    cell.element.style.top = `${cell.top * this.cellSize}px`;
    this.empty.left = currLeft;
    this.empty.top = currTop;
    this.empty.element.style.left = `${this.empty.left * this.cellSize}px`;
    this.empty.element.style.top = `${this.empty.top * this.cellSize}px`;
    this.moves += 1;
    this.statusbar.setMoves(this.moves);
  }

  generateCells() {
    let numbers = [...Array(this.numbers).keys()]
      .map((item) => item);
    numbers = numbers.slice(1).concat(0);
    let emptyIndex = null;
    let emptyLeft = null;
    let emptyTop = null;
    let nearIndex = null;
    const near = [];
    const cellsInRow = Math.sqrt(this.numbers);
    const rows = this.numbers / cellsInRow;
    // console.log(`${rows} - ${cellsInRow}`);
    for (let i = 0; i < 100 * cellsInRow; i += 1) {
      near.length = 0;
      emptyIndex = numbers.indexOf(0);
      emptyLeft = (emptyIndex) % cellsInRow;
      emptyTop = (emptyIndex - emptyLeft) / cellsInRow;
      if (emptyTop !== 0) {
        near.push(emptyIndex - cellsInRow);
      }
      if (emptyLeft !== 0) {
        near.push(emptyIndex - 1);
      }
      if (emptyTop !== rows - 1) {
        near.push(emptyIndex + cellsInRow);
      }
      if (emptyLeft !== cellsInRow - 1) {
        near.push(emptyIndex + 1);
      }
      nearIndex = near[getRandomIntInclusive(0, near.length - 1)];
      numbers[emptyIndex] = numbers[nearIndex];
      numbers[nearIndex] = 0;
      // console.log(`nearIndex ${nearIndex}`);
      // console.log(near);
      // console.log(numbers);
      // console.log(near);
      // console.log(`${emptyLeft} - ${emptyTop}`);
      // console.log(emptyIndex);
    }
    numbers = [1, 2, 3, 4, 5, 6, 7, 8, 0];
    this.cells = [];
    numbers.forEach((num) => this.cells.push({ value: num }));
  }

  draw() {
    let gameBox = document.querySelector('.box');
    if (gameBox == null) {
      gameBox = document.createElement('div');
      gameBox.classList.add('box');
      gameBox.style.height = `${this.size}px`;
      gameBox.style.width = `${this.size}px`;
      this.overlay = document.createElement('div');
      this.overlay.classList.add('overlay');
      gameBox.appendChild(this.overlay);
      document.body.prepend(gameBox);
      document.body.prepend(this.statusbar.element);
    } else {
      document.querySelectorAll('.cell').forEach((cell) => {
        cell.parentNode.removeChild(cell);
      });
    }
    const cellsInRow = Math.sqrt(this.numbers);
    this.cells.forEach((cell, index) => {
      const left = (index) % cellsInRow;
      const top = (index - left) / cellsInRow;

      const cellElement = document.createElement('div');
      cellElement.classList.add('cell');
      cellElement.style.height = `${this.cellSize}px`;
      cellElement.style.width = `${this.cellSize}px`;
      cellElement.style.left = `${left * this.cellSize}px`;
      cellElement.style.top = `${top * this.cellSize}px`;
      if (cell.value === 0) {
        cellElement.classList.add('empty');
        gameBox.appendChild(cellElement);
        this.empty = {
          left: left,
          top: top,
          element: cellElement,
        };
      } else {
        cell.top = top;
        cell.left = left;
        cell.element = cellElement;
        if (this.type === 'num') { cellElement.innerHTML = cell.value; } else { this.insertImg(cellElement, cell); }
        gameBox.appendChild(cellElement);
        this.addEventCell(cellElement, index);
      }
    });
    this.timer.start();
  }

  addEventCell(cell, index) {
    cell.addEventListener('transitionstart', () => {
      this.isEnableEvent = false;
    });

    cell.addEventListener('transitionend', () => {
      this.isEnableEvent = true;
      if (this.isFinish()) {
        this.timer.stop();
        document.dispatchEvent(new Event('win', { bubbles: true }));
        // alert('You win!!!');
      }
    });

    cell.addEventListener('mousedown', (event) => {
      if (!this.isEnableEvent) { return; }
      const cellCopy = cell.cloneNode(true);
      cellCopy.classList.add('copy');
      document.body.appendChild(cellCopy);
      let elemBelow = null;

      const shiftX = event.clientX - cell.getBoundingClientRect().left;
      const shiftY = event.clientY - cell.getBoundingClientRect().top;
      const startLeft = `${event.pageX - shiftX}px`;
      const startTop = `${event.pageY - shiftY}px`;
      // cell.classList.add('hidden');

      cellCopy.classList.add('not-animate');
      cellCopy.style.zIndex = 1000;
      // document.body.appendChild(cell);

      function moveAt(pageX, pageY) {
        cellCopy.style.left = `${pageX - shiftX}px`;
        cellCopy.style.top = `${pageY - shiftY}px`;
      }

      function onMouseMove(event) {
        moveAt(event.pageX, event.pageY);
        cellCopy.classList.add('hidden');
        elemBelow = document.elementFromPoint(event.clientX, event.clientY);
        cellCopy.classList.remove('hidden');
      }

      cellCopy.ondragstart = () => false;
      moveAt(event.pageX, event.pageY);
      document.addEventListener('mousemove', onMouseMove);
      cellCopy.onmouseup = () => {
        document.removeEventListener('mousemove', onMouseMove);
        cellCopy.onmouseup = null;
        cellCopy.style.zIndex = 0;
        cellCopy.classList.add('hidden');
        cellCopy.parentNode.removeChild(cellCopy);
        if (elemBelow && elemBelow.closest('.empty')) {
          this.move(index);
        } else if (Math.abs(parseFloat(cellCopy.style.left) - parseFloat(startLeft)) < 5
            && Math.abs(parseFloat(cellCopy.style.top) - parseFloat(startTop)) < 5) {
          this.move(index);
        }
        // else { this.isEnableEvent = true; }
      };
    });
  }

  insertImg(cellElement, cell) {
    const cellsInRow = Math.sqrt(this.numbers);
    const left = (cell.value - 1) % cellsInRow;
    const top = (cell.value - 1 - left) / cellsInRow;
    const fragmentSize = this.size / Math.sqrt(this.numbers);
    const imgTop = 0 - top * fragmentSize;
    const imgLeft = 0 - left * fragmentSize;
    cellElement.style.backgroundSize = `${this.size}px ${this.size}px`;
    cellElement.style.backgroundPosition = `${imgLeft}px ${imgTop}px`;
    cellElement.style.backgroundImage = `url('${this.img.src}')`;
  }

  overlayOn(opacity = 0.8) {
    if (this.overlay) {
      this.overlay.classList.add('active');
      this.overlay.style.background = `rgba(0, 0, 0, ${opacity})`;
    }
  }

  overlayOff() {
    if (this.overlay) {
      this.clearOverlay();
      this.overlay.classList.remove('active');
      this.overlay.style.background = '';
    }
  }

  clearOverlay() {
    if (this.overlay) {
      this.overlay.innerHTML = '';
    }
  }

  display(element) {
    console.log(element);
    if (this.overlay) this.overlay.appendChild(element);
  }

  pause() {
    this.isPaused = true;
    this.timer.stop();
  }

  start() {
    this.isPaused = false;
    this.timer.start();
  }

  isFinish() {
    return this.cells.every((cell) => {
      if (cell.value === 0) {
        return true;
      }
      return cell.value === cell.top * Math.sqrt(this.numbers) + cell.left + 1;
    });
  }
}
