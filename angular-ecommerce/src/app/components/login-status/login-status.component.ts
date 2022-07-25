import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Subject } from 'rxjs';
import { LoginService } from 'src/app/services/login.service';
// import { OktaAuth } from '@okta/okta-auth-js';
// import { OktaAuthService } from '@okta/okta-angular';

@Component({
  selector: 'app-login-status',
  templateUrl: './login-status.component.html',
  styleUrls: ['./login-status.component.css'], 
  
})
export class LoginStatusComponent implements OnInit {
  
  isAuthenticated: Subject<boolean> = new BehaviorSubject<boolean>(false);
  auth: boolean = false;
  userFullName: string | undefined;

              constructor(private loginService: LoginService,
                          private router: Router) { }

  ngOnInit(): void {
    console.log('on inite of status login')
    this.loginService.isAuthenticated().subscribe(
      data => {
        this.isAuthenticated = data;
        console.log('isAuthenticated status ' + data)
      }
    )

    // Subscribe to authentication state changes
    // this.oktaAuthService.$authenticationState.subscribe(
    //   (result) => {
    //     this.isAuthenticated = result;
    //     this.getUserDetails()
    //   }
    // )
  }


  
  getUserDetails() {
    if(this.isAuthenticated){

      // Fetch the logger in user details (user claims)
      //
      // user full name is exposed as a property name
      // this.oktaAuthService.getUser().then(
      //   (res) => {
      //     this.userFullName = res?.name;
      //   }
      // )
    }   
  }

  logout(){
    this.loginService.setAuthenticated(false);
    this.router.navigate(['login']);
  }
}
