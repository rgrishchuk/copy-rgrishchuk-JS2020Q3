export default class BurgerMenu {
  constructor(categories) {
    this.element = document.querySelector('.burger-menu');
    this.icon = document.querySelector('.burger');
    this.overlay = document.querySelector('.blackout');
    this.items = [];
    const itemMain = document.querySelector('.mainPage');
    this.items.push(itemMain);
    this.activeItem = null;
    const burgerList = document.querySelector('.burger-menu__list');
    Object.keys(categories).forEach((category) => {
      const burgerListItem = document.createElement('li');
      burgerListItem.innerHTML = category;
      burgerListItem.dataset.menuAction = category.toLowerCase();
      this.items.push(burgerListItem);
      burgerList.appendChild(burgerListItem);
    });
    const itemStatistics = document.createElement('li');
    itemStatistics.classList.add('statisticsPage');
    itemStatistics.dataset.menuAction = 'statistics';
    itemStatistics.innerHTML = 'Statistics';
    this.items.push(itemStatistics);
    burgerList.appendChild(itemStatistics);
  }

  show() {
    this.overlay.classList.toggle('active');
    this.icon.classList.toggle('active');
    this.element.classList.toggle('active');
  }

  isActive() {
    return this.element.className.includes('active');
  }

  findMenuItem(name) {
    for (let i = 0; i < this.items.length; i += 1) {
      if (this.items[i].innerHTML === name) {
        return this.items[i];
      }
    }
    return null;
  }

  changeActiveItem(category) {
    if (this.activeItem) this.activeItem.classList.remove('active');
    this.activeItem = this.findMenuItem(category);
    if (this.activeItem) this.activeItem.classList.add('active');
  }
}
