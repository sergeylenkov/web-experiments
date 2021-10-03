class FeedItem extends HTMLLIElement {
  constructor() {
    super();

    const template = document.getElementById('feed-item-template');
    const templateContent = template.content;
    this.node = templateContent.cloneNode(true);

    this.appendChild(this.node);
    this.className = 'feed-item';

    this._label = this.getElementsByClassName('feed-item__label')[0];
    this._counter = this.getElementsByClassName('feed-item__counter')[0];
    this._icon = this.getElementsByClassName('feed-item__icon')[0];
  }

  static get observedAttributes() {
    return ['data-icon', 'data-title', 'data-count'];
  }

  connectedCallback() {
    this.update();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    this.update();
  }

  update() {
    this._label.textContent = this.dataset.title;
    this._counter.textContent = this.dataset.count;
    this._icon.style.backgroundImage = `url(${this.dataset.icon})`;
  }
}

customElements.define('feed-item', FeedItem, { extends: 'li' });