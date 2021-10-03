class MenuButton extends HTMLButtonElement {
  constructor() {
    super();

    const template = document.getElementById('menu-button-template');
    const templateContent = template.content;
    this.node = templateContent.cloneNode(true);

    this.appendChild(this.node);
    this.className = 'menu-button';

    this._label = this.getElementsByClassName('menu-button__label')[0];
    this._counter = this.getElementsByClassName('menu-button__counter')[0];

    this.onClick = this.onClick.bind(this);

    window.onpopstate = (event) => {
      console.log(document.location, event);
    }

    window.addEventListener('history', (event) => {
      this.onHistory();
    });
  }

  connectedCallback() {
    this.update();
    this.onHistory();

    this.addEventListener('click', this.onClick);
  }

  disconnectedCallback() {
    this.removeEventListener('click', this.onClick);
  }

  static get observedAttributes() {
    return ['data-name', 'data-path', 'data-count'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    this.update();
  }

  update() {
    this._label.textContent = this.dataset.name;
    this._counter.textContent = this.dataset.count;
  }

  onClick() {
    window.history.pushState({}, '', this.dataset.path);

    const event = new CustomEvent('history', {
      detail: {
        path: this.dataset.path
      }
    });

    window.dispatchEvent(event);
  }

  onHistory() {
    const { pathname } = document.location;

    if (this.dataset.path === pathname) {
      this.setAttribute('selected', 'selected');
    } else {
      this.removeAttribute('selected');
    }
  }
}

customElements.define('menu-button', MenuButton, { extends: 'button' });