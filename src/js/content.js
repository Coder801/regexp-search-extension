import styles from '../css/content.css';

const HTMLTemplate = `
  <input class="${styles.input}" type="text" placeholder="Search" />
  <span class="${styles.result}"></span>
  <span class="${styles.divider}"></span>
  <button class="${styles.next}">‹</button>
  <button class="${styles.prev}">›</button>
`;

class RegExpSearch {
  constructor (options) {
    this.template = options.template;
    this.text = document.body.innerText;
    this.html = document.body.innerHTML;
  }

  renderTemplate () {
    const body = document.body;
    const searchWrapper = document.createElement('div');
    searchWrapper.classList.add(styles.search);
    searchWrapper.innerHTML = this.template;
    body.parentNode.insertBefore(searchWrapper, body.nextSibling);
  }

  searchResult (matches) {
    const total = matches.length;

    const result = document.querySelector(`.${styles.result}`);
    result.innerText = `1 / ${total}`;
  }

  search (value) {
    const pattern = new RegExp(`${value}`, 'gi');
    const result = this.text.match(pattern);
    this.highlight(result[0] || '');
    this.searchResult(result);
  }

  highlight (match) {
    const pattern = new RegExp(`(${match}(?!([^<]+)?>))`, 'gi');
    const result = this.html.replace(pattern, `<span class="${styles.highlight}">$1</span>`);
    document.body.innerHTML = result;
  }
}

const init = function () {
  const regExpSearch = new RegExpSearch({ template: HTMLTemplate });
  regExpSearch.renderTemplate();

  const selectors = {
    input: document.querySelector(`.${styles.input}`),
    next: document.querySelector(`.${styles.next}`),
    prev: document.querySelector(`.${styles.prev}`)
  };

  selectors.input.addEventListener('keyup', (event) => {
    regExpSearch.search(event.currentTarget.value);
  });
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
