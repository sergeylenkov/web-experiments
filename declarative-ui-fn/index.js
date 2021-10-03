let renderContext;

let state = {
  counter: 0,
  items: []
}

function text(text = '', x, y) {
  renderContext.font = '12px system-ui';
  renderContext.fillText(text, x, y);

  const measure = renderContext.measureText(text);

  return { width: measure.width , height: measure.fontBoundingBoxAscent + measure.fontBoundingBoxDescent };
}

function column(items = [], x, y) {
  items.forEach(el =>  {
    const { width, height } = text(el, x, y);
    y = y + height;
  });
}

function row(items = [], x, y) {
  items.forEach(el =>  {
    const { width, height } = text(el, x, y);
    x = x + width + 5;
  });
}

function app(state) {
  text(`Count: ${state.counter}`, 100, 100);
  row(state.items, 100, 150);
  column(state.items, 100, 200);
}

function render() {
  renderContext.clearRect(0, 0, window.innerWidth, window.innerHeight);

  app(state);
}

window.onload = () => {
  const canvas = document.getElementById('canvas');

  canvas.setAttribute('width', window.innerWidth);
  canvas.setAttribute('height', window.innerHeight);

  renderContext = canvas.getContext('2d');

  render();
}

window.addEventListener('click', (event) => {
  state.counter++;
  state.items.push(`List ${state.counter}`);

  render();
});