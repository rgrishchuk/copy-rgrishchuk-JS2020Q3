export function clearStatusBar() {
  const statusBar = document.querySelector('.game-status');
  statusBar.innerHTML = '';
}

export function outputInStatusBar(element, align = 'center', clear = true) {
  const statBar = document.querySelector('.game-status');
  statBar.className = 'game-status';
  statBar.classList.add(align);
  if (clear) statBar.innerHTML = '';
  statBar.appendChild(element);
}
