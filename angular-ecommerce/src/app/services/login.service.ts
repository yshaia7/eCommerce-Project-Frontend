import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService{
  
  authenticated: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  
  constructor() {}

  isAuthenticated(): Observable<any> {
    return this.authenticated;
  }
        
  setAuthenticated(authStatus: boolean) {
    if (authStatus) 
        this.authenticated.next(true);
    else  
          this.authenticated.next(false);

    console.log('setAuth to ' + authStatus);
  }

}
