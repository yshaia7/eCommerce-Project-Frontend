import { Injectable, OnInit } from '@angular/core';

import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService implements CanActivate {
  constructor(private loginService: LoginService,
            private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (this.loginService.isAuthenticatedGuard())
          return true;
    this.router.navigate(['login']);
    return false;

  }
}
