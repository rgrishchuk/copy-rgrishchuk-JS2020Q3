import Timer from './timer';
/* eslint-disable no-param-reassign */
/* eslint-disable object-shorthand */
function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

class GemPuzzle {
  constructor(size, numbers, type = 'num') {
    this.size = size;
    this.cellSize = (this.size / Math.sqrt(numbers));
    this.numbers = numbers;
    this.moves = 0;
    this.type = type;
    this.isEnableEvent = true;
    if (this.type === 'img') {
      this.img = new Image();
      this.img.src = `assets/images/${getRandomIntInclusive(1, 150)}.jpg`;
      // this.img.src = 'assets/images/33.jpg';
      console.log(this.img);
    }
  }

  // isSolvable(numbers) {
  //   let sum = 0;
  //   let emptyIndex = 0;
  //   for (let i = 0; i < numbers.length; i++) {
  //     console.log(sum);
  //     if (numbers[i] !== 0) {
  //       for (let j = i + 1; j < numbers.length; j++) {
  //         if (numbers[i] > numbers[j] && numbers[i] !== 0 && numbers[j] !== 0) {
  //           console.log(`${numbers[i]} - ${numbers[j]}`);
  //           sum = sum + 1;
  //         };
  //       }
  //     } else {emptyIndex = i + 1};
  //   }
  //   sum = sum + Math.ceil(emptyIndex / Math.sqrt(this.numbers));
  //   console.log(numbers);
  //   //console.log(emptyIndex % Math.sqrt(this.numbers) + 1);
  //   console.log(Math.ceil(emptyIndex / Math.sqrt(this.numbers)));
  //   console.log(sum);
  //   console.log(sum % 2 === 0);
  //   //return (sum % 2) === 0;
  //   if (this.numbers % 2 === 0) {
  //     return (sum % 2 === 0)
  //   } else {
  //     return (sum % 2 !== 0)
  //   }
  // }

  move(index) {
    const cell = this.cells[index];
    if (Math.abs(cell.top - this.empty.top) + Math.abs(cell.left - this.empty.left) > 1) {
      // cell.element.style.left = `${cell.left * this.cellSize}px`;
      // cell.element.style.top = `${cell.top * this.cellSize}px`;
      return;
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
  }

  generateCells() {
    let numbers = [...Array(this.numbers).keys()]
      .map((item) => item);
    numbers = numbers.slice(1).concat(0);
    let emptyIndex = null;
    let emptyLeft = null;
    let emptyTop = null;
    console.log(numbers);
    for (let i = 0; i < 100; i += 1) {
      emptyIndex = numbers.indexOf(0);
      console.log(emptyIndex);
    }
    //numbers = [3, 4, 2, 0, 5, 8, 7, 1, 6];
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
      document.body.prepend(gameBox);
    } else {
      while (gameBox.firstChild) {
        gameBox.removeChild(gameBox.firstChild);
      }
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
        if (this.type === 'num') { cellElement.innerHTML = cell.value; } else { cellElement.innerHTML = cell.value; this.insertImg(cellElement, cell); }
        gameBox.appendChild(cellElement);
        this.addEventCell(cellElement, index);
      }
    });
  }

  addEventCell(cell, index) {
    cell.addEventListener('transitionstart', () => {
      this.isEnableEvent = false;
    });

    cell.addEventListener('transitionend', () => {
      this.isEnableEvent = true;
      if (this.isFinish()) { alert('You win!!!'); }
    });

    cell.addEventListener('mousedown', (event) => {
      if (!this.isEnableEvent) { return; };
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

  isFinish() {
    return this.cells.every((cell) => {
      if (cell.value === 0) {
        return true;
      }
      return cell.value === cell.top * Math.sqrt(this.numbers) + cell.left + 1;
    });
  }
}

// const timer = new Timer();
// timer.start();
// setInterval(() => { console.log(timer.getTime())},1000);
const gemPuzzle = new GemPuzzle(600, 9, 'num');
gemPuzzle.generateCells();
console.log(gemPuzzle.cells);
gemPuzzle.draw();
