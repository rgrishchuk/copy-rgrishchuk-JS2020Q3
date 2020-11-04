import menuItems from './mn_items';

export default class Menu {
  constructor(width) {
    this.element = document.createElement('div');
    this.element.classList.add('menu');
    this.element.style.width = `${width}px`;
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

  setValue(item, value) {
    this[item].innerHTML = value;
  }

  setTitle(item, title) {
    this[item].title = title;
  }

  isActive(item) {
    // return this[item]
  }
}
