import { Component, Input } from '@angular/core';
import { Feed } from '../data.service';

@Component({
  selector: 'app-feeds-list-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})

export class FeedsListItemComponent {
  @Input() feed: Feed | undefined;

  constructor() {

  }
}
