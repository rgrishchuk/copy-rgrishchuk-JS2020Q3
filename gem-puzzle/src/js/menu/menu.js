import menuItems from './mn_items';

export default class Menu {
  constructor(width) {
    this.element = document.createElement('div');
    this.element.classList.add('menu');
    this.setSize(width);
    const ul = document.createElement('ul');
    ul.classList.add('menu__list');
    menuItems.forEach((item) => {
      const li = document.createElement('li');
      li.classList.add('menu__list__item', 'active');
      li.innerHTML = item.value;
      li.title = item.title;
      ul.appendChild(li);
      this[item.name] = li;
    });
    this.element.appendChild(ul);
  }

  setSize(width) {
    this.element.style.width = `${width}px`;
  }

  setValue(item, value) {
    this[item].innerHTML = value;
  }

  setTitle(item, title) {
    this[item].title = title;
  }

  activeItem(item) {
    this[item].classList.add('active');
  }

  disableItem(item) {
    this[item].classList.remove('active');
  }

  disableAll() {
    Object.keys(this).forEach((item) => {
      if (item !== 'element') {
        this.disableItem(item);
      }
    });
  }

  activeAll() {
    Object.keys(this).forEach((item) => {
      if (item !== 'element') {
        this.activeItem(item);
      }
    });
  }

  isActive(item) {
    return this[item].classList.contains('active');
  }
}
