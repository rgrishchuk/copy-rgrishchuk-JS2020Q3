import GemPuzzle from './puzzle';
import Menu from './menu/menu';
import { setLocal, getLocal } from './storage';
// import solvePuzzle from './solve/solve';

let audio = document.createElement('audio');
audio.src = './assets/sound/move3.mp3';
audio.classList.add('audio__move');
document.body.prepend(audio);
audio = document.createElement('audio');
audio.src = './assets/sound/win1.mp3';
audio.classList.add('audio__win');
document.body.prepend(audio);

const menu = new Menu(400);
document.body.prepend(menu.element);

let gameSettings = getLocal('puzzleSettings');
if (!gameSettings) {
  gameSettings = {
    numbers: 16,
    type: 'num',
    sound: true,
  };
}
const gemPuzzle = new GemPuzzle(400, gameSettings.numbers, gameSettings.type, gameSettings.sound);
gemPuzzle.generateCells();
gemPuzzle.draw();

function viewSolve(moves) {
  gemPuzzle.isShowSolve = true;
  gemPuzzle.timer.start();
  for (let index = 0; index < moves.length; index += 1) {
    setTimeout(() => { gemPuzzle.move(moves[index]); }, index * 1000);
  }
  gemPuzzle.isPaused = false;
}

function pause() {
  if (gemPuzzle.isPaused) {
    gemPuzzle.overlayOff();
    gemPuzzle.start();
    menu.setTitle('pause', 'PAUSE GAME');
    menu.setValue('pause', '<i class="material-icons-outlined">pause_circle_outline</i>');
  } else {
    gemPuzzle.pause();
    gemPuzzle.overlayOn();
    const info = document.createElement('div');
    info.classList.add('pause');
    const infoTitle = document.createElement('span');
    infoTitle.classList.add('pause__title');
    infoTitle.innerHTML = 'GAME PAUSED';
    info.appendChild(infoTitle);
    if (gemPuzzle.numbers <= 16) {
      const solveInfo = document.createElement('span');
      solveInfo.classList.add('pause__solve-info');
      solveInfo.innerHTML = 'To automatically solve the puzzle, click the button below';
      info.appendChild(solveInfo);
      const solveButton = document.createElement('span');
      solveButton.classList.add('pause__solve-button');
      solveButton.innerHTML = '<i class="material-icons-outlined">memory</i>';
      info.appendChild(solveButton);
      solveButton.addEventListener('click', function handler() {
        menu.disableAll();
        solveButton.removeEventListener('click', handler, false);
        solveInfo.innerHTML = 'Calculation in progress, please wait';
        solveButton.classList.add('animate');
        const worker = new Worker('./src/js/solve/test.js');
        const game = { cells: [], empty: { left: gemPuzzle.empty.left, top: gemPuzzle.empty.top } };
        gemPuzzle.cells.forEach((cell) => {
          const cellNew = {
            value: cell.value,
            left: cell.left,
            top: cell.top,
          };
          game.cells.push(cellNew);
        });
        const start = new Date().getTime();
        worker.postMessage(game);
        worker.onmessage = (e) => {
          menu.activeAll();
          solveButton.classList.remove('animate');
          const stop = new Date().getTime();
          if (e.data && e.data.length > 0) {
            solveInfo.innerHTML = `Operation took ${stop - start} ms.<br>Press play for view result`;
            solveButton.innerHTML = '<i class="material-icons-outlined">play_arrow</i>';
          } else {
            solveInfo.innerHTML = 'Sorry, no solution found';
          }
          console.log(gemPuzzle);
          console.log(e.data);
          worker.terminate();
          solveButton.addEventListener('click', () => {
            menu.disableAll();
            solveButton.removeEventListener('click', handler, false);
            gemPuzzle.overlayOff();
            viewSolve(e.data);
          });
        };
      });
    }
    gemPuzzle.display(info);
    menu.setTitle('pause', 'RESUME GAME');
    menu.setValue('pause', '<i class="material-icons-outlined">play_circle_outline</i>');
  }
}

function saveSettings() {
  const size = parseInt(document.querySelector('#size').value, 10);
  let type = 'img';
  if (document.querySelector('#num').checked) { type = 'num'; }
  const sound = document.querySelector('.settings__sound').classList.contains('ON');
  gemPuzzle.setSettings(size, type, sound);
  // gemPuzzle.setSound(sound);
  setLocal('puzzleSettings', gemPuzzle.settings);
  const inf = document.querySelector('.settings__info');
  inf.textContent = 'Settings applied';
  inf.classList.add('active');
}

function createSettingsForm() {
  const settingsHTML = document.createElement('div');
  settingsHTML.classList.add('settings');
  settingsHTML.innerHTML = '<span class="settings__title">SETTINGS</span>';

  const sizeHTML = document.createElement('div');
  sizeHTML.classList.add('settings__size');
  sizeHTML.innerHTML = '<span class="settings__size__title">Size</span>';
  const sizeSelect = document.createElement('select');
  sizeSelect.id = 'size';
  sizeSelect.classList.add('clickable');
  const sizeArr = [
    { size: '3x3', val: 9 }, { size: '4x4', val: 16 },
    { size: '5x5', val: 25 }, { size: '6x6', val: 36 },
    { size: '7x7', val: 49 }, { size: '8x8', val: 64 },
  ];
  sizeArr.forEach((item) => {
    const option = document.createElement('option');
    option.value = item.val;
    option.text = item.size;
    sizeSelect.appendChild(option);
  });
  sizeSelect.value = gemPuzzle.settings.numbers;
  sizeHTML.appendChild(sizeSelect);
  settingsHTML.appendChild(sizeHTML);

  const typeHTML = document.createElement('div');
  typeHTML.classList.add('settings__type');
  typeHTML.innerHTML = '<span class="settings__type__title">Type</span>';
  let radio = document.createElement('input');
  radio.classList.add('clickable');
  radio.type = 'radio';
  radio.name = 'type';
  radio.id = 'num';
  radio.value = 'num';
  typeHTML.appendChild(radio);
  let label = document.createElement('label');
  label.htmlFor = 'num';
  let description = document.createTextNode('numbers');
  label.appendChild(description);
  if (gemPuzzle.settings.type === 'num') { radio.checked = true; }
  typeHTML.appendChild(label);
  radio = document.createElement('input');
  radio.classList.add('clickable');
  radio.type = 'radio';
  radio.name = 'type';
  radio.id = 'img';
  radio.value = 'img';
  if (gemPuzzle.settings.type === 'img') { radio.checked = true; }
  typeHTML.appendChild(radio);
  label = document.createElement('label');
  label.htmlFor = 'img';
  description = document.createTextNode('image');
  label.appendChild(description);
  typeHTML.appendChild(label);
  settingsHTML.appendChild(typeHTML);

  const soundSettings = document.createElement('span');
  soundSettings.classList.add('settings__sound');
  if (gemPuzzle.settings.sound) {
    soundSettings.innerHTML = '<i class="material-icons">volume_up</i>';
    soundSettings.classList.add('ON');
  } else {
    soundSettings.innerHTML = '<i class="material-icons">volume_off</i>';
    soundSettings.classList.remove('ON');
  }
  settingsHTML.appendChild(soundSettings);
  soundSettings.addEventListener('click', () => {
    document.querySelector('.settings__info').classList.remove('active');
    if (soundSettings.classList.contains('ON')) {
      soundSettings.innerHTML = '<i class="material-icons">volume_off</i>';
      soundSettings.classList.remove('ON');
    } else {
      soundSettings.innerHTML = '<i class="material-icons">volume_up</i>';
      soundSettings.classList.add('ON');
    }
  });

  const applySettings = document.createElement('button');
  applySettings.id = 'apply_settings';
  applySettings.innerHTML = 'Apply';
  settingsHTML.appendChild(applySettings);

  const info = document.createElement('p');
  info.classList.add('settings__info');
  info.textContent = 'INF';
  settingsHTML.appendChild(info);

  applySettings.addEventListener('click', saveSettings);

  return settingsHTML;
}

function settings() {
  if (!gemPuzzle.isPaused) {
    gemPuzzle.pause();
    gemPuzzle.overlayOn();
    menu.setTitle('pause', 'RESUME GAME');
    menu.setValue('pause', '<i class="material-icons-outlined">play_circle_outline</i>');
  }
  gemPuzzle.clearOverlay();
  const settingsForm = createSettingsForm();
  gemPuzzle.display(settingsForm);
  document.querySelectorAll('.clickable').forEach((item) => {
    item.addEventListener('click', () => {
      document.querySelector('.settings__info').classList.remove('active');
    });
  });
}

function newGame() {
  if (gemPuzzle.isPaused) {
    menu.setTitle('pause', 'PAUSE GAME');
    menu.setValue('pause', '<i class="material-icons-outlined">pause_circle_outline</i>');
  }
  gemPuzzle.overlayOff();
  gemPuzzle.newGame();
  gemPuzzle.generateCells();
  gemPuzzle.draw();
  menu.activeItem('pause');
  menu.activeItem('save');
}

function win() {
  menu.disableItem('pause');
  menu.disableItem('save');
  if (gemPuzzle.type === 'img') {
    gemPuzzle.showImage();
  }
  if (gemPuzzle.settings.sound) {
    const music = document.querySelector('.audio__win');
    if (music !== null) {
      music.currentTime = 0;
      music.play();
    }
  }

  let min = `${gemPuzzle.timer.min}`;
  let sec = `${gemPuzzle.timer.sec}`;
  if (min.length === 1) { min = `0${min}`; }
  if (sec.length === 1) { sec = `0${sec}`; }

  const marquee = document.createElement('span');
  marquee.classList.add('win');
  marquee.textContent = `Hooray! You solved the puzzle in ${min}:${sec} and ${gemPuzzle.moves} moves`;
  gemPuzzle.overlayOn(0.2);
  gemPuzzle.display(marquee);

  if (gemPuzzle.isShowSolve) {
    menu.activeItem('newgame');
    menu.activeItem('load');
    menu.activeItem('top');
    menu.activeItem('settings');
    gemPuzzle.isShowSolve = false;
    return;
  }

  const dateNow = new Date().toLocaleString('en', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
  const num = Math.sqrt(gemPuzzle.numbers);
  const winner = {
    date: dateNow,
    moves: gemPuzzle.moves,
    size: `${num}x${num}`,
    type: gemPuzzle.type,
    time: `${min}:${sec}`,
  };
  let winners = getLocal('winners');
  if (!winners) {
    winners = [];
  }
  winners.push(winner);
  if (winners.length > 10) {
    winners.sort((a, b) => a.moves - b.moves);
    winners.length = 10;
  }
  setLocal('winners', winners);
}

function createTopScoreHTML() {
  const topScoreHTML = document.createElement('div');
  topScoreHTML.classList.add('topScore');
  topScoreHTML.innerHTML = '<span class="topScore__title">TOP SCORES</span>';
  const tableTop = document.createElement('table');
  tableTop.classList.add('topScore__table');
  let tr = document.createElement('tr');
  const thead = ['Date', 'Moves', 'Size', 'Type', 'Time'];
  thead.forEach((item) => {
    const th = document.createElement('th');
    th.innerHTML = item;
    tr.appendChild(th);
  });
  tableTop.appendChild(tr);
  const winners = getLocal('winners');
  if (winners) {
    winners.sort((a, b) => a.moves - b.moves);
    winners.forEach((item) => {
      tr = document.createElement('tr');
      tr.innerHTML = `<td>${item.date}</td><td>${item.moves}</td><td>${item.size}</td><td>${item.type}</td><td>${item.time}</td>`;
      tableTop.appendChild(tr);
    });
  }
  topScoreHTML.appendChild(tableTop);
  return topScoreHTML;
}

function topScore() {
  if (!gemPuzzle.isPaused) {
    gemPuzzle.pause();
    gemPuzzle.overlayOn();
    menu.setTitle('pause', 'RESUME GAME');
    menu.setValue('pause', '<i class="material-icons-outlined">play_circle_outline</i>');
  }
  gemPuzzle.clearOverlay();
  gemPuzzle.display(createTopScoreHTML());
}

function save() {
  if (!gemPuzzle.isPaused) {
    gemPuzzle.pause();
    gemPuzzle.overlayOn();
    menu.setTitle('pause', 'RESUME GAME');
    menu.setValue('pause', '<i class="material-icons-outlined">play_circle_outline</i>');
  }
  gemPuzzle.clearOverlay();
  let srcImage = '';
  if (gemPuzzle.img) srcImage = gemPuzzle.img.src;
  const today = new Date().getTime();
  const data = {
    date: today,
    cells: gemPuzzle.cells,
    empty: gemPuzzle.empty,
    moves: gemPuzzle.moves,
    timer: { min: gemPuzzle.timer.min, sec: gemPuzzle.timer.sec },
    type: gemPuzzle.type,
    img: srcImage,
    numbers: gemPuzzle.numbers,
  };
  let saveData = getLocal('puzzleSave');
  if (!saveData) { saveData = []; }
  saveData.push(data);
  setLocal('puzzleSave', saveData);
  const text = document.createElement('span');
  text.innerHTML = 'Game saved';
  text.classList.add('save__info');
  gemPuzzle.display(text);
}

function addZero(item) {
  let result = item.toString();
  if (result.length === 1) {
    result = `0${result}`;
  }
  return result;
}

function createPreview(cells, size, type, img) {
  const miniBox = document.createElement('div');
  miniBox.classList.add('miniBox');
  miniBox.style.height = `${size}px`;
  miniBox.style.width = `${size}px`;
  const cellSize = (size / Math.sqrt(cells.length));
  cells.forEach((cell) => {
    if (cell.value !== 0) {
      const cellElement = document.createElement('div');
      cellElement.classList.add('miniCell');
      cellElement.style.height = `${cellSize}px`;
      cellElement.style.width = `${cellSize}px`;
      cellElement.style.left = `${cell.left * cellSize}px`;
      cellElement.style.top = `${cell.top * cellSize}px`;
      if (type === 'num') {
        cellElement.classList.add('number');
        cellElement.innerHTML = cell.value;
      } else {
        const cellsInRow = Math.sqrt(cells.length);
        const left = (cell.value - 1) % cellsInRow;
        const top = (cell.value - 1 - left) / cellsInRow;
        const fragmentSize = size / Math.sqrt(cells.length);
        const imgTop = 0 - top * fragmentSize;
        const imgLeft = 0 - left * fragmentSize;
        cellElement.style.backgroundSize = `${size}px ${size}px`;
        cellElement.style.backgroundPosition = `${imgLeft}px ${imgTop}px`;
        cellElement.style.backgroundImage = `url('${img}')`;
      }
      miniBox.appendChild(cellElement);
    }
  });
  return miniBox;
}

function createSlider(data) {
  data.sort((a, b) => b.date - a.date);
  const slider = document.createElement('div');
  slider.classList.add('slider');
  const sliderTitle = document.createElement('span');
  sliderTitle.classList.add('slider__title');
  slider.appendChild(sliderTitle);

  const wrapper = document.createElement('div');
  wrapper.classList.add('slider__wrapper');
  slider.appendChild(wrapper);
  const sliderLeft = document.createElement('span');
  sliderLeft.classList.add('slider__left');
  sliderLeft.innerHTML = '<i class="material-icons-outlined">keyboard_arrow_left</i>';
  const sliderRight = document.createElement('span');
  sliderRight.classList.add('slider__right');
  sliderRight.innerHTML = '<i class="material-icons-outlined">keyboard_arrow_right</i>';

  const sliderPreview = document.createElement('div');
  sliderPreview.classList.add('slider__preview');
  const sliderInfo = document.createElement('div');
  sliderInfo.classList.add('slider__info');
  const infoSize = document.createElement('span');
  infoSize.classList.add('slider__info__size');
  const infoMove = document.createElement('span');
  infoMove.classList.add('slider__info__move');
  const infoTime = document.createElement('span');
  infoTime.classList.add('slider__info__time');
  sliderInfo.appendChild(infoSize);
  sliderInfo.appendChild(infoMove);
  sliderInfo.appendChild(infoTime);

  wrapper.appendChild(sliderLeft);
  wrapper.appendChild(sliderPreview);
  wrapper.appendChild(sliderInfo);
  wrapper.appendChild(sliderRight);

  const loadButton = document.createElement('button');
  loadButton.id = 'slider__load';
  loadButton.innerHTML = 'Load';
  slider.appendChild(loadButton);

  function changeSlide(i) {
    sliderTitle.innerHTML = new Date(data[i].date).toLocaleString('en', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour12: false,
      hour: 'numeric',
      minute: 'numeric',
    });
    infoSize.innerHTML = `Size: ${Math.sqrt(data[i].numbers)}x${Math.sqrt(data[i].numbers)}`;
    infoMove.innerHTML = `Moves: ${data[i].moves}`;
    infoTime.innerHTML = `Time: ${addZero(data[i].timer.min)}:${addZero(data[i].timer.sec)}`;
    const prevSlide = document.querySelector('.miniBox');
    if (prevSlide) { sliderPreview.removeChild(prevSlide); }

    sliderPreview.appendChild(createPreview(data[i].cells, 150, data[i].type, data[i].img));
  }

  changeSlide(0);
  let index = 0;
  if (data.length > 1) {
    sliderRight.classList.add('active');

    sliderRight.addEventListener('click', () => {
      if (sliderRight.classList.contains('active')) {
        index += 1;
        if (index === (data.length - 1)) {
          sliderRight.classList.remove('active');
        }
        if (index > 0) {
          sliderLeft.classList.add('active');
        }
        changeSlide(index);
      }
    });

    sliderLeft.addEventListener('click', () => {
      if (sliderLeft.classList.contains('active')) {
        index -= 1;
        if (index === 0) {
          sliderLeft.classList.remove('active');
        }
        if (index < (data.length - 1)) {
          sliderRight.classList.add('active');
        }
        changeSlide(index);
      }
    });
  }

  loadButton.addEventListener('click', () => {
    gemPuzzle.loadGame(data[index]);
    gemPuzzle.overlayOff();
    gemPuzzle.draw(true);
    menu.activeItem('pause');
    menu.activeItem('save');
  });
  return slider;
}

function load() {
  if (!gemPuzzle.isPaused) {
    gemPuzzle.pause();
    gemPuzzle.overlayOn();
    menu.setTitle('pause', 'RESUME GAME');
    menu.setValue('pause', '<i class="material-icons-outlined">play_circle_outline</i>');
  }
  gemPuzzle.clearOverlay();
  const loadedData = getLocal('puzzleSave');
  let content = null;
  if (loadedData) {
    content = createSlider(loadedData);
  } else {
    content = document.createElement('span');
    content.classList.add('load__info');
    content.innerHTML = 'Empty. No saved games';
  }
  gemPuzzle.display(content);
}

menu.newgame.addEventListener('click', () => {
  if (menu.isActive('newgame')) newGame();
});
menu.pause.addEventListener('click', () => {
  if (menu.isActive('pause')) pause();
});
menu.save.addEventListener('click', () => {
  if (menu.isActive('save')) save();
});
menu.load.addEventListener('click', () => {
  if (menu.isActive('load')) load();
});
menu.top.addEventListener('click', () => {
  if (menu.isActive('top')) topScore();
});
menu.settings.addEventListener('click', () => {
  if (menu.isActive('settings')) settings();
});

document.addEventListener('win', win);
