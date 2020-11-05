import GemPuzzle from './puzzle';
import Menu from './menu/menu';
import { setLocal, getLocal } from './storage';

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

let gameSttings = getLocal('puzzleSettings');
if (!gameSttings) {
  gameSttings = {
    numbers: 16,
    type: 'num',
    sound: true,
  };
}

const gemPuzzle = new GemPuzzle(400, gameSttings.numbers, gameSttings.type, gameSttings.sound);
gemPuzzle.generateCells();
// console.log(gemPuzzle.cells);
// console.log(gemPuzzle);
// console.log(gemPuzzle.settings);
gemPuzzle.draw();

function pause() {
  if (gemPuzzle.isPaused) {
    gemPuzzle.overlayOff();
    gemPuzzle.start();
    menu.setTitle('pause', 'PAUSE GAME');
    menu.setValue('pause', '<i class="material-icons-outlined">pause_circle_outline</i>');
  } else {
    gemPuzzle.pause();
    gemPuzzle.overlayOn();
    const info = document.createElement('span');
    info.classList.add('info');
    info.innerHTML = 'GAME PAUSED';
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
}

function win() {
  menu.disableItem('pause');
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
  const marquee = document.createElement('span');
  marquee.classList.add('win');
  marquee.textContent = `Hooray! You solved the puzzle in ${min}:${sec} and ${gemPuzzle.moves} moves`;
  gemPuzzle.overlayOn(0.2);
  gemPuzzle.display(marquee);
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

menu.newgame.addEventListener('click', newGame);
menu.pause.addEventListener('click', () => {
  if (menu.isActive('pause')) pause();
});
menu.top.addEventListener('click', topScore);
menu.settings.addEventListener('click', settings);

document.addEventListener('win', win);
