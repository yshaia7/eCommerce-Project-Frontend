import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { Registration } from '../common/registration';

@Injectable({
  providedIn: 'root',
})
export class LoginService{
  private registerUrl = 'http://localhost:8080/api/login/isUserExist';

  authenticated: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  
  constructor(private httpClient: HttpClient) {}

  isAuthenticated(): Observable<any> {
    return this.authenticated;
  }

  isAuthenticatedGuard(){
    if(this.authenticated.getValue())
      return true;
    return false;
  }
        
  setAuthenticated(authStatus: boolean) {
    if (authStatus) 
        this.authenticated.next(true);
    else  
          this.authenticated.next(false);

    console.log('setAuth to ' + authStatus);
  }

  loginUser(registration: Registration): Observable<any>{
    return this.httpClient.post<Registration>(this.registerUrl, registration);
  }

}
