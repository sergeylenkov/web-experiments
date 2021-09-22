let context = {};
let counter = 0;

function *Counter() {
	let count = 0;
	while(true) {
		yield count++;
	}
}

const counterID = Counter();

class Widget {
  constructor(options) {
    this.id = counterID.next().value;
    this.x = options.x;
    this.y = options.y;
    this.children = options.children ? options.children : [];
  }

  render() {
    this.children.forEach(child => {
      child.render();
    });
  }
}

class Text extends Widget {
  constructor(options) {
    super(options);

    this.text = options.text;
    this.color = options.color;
    this.size = options.size;

    this.measure();
  }

  measure() {
    const context = Screen.context.renderContext;

    this.setFont();

    const measure = context.measureText(this.text);
    this.width = measure.width;
    this.height = measure.fontBoundingBoxAscent + measure.fontBoundingBoxDescent;
  }

  setFont() {
    const context = Screen.context.renderContext;
    context.font = `${this.bold ? 'bold' : ''} ${this.size}px system-ui`.trim();
  }

  render() {
    const context = Screen.context.renderContext;

    this.setFont();

    context.fillStyle = this.color;
    context.fillText(this.text, this.x, this.y);
  }
}

class Column extends Widget {
  constructor(options) {
    super(options);
  }

  render() {
    let y = this.y;

    this.children.forEach(child => {
      child.y = y;
      child.x = this.x;

      y = y + child.height;
    })

    super.render();
  }
}

class Row extends Widget {
  constructor(options) {
    super(options);
  }

  render() {
    let x = this.x;

    this.children.forEach(child => {
      child.y = this.y;
      child.x = x;

      x = x + child.width;
    })

    super.render();
  }
}

class TestWidget extends Widget {
  constructor(options) {
    super(options);

    const items = new Array(counter).fill(0).map((item, index) => index);

    this.children = [
      new Row({
        x: 50,
        y: 250,
        children: items.map(item => new Text({ text: `Row Item ${item}`, color: 'rgb(0,0,0)', size: 12 }))
      })
    ]
  }
}

class Screen {
  static context = {};

  constructor(options) {
    this.width = options.width;
    this.height = options.height;
    this.children = options.children;
  }

  render() {
    Screen.context.renderContext.clearRect(0, 0, this.width, this.height);

    this.children.forEach(child => {
      child.render();
    });
  }
}

function render() {
  const screen = new Screen({
    width: window.innerWidth,
    height: window.innerHeight,
    children: [
      new Text({ text: `Hello ${counter}!`, color: 'rgb(0,0,0)', size: 14, x: 50, y: 50 }),
      new Column({
        x: 50,
        y: 150,
        children: [
          new Text({ text: `List Item 1`, color: 'rgb(0,0,0)', size: 12, height: 20 }),
          new Text({ text: `List Item 2`, color: 'rgb(0,0,0)', size: 12, height: 20 }),
          new Text({ text: `List Item 3`, color: 'rgb(0,0,0)', size: 12, height: 20 }),
        ]
      }),
      new TestWidget({
        x: 50,
        y: 250
      })
    ]
  });

  screen.render();
}

function createContext() {
  const canvas = document.getElementById('canvas');

  canvas.setAttribute('width', window.innerWidth);
  canvas.setAttribute('height', window.innerHeight);

  Screen.context = {
    renderContext: canvas.getContext('2d', { alpha: true }),
    mouseX: 0,
    mouseY: 0
  }
}

function renderTask() {
  render();
  requestAnimationFrame(renderTask);
}

window.onload = () => {
  createContext();
  render()

  window.addEventListener('click', (event) => {
    counter++;
    render();
  });
}