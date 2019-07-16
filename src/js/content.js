import '../css/content.css';

const tempHtml = `
  <section class="search">
    <input class="input" type="text" placeholder="Search" />
    <button class="next">‹</button>
    <button class="prev">›</button>
  </section>
`;

const renderSearch = (html) => {
  const searchWrapper = document.createElement('div');
  searchWrapper.innerHTML = html;
  document.body.appendChild(searchWrapper);
};

renderSearch(tempHtml);
