import { Component, OnInit } from '@angular/core';
import { DataService, Entry } from '../data.service';

@Component({
  selector: 'app-entries-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})

export class EntriesListComponent implements OnInit {
  entries: Entry[] = [];

  constructor(public service: DataService) {
    this.service.entries.subscribe(entries => this.entries = entries);
  }

  ngOnInit() {
    this.service.getEntries();
  }
}
