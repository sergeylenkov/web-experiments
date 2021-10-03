class EntryItem extends HTMLLIElement {
  constructor() {
    super();

    const template = document.getElementById('entry-item-template');
    const templateContent = template.content;
    this.node = templateContent.cloneNode(true);

    this.appendChild(this.node);
    this.className = 'entry-item';

    this.titleLink = this.getElementsByClassName('entry-item__title')[0];
    this.description = this.getElementsByClassName('entry-item__description')[0];
    this.feedTitle = this.getElementsByClassName('entry-item-feed__title')[0];
    this.feedIcon = this.getElementsByClassName('entry-item-feed__icon')[0];

    this._entry = null;
  }

  set entry(entry) {
    this._entry = entry;
    this.update();
  }

  static get observedAttributes() {
    return [];
  }

  connectedCallback() {
    this.update();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    this.update();
  }

  update() {
    if (this._entry) {
      this.titleLink.textContent = this._entry.title;
      this.titleLink.setAttribute('href', this._entry.link);

      this.description.innerHTML = this._entry.description;
      this.feedTitle.textContent = this._entry.feed.title;
      this.feedIcon.style.backgroundImage = `url(${this._entry.feed.icon})`;
    }
  }
}

customElements.define('entry-item', EntryItem, { extends: 'li' });