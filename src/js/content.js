import '../css/content.css';

const HTMLTemplate = `
  <section class="search">
    <input class="input" type="text" placeholder="Search" />
    <span class="divider"></span>
    <button class="next">‹</button>
    <button class="prev">›</button>
  </section>
`;
class RegExpSearch {
  constructor (options) {
    this.template = options.template;
    this.text = document.body.innerText;
    this.html = document.body.innerHTML;
  }

  renderTemplate () {
    const searchWrapper = document.createElement('div');
    searchWrapper.innerHTML = this.template;
    document.appendChild(searchWrapper);
  }

  search (value) {
    const pattern = new RegExp(`${value}`, 'i');
    this.highlight(this.text.match(pattern)[0] || '');
  }

  highlight (match) {
    const pattern = new RegExp(`(${match}(?!([^<]+)?>))`, 'gi');
    const result = this.html.replace(pattern, `<span class="highlight">$1</span>`);
    document.body.innerHTML = result;
  }
}

const init = function () {
  const regExpSearch = new RegExpSearch({ template: HTMLTemplate });
  regExpSearch.renderTemplate();

  const selectors = {
    input: document.querySelector('.search > .input'),
    next: document.querySelector('.search > .next'),
    prev: document.querySelector('.search > .prev')
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
