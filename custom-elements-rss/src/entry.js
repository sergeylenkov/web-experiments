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
  }

  static get observedAttributes() {
    return ['data-title'];
  }

  connectedCallback() {
    this.update();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    this.update();
  }

  update() {
    this.titleLink.textContent = this.dataset.title;
    this.titleLink.setAttribute('href', this.dataset.link);

    this.description.innerHTML = this.dataset.description;
    this.feedTitle.textContent = this.dataset.feedTitle;
    this.feedIcon.style.backgroundImage = `url(${this.dataset.feedIcon})`;
  }
}

customElements.define('entry-item', EntryItem, { extends: 'li' });