class CounterLabel extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = this.getAttribute('count');
  }

  static get observedAttributes() {
    return ['count'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    this.innerHTML = this.getAttribute('count');
  }
}

class CounterButton extends HTMLButtonElement {
  constructor() {
    super();
    this.addEventListener('click', () => {
      const label = document.getElementById('counter');
      let count = parseInt(label.getAttribute('count'));
      count = count + 1;

      label.setAttribute('count', count);
    });
  }
}

customElements.define('counter-button', CounterButton, { extends: 'button' });
customElements.define('counter-label', CounterLabel);