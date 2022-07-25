import { Injectable, OnInit } from '@angular/core';

import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  Router,
  RouterStateSnapshot
} from "@angular/router";
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate{
  
  constructor(private loginService: LoginService) { }

  canActivate(route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot):  Observable<any> {
   return this.loginService.isAuthenticated();    
  }
}


