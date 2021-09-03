class MenuButton extends HTMLButtonElement {
  constructor() {
    super();

    const template = document.getElementById('menu-button-template');
    const templateContent = template.content;
    this.node = templateContent.cloneNode(true);

    this.appendChild(this.node);
    this.className = 'menu-button';

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
    return ['data-name', 'data-path'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    this.update();
  }

  update() {
    if (this.children) {
      this.children[1].textContent = this.dataset.name;
    }
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