import { setLocal, getLocal } from './storage';

function createTr(item) {
  const tr = document.createElement('tr');
  tr.innerHTML = `<td>${item.word}</td><td>${item.translation}</td><td>${item.category}</td>`;
  tr.innerHTML += `<td>${item.clicks}</td><td>${item.right}</td><td>${item.wrong}</td><td>${item.percent}</td>`;
  return tr;
}
export default class Statistics {
  constructor(categories) {
    this.thead = [
      ['Word', 'word'],
      ['Translation', 'translation'],
      ['Category', 'category'],
      ['Clicks', 'clicks'],
      ['Right', 'right'],
      ['Wrong', 'wrong'],
      ['Correct %', 'percent'],
    ];
    this.data = getLocal('statistics');
    if (!this.data) {
      this.data = [];
      Object.keys(categories).forEach((category) => {
        categories[category].words.forEach((item) => {
          this.data.push({
            category,
            word: item.word,
            translation: item.translation,
            clicks: 0,
            right: 0,
            wrong: 0,
            percent: 0,
            image: item.image,
            audioSrc: item.audioSrc,
          });
        });
      });
      setLocal('statistics', this.data);
    }
  }

  setData(word, category, right) {
    const index = this.data.findIndex((item) => item.word === word);
    if (index !== -1) {
      this.data[index].clicks += 1;
      if (right) {
        this.data[index].right += 1;
      } else {
        this.data[index].wrong += 1;
      }
      this.data[index].percent = Math.ceil((this.data[index].right * 100)
        / this.data[index].clicks);
    }
    setLocal('statistics', this.data);
  }

  clear() {
    this.data.forEach((item) => {
      const word = item;
      word.clicks = 0;
      word.right = 0;
      word.wrong = 0;
      word.percent = 0;
    });
    setLocal('statistics', this.data);
    const rows = Array.from(this.table.rows).slice(1);
    rows.forEach((item) => {
      const row = item;
      for (let index = 3; index <= 6; index += 1) {
        row.cells[index].innerHTML = '0';
      }
    });
  }

  sortTable(rowTitle) {
    if (rowTitle.classList.contains('sort')) {
      const row = this.table.querySelector('.sort');
      if (row.classList.contains('asc')) {
        row.classList.remove('asc');
        row.classList.add('desc');
      } else {
        row.classList.remove('desc');
        row.classList.add('asc');
      }
      this.data.reverse();
    } else {
      const oldRowSort = this.table.querySelector('.sort');
      oldRowSort.classList.remove('sort');
      oldRowSort.classList.remove('asc');
      oldRowSort.classList.remove('desc');
      rowTitle.classList.add('sort', 'asc');
      this.data.sort((a, b) => (a[rowTitle.dataset.field] > b[rowTitle.dataset.field] ? 1 : -1));
    }
    for (let i = 1; i < this.table.rows.length;) this.table.deleteRow(i);
    const rows = [];
    this.data.forEach((item) => { rows.push(createTr(item)); });
    this.table.tBodies[0].append(...rows);
  }

  createTable() {
    this.table = document.createElement('table');
    this.table.classList.add('statistics-table');
    const tbody = document.createElement('tbody');
    this.table.appendChild(tbody);
    let tr = document.createElement('tr');
    this.thead.forEach(([thName, thField]) => {
      const th = document.createElement('th');
      th.innerHTML = thName;
      th.dataset.field = thField;
      if (thName === 'Word') th.classList.add('sort', 'asc');
      th.addEventListener('click', (e) => {
        this.sortTable(e.target);
      });
      tr.appendChild(th);
    });
    tbody.appendChild(tr);
    this.data.sort((a, b) => {
      if (a.word === b.word) return 0;
      if (a.word > b.word) return 1;
      return -1;
    });
    this.data.forEach((item) => {
      tr = createTr(item);
      tbody.appendChild(tr);
    });
  }
}
