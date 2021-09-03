class EntryItem extends HTMLLIElement {
  constructor() {
    super();

    const template = document.getElementById('entry-item-template');
    const templateContent = template.content;
    this.node = templateContent.cloneNode(true);

    this.appendChild(this.node);
    this.className = 'entry-item';
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
    const title = this.querySelector('a');
    title.textContent = this.dataset.title;
    title.setAttribute('href', this.dataset.link);

    const description = this.getElementsByClassName('entry-item__description')[0];
    description.innerHTML = this.dataset.description;
  }
}

customElements.define('entry-item', EntryItem, { extends: 'li' });