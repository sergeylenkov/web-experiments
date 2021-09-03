class FeedItem extends HTMLLIElement {
  constructor() {
    super();

    const template = document.getElementById('feed-item-template');
    const templateContent = template.content;
    this.node = templateContent.cloneNode(true);

    this.appendChild(this.node);
    this.className = 'feed-item';
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
    const label = this.getElementsByClassName('feed-item__label')[0];
    label.textContent = this.dataset.title;

    const counter = this.getElementsByClassName('feed-item__counter')[0];
    counter.textContent = this.dataset.count;

    const icon = this.getElementsByClassName('feed-item__icon')[0];
    icon.style.backgroundImage = `url(this.dataset.icon);`;
  }
}

customElements.define('feed-item', FeedItem, { extends: 'li' });