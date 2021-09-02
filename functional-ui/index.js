const post = {
  title: 'Post',
  text: 'GitHub is built for collaboration.<br>Set up an organization to improve the way your team works together,<br>and get access to more features.',
  tags: [
    'JavaScript',
    'C++',
    'PHP'
  ]
}

function Header(text) {
  return `<h1>${text}</h1>`;
}

function Text(text) {
  return `<p>${text}</p>`;
}

function Tags(items) {
  return `
    <ul>
      ${items.map(el => `<li>${el}</li>`).join('')}
    </ul>
  `;
}

function Post(post) {
  return `<div>
    ${Header(post.title)}
    ${Text(post.text)}
    ${Tags(post.tags)}
  </div>`;
}

function App() {
  document.body.innerHTML = Post(post);
}

window.onload = () => {
  App();
}