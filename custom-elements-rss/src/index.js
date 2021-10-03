import './styles.scss';
import './menu'
import './entry'
import './feed'

const _url = 'http://localhost:8080/';
let _feeds = [];
let _feedsDict = {};
let _entries = [];

async function fetchFeeds() {
  const response = await fetch(`${_url}feeds`);
  const feeds = await response.json();
  console.log(feeds);
  feeds.forEach(feed => {
    const a = document.createElement('a');
    a.href = feed.link;

    if (feed.image && feed.image.length > 0) {
      feed.icon = feed.image;
    } else {
      feed.icon = `${a.protocol}//${a.hostname}/favicon.ico`;
    }

    _feedsDict[feed.id] = feed;
  });

  return feeds;
}

function updateFeeds(feeds) {
  const list = document.getElementById('feeds-list');

  feeds.forEach(feed => {
    const item = document.createElement('li', { is: 'feed-item' });

    item.setAttribute('data-title', feed.title);
    item.setAttribute('data-icon', feed.icon);
    item.setAttribute('data-count', feed.count);

    list.appendChild(item);
  });
}

async function fetchEntries() {
  const response = await fetch(`${_url}entries`);
  const entries = await response.json();

  entries.forEach(entry => {
    entry.feed = _feedsDict[entry.feedId];
  });

  return entries;
}

function updateEntries(entries) {
  const list = document.getElementById('entries-list');
  list.innerHTML = '';

  entries.forEach(entry => {
    const item = document.createElement('li', { is: 'entry-item' });
    item.entry = entry;

    list.appendChild(item);
  });

  const buttons = document.getElementsByClassName('menu-button');

  for (let button of buttons) {
    button.dataset.count = _entries.length;
  }
}

async function main() {
  _feeds = await fetchFeeds();
  _entries = await fetchEntries();

  updateFeeds(_feeds);
  updateEntries(_entries);
}

window.addEventListener('history', (event) => {
  console.log(event);
});

window.addEventListener('DOMContentLoaded', () => {
  main();
});
