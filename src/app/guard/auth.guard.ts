import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, RouterStateSnapshot, UrlSegment, UrlTree, Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthServicesService } from '../auth/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {
  constructor(
    private authService: AuthServicesService,
    private router: Router,
    private route: ActivatedRoute
    ) { }

  canActivate(route: ActivatedRouteSnapshot,state: RouterStateSnapshot): Observable<boolean> | boolean {
    if ( !this.authService.isLoggedIn() ) {
      this.router.navigate(['/']);
      return false;
    }
    return true;
  }
  canLoad() {
    if ( !this.authService.isLoggedIn() ) {
      this.router.navigate(['/']);
      return false;
    }
    return true;
  }
}
