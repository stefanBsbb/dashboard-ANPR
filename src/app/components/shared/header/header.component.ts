import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  dropDown = false;
  constructor(private router: Router) {}
  toggleSidebar() {
    this.dropDown = !this.dropDown;
  }

  navigateToDevices()
  {
    this.router.navigate(['/devices']).then(() => {
      window.location.reload();
    });
  }
  navigateToDashboard()
  {
    this.router.navigate(['/dashboard']).then(() => {
      window.location.reload();
    });
  }
}
