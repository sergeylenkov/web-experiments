import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-menu-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})

export class MenuButtonComponent {
  @Input() title: string = '';
  @Input() selected = '';
  @Input() path = '';
  count: number = 0;

  constructor(private router: Router, public service: DataService) {
    this.service.count.subscribe(count => { this.count = count });
  }

  isSelected() {
    return this.router.url === this.path;
  }

  onClick() {
    this.router.navigateByUrl(this.path);
  }
}
