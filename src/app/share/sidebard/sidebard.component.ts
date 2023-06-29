import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServicesService } from '../../auth/services/auth.service';
import { Menu } from '../../interfaces/menu.interfaces';

@Component({
  selector: 'app-sidebard',
  templateUrl: './sidebard.component.html',
  styleUrls: ['./sidebard.component.scss']
})
export class SidebardComponent {
  constructor(
    private router: Router,
    private authService: AuthServicesService
  ){}

  get user() {

    return this.authService.userAuth;
  }
  logOut(): void {
    this.authService.logout();
    window.location.href="/";
  }

}
