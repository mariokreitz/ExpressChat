import { Injectable } from '@angular/core';
import {
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService {
  constructor(private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const authToken = JSON.parse(localStorage.getItem('authToken') || 'null');

    if (!authToken.token) {
      this.router.navigate(['/login']);
      return false;
    }

    return true;
  }
}
