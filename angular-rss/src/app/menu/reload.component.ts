import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-menu-button-reload',
  templateUrl: './reload.component.html',
  styleUrls: ['./button.component.css', './reload.component.css'],
  host: {'class': 'reload-button'}
})

export class ReloadButtonComponent {
  @Input() title: string = '';
  count: number = 0;
  @Input() path = '';
  isUpdating: boolean = false;

  constructor(private router: Router, public service: DataService) {
    this.service.isUpdating.subscribe(updating => { this.isUpdating = updating });
    this.service.count.subscribe(count => { this.count = count });
  }


  isSelected() {
    return this.router.url === this.path;
  }

  onClick() {
    this.router.navigateByUrl('');
  }

  onUpdate() {
    this.service.updateFeeds();
  }
}
