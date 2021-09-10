let app;
let renderContext;

class TextStyle {
  constructor(options) {
    this._color = options.color;
    this._bold = options.bold;
    this._size = options.size;
  }

  apply() {
    renderContext.fillStyle = this._color;
    renderContext.font = `${this._bold ? 'bold' : ''} ${this._size}px system-ui`.trim();
  }
}

class Layout {

}

class Widget {
  constructor(options) {
    this._id = options.id;
    this._x = options.x ? options.x : 0;
    this._y = options.y ? options.y : 0;
    this._width = options.width;
    this._height = options.height;
  }

  get id() {
    return this._id;
  }

  set x(value) {
    this._x = value;
  }

  get x() {
    return this.x;
  }

  set y(value) {
    this._y = value;
  }

  get y() {
    return this.y;
  }

  set width(value) {
    this._width = value;
  }

  get width() {
    return this._width;
  }

  set height(value) {
    this._height = value;
  }

  get height() {
    return this._height;
  }

  render() {
    this._children.forEach(children => children.render());
  }
}

class Text extends Widget {
  constructor(options) {
    super(options);

    this._text = options.text;
    this._style = options.style;
    this._measure = null;
  }

  set text(value) {
    this._text = value;
  }

  render() {
    if (this._style) {
      this._style.apply();
    }

    renderContext.fillText(this._text, this._x, this._y);

    if (!this._measure) {
      const measure = renderContext.measureText(this._text);
      this._width = measure.width;
      this._height = measure.fontBoundingBoxAscent + measure.fontBoundingBoxDescent;
    }
  }
}

class Rectangle extends Widget {
  constructor(options) {
    super(options);

    this._color = options.color;
  }

  set color(value) {
    this._color = value;
  }

  render() {
    renderContext.fillStyle = this._color;
    renderContext.fillRect(this._x, this._y, this._width, this._height);
  }
}

class View extends Widget {
  constructor(options) {
    super(options);

    this._children = options.children ? options.children : [];
    this._dict = {};

    this._children.forEach(child => {
      if (child.id) {
        this._dict[child.id] = child;
      }
    });
  }

  apply(id, options) {
    const widget = this._dict[id];

    for (const key in options) {
      widget[key] = options[key];
    }
  }

  render() {
    this._children.forEach(child => child.render())
  }
}

class List extends View {
  render() {
    let offset = this._y + this._children[0].height;

    this._children.forEach(widget => {
      widget.y = offset;
      widget.x = this._x;

      widget.render();

      offset = offset + widget.height;
    })
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
    this._counter = 0;

    window.addEventListener('click', (event) => {
      this._mouseX = event.clientX;
      this._mouseY = event.clientY;

      this._counter++;

      this._view.apply('text', { text: `Hello World ${this._counter}` });
      this._view.apply('rect', { x: this._mouseX, y: this._mouseY, color: `rgb(${this._counter},${this._counter},${this._counter})` });

      this.render();
    });

    const style = new TextStyle({ color: 'rgb(100, 100, 100)', bold: true, size: 12 });

    this._view = new View({
      children: [
        new Text({ id: 'text', text: `Hello World ${this._counter}`, x: 100, y: 100, style: new TextStyle({ color: 'rgb(100, 100, 100)', bold: true, size: 20 }) }),
        new Rectangle({ id: 'rect', x: 50, y: 50, width: 50, height: 50, color: 'rgba(0, 0, 0, 0.4)' }),
        new List({
          children: [
            new Text({ text: 'text 1', style }),
            new Text({ text: 'text 2', style }),
            new Text({ text: 'text 3', style })
          ]
        }),
        new List({ y: 200, x: 20, children: ['item 1', 'item 2', 'item 3'].map(item => new Text({ text: item, style })) })
      ]
      }
    );
  }

  render() {
    renderContext.clearRect(0, 0, this._width, this._height);

    this._view.render();
  }
}

window.onload = () => {
  app = new App({ canvas: document.getElementById('canvas') });
  app.render();
}