function clearStatusBar() {
  const statusBar = document.querySelector('.game-status');
  statusBar.innerHTML = '';
}

function outputInStatusBar(element, align = 'center', clear = true) {
  const statBar = document.querySelector('.game-status');
  statBar.className = 'game-status';
  statBar.classList.add(align);
  if (clear) statBar.innerHTML = '';
  statBar.appendChild(element);
}

function add2status(success) {
  const star = document.createElement('i');
  star.classList.add('material-icons');
  if (success) { star.innerHTML = 'star'; } else star.innerHTML = 'star_border';
  outputInStatusBar(star, 'right', false);
}

export { clearStatusBar, outputInStatusBar, add2status };
