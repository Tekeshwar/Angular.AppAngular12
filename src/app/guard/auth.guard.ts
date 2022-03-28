import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { role } from '../models/roles';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private auth: AuthService) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    // if (!this.auth.isLoggedIn()) {
    //   this.router.navigate(['/login']);
    // }

    // if (route.data.roles == 'admin') {
    //   return this.auth.isLoggedIn();
    // }
    // return false;

    if (this.auth.isLoggedIn()) {
      // check if route is restricted by role
      if (route.data.roles===undefined){
        return true;
      }
      if (route.data.roles != 'User') {
        // role not authorised so redirect to home page
        this.router.navigate(['/']);
        return false;
      }

      // authorised so return true
      return true;
    }

    // not logged in so redirect to login page with the return url
    this.router.navigate(['/login']);
    return false;
  }

}
