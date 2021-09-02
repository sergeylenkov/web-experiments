import { Component, OnInit } from '@angular/core';
import { DataService, Feed } from '../data.service';

@Component({
  selector: 'app-feeds-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})

export class FeedsListComponent implements OnInit {
  feeds: Feed[] = [];

  constructor(public service: DataService) {
    this.service.feeds.subscribe(feeds => this.feeds = feeds);
  }

  ngOnInit() {
    this.service.getFeeds();
  }
}
