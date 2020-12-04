function createGameButton() {
  const gameButton = document.createElement('div');
  gameButton.classList.add('game-button');
  const gameButtonIcon = document.createElement('i');
  gameButtonIcon.classList.add('material-icons', 'game-button__icon');
  const gameButtonText = document.createElement('span');
  gameButtonText.classList.add('game-button__text');
  gameButton.appendChild(gameButtonIcon);
  gameButton.appendChild(gameButtonText);
  return gameButton;
}

function setGameButton(button, icon, text) {
  const gameButtonIcon = button.querySelector('.game-button__icon');
  const gameButtonText = button.querySelector('.game-button__text');
  gameButtonIcon.innerHTML = icon;
  gameButtonText.innerHTML = text;
}

function activateIconHome() {
  const iconHome = document.querySelector('.home');
  iconHome.classList.add('active');
}

function deactivateIconHome() {
  const iconHome = document.querySelector('.home');
  iconHome.classList.remove('active');
}

function createStatisticsButtons() {
  const statButtons = document.createElement('div');
  statButtons.classList.add('statistics-buttons');

  const resetButton = document.createElement('button');
  resetButton.classList.add('statistics-buttons__reset');
  resetButton.innerHTML = 'Reset';

  const difficultButton = document.createElement('button');
  difficultButton.classList.add('statistics-buttons__difficult');
  difficultButton.innerHTML = 'Repeat difficult words';

  statButtons.appendChild(difficultButton);
  statButtons.appendChild(resetButton);
  return statButtons;
}

export {
  createGameButton, setGameButton, activateIconHome, deactivateIconHome, createStatisticsButtons,
};
