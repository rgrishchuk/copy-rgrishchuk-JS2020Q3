export default class StatusBar {
  constructor(width) {
    this.element = document.createElement('div');
    this.element.classList.add('statusbar');
    this.setWidth(width);
    // add timer
    let el = document.createElement('div');
    el.classList.add('timer');
    let title = document.createElement('span');
    title.classList.add('timer__title');
    title.innerHTML = '<i class="material-icons">timer</i>';
    el.appendChild(title);
    let value = document.createElement('span');
    value.classList.add('timer__value');
    this.timer = value;
    el.appendChild(value);
    this.element.appendChild(el);
    // add moves
    el = document.createElement('div');
    el.classList.add('moves');
    title = document.createElement('span');
    title.classList.add('moves__title');
    title.innerHTML = '<b>Moves:</b>';
    el.appendChild(title);
    value = document.createElement('span');
    value.classList.add('moves__value');
    this.moves = value;
    el.appendChild(value);
    this.element.appendChild(el);
  }

  setWidth(width) {
    this.element.style.width = `${width}px`;
  }

  setTimer(timer) {
    let min = `${timer.min}`;
    let sec = `${timer.sec}`;
    if (min.length === 1) { min = `0${min}`; }
    if (sec.length === 1) { sec = `0${sec}`; }
    this.timer.innerHTML = `${min}:${sec}`;
  }

  setMoves(moves) {
    this.moves.innerHTML = moves;
  }
}
