import { Component, Input } from '@angular/core';
import { Entry } from '../data.service';

@Component({
  selector: 'app-entries-list-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})

export class EntriesListItemComponent {
  @Input() entry: Entry | undefined;

  constructor() {

  }
}
