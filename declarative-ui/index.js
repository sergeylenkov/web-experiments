let app;
let renderContext;

function Screen(options) {
  const { width, height } = options;

  renderContext.clearRect(0, 0, width, height);

  Text({
    text: 'Hello world!',
    x: 20,
    y: 20,
    style: TextStyle({ size: 16, bold: true, color: 'rgb(20, 20, 20)' })
  })

  const items = ['1', '2', '2'];
  let y = 100;

  items.forEach(item => {
    Text({
      text: `Item ${item}`,
      x: 20,
      y: y += 20,
      style: TextStyle({ size: 16, bold: true, color: 'rgb(20, 20, 20)' })
    })
  });
}

function Text(options) {
  const { text, style, x, y } = options;

  style();
  renderContext.fillText(text, x, y);
}

function TextStyle(options) {
  const { size, bold, color } = options;

  return () => {
    renderContext.fillStyle = color;
    renderContext.font = `${bold ? 'bold' : ''} ${size}px system-ui`.trim();
  }
}

class App {
  constructor(options = {}) {
    this._mouseX = 0;
    this._mouseY = 0;
    this._width = window.innerWidth;
    this._height = window.innerHeight;

    this._canvas = options.canvas;
    this._canvas.setAttribute('width', this._width);
    this._canvas.setAttribute('height', this._height);

    this._context = this._canvas.getContext('2d');

    renderContext = this._context;

    window.addEventListener('click', (event) => {
      this._mouseX = event.clientX;
      this._mouseY = event.clientY;

      console.log('click at', this._mouseX, this._mouseY);
      this.render();
    });
  }

  render() {
    Screen({
      width: this._width,
      height: this._height
    });
  }
}

window.onload = () => {
  app = new App({ canvas: document.getElementById('canvas') });
  app.render();
}