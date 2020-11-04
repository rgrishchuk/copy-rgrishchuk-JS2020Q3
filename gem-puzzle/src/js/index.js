import GemPuzzle from './puzzle';
import Menu from './menu/menu';
// const timer = new Timer();
// timer.start();
// setInterval(() => { console.log(timer.getTime())},1000);
// define menu
const menu = new Menu(400);
document.body.prepend(menu.element);
menu.pause.addEventListener('click', pause);

const gemPuzzle = new GemPuzzle(400, 9, 'num');
gemPuzzle.generateCells();
console.log(gemPuzzle.cells);
console.log(gemPuzzle);
gemPuzzle.draw();

function pause() {
  if (gemPuzzle.isPaused) {
    gemPuzzle.start();
    menu.setTitle('pause', 'PAUSE GAME');
    menu.setValue('pause', '<i class="material-icons-outlined">pause_circle_outline</i>');
  } else {
    gemPuzzle.pause();
    menu.setTitle('pause', 'RESUME GAME');
    menu.setValue('pause', '<i class="material-icons-outlined">play_circle_outline</i>');
  }
}