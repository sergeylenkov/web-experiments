import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

export interface Feed {
  id: number;
  title: string;
  link: string;
  image: string;
  icon: string;
  count: number;
}

export interface Entry {
  id: number;
  feedId: number;
  feed: Feed;
  title: string;
  description: string;
  link: string;
  isViewed: boolean;
  isFavorite: boolean;
  isRead: boolean;
}

@Injectable({
  providedIn: 'root',
})

export class DataService {
  _url = 'http://localhost:8080/';
  feeds: BehaviorSubject<Feed[]> = new BehaviorSubject(new Array<Feed>());
  entries: BehaviorSubject<Entry[]> = new BehaviorSubject(new Array<Entry>());
  count: BehaviorSubject<number> = new BehaviorSubject(0);
  feedsDict: { [key: string]: Feed } = {};
  isUpdating: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor() {
  }

  updateFeeds(): void {
    this.isUpdating.next(true);

    fetch(`${this._url}feeds/update`).then((response) => {
      return response.json();
    }).then((entries) => {
      this.updateFeedsInEntries(entries);

      this.entries.next(entries);
      this.count.next(entries.length);

      this.isUpdating.next(false);
    });
  }

  getFeeds(): void {
    fetch(`${this._url}feeds`).then((response) => {
      return response.json();
    }).then((feeds: Feed[]) => {
      feeds.forEach((feed: Feed) => {
        const a = document.createElement('a');
        a.href = feed.link;

        if (feed.image && feed.image.length > 0) {
          feed.icon = feed.image;
        } else {
          feed.icon = `${a.protocol}//${a.hostname}/favicon.ico`;
        }

        this.feedsDict[feed.id] = feed;
      });

      this.feeds.next(feeds);
      this.updateFeedsInEntries(this.entries.getValue());
    });
  }

  getEntries(): void {
    fetch(`${this._url}entries`).then((response) => {
      return response.json();
    }).then((entries: Entry[]) => {
      this.updateFeedsInEntries(entries);

      this.entries.next(entries);
      this.count.next(entries.length);
    });
  }

  getFeedById(id: number): Feed {
    return this.feedsDict[id];
  }

  updateFeedsInEntries(entries: Entry[]) {
    entries.forEach(entry => {
      entry.feed = this.getFeedById(entry.feedId);
    });
  }
}
