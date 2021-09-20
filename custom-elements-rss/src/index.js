import './styles.scss';
import './menu'
import './entry'
import './feed'

const _url = 'http://localhost:8080/';

function main() {
  console.log('app started');
  fetch(`${_url}entries`).then((response) => {
    return response.json();
  }).then((entries) => {
    const list = document.getElementById('entries-list');

    entries.forEach(entry => {
      const item = document.createElement('li', { is: 'entry-item' });
      item.setAttribute('data-title', entry.title);
      item.setAttribute('data-link', entry.link);
      item.setAttribute('data-description', entry.description);
      item.setAttribute('data-feed-title', 'Хабрахабр');
      item.setAttribute('data-feed-icon', 'https://assets.habr.com/habr-web/img/favicons/favicon-16.png');

      list.appendChild(item);
    });
  });

  fetch(`${_url}feeds`).then((response) => {
    return response.json();
  }).then((feeds) => {
    const list = document.getElementById('feeds-list');

    feeds.forEach(feed => {
      const a = document.createElement('a');
      a.href = feed.link;

      if (feed.image && feed.image.length > 0) {
        feed.icon = feed.image;
      } else {
        feed.icon = `${a.protocol}//${a.hostname}/favicon.ico`;
      }

      const item = document.createElement('li', { is: 'feed-item' });
      item.setAttribute('data-title', feed.title);
      item.setAttribute('data-icon', feed.icon);
      item.setAttribute('data-count', feed.count);

      list.appendChild(item);
    });
  });
}

window.addEventListener('DOMContentLoaded', () => {
  main();
});
