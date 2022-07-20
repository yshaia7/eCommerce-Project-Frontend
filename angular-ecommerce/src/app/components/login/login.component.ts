import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
   //registerText = LoginRegisterText;
  
  constructor(private router: Router,
    private route: ActivatedRoute,
    private loginService: LoginService) { }

  @ViewChild('f') form: NgForm | undefined;

  // Todo create sql tables for user, passowrd token for validation  
  // Todo bring info from DB to check if user exists
  submitted = false;
  tempPassword: number = 123456;
  user = {
    email: '',
    password: '',
    loginShare: ''
  }

  questionAnswer = '';
  ngOnInit(): void {
    // initilaize Email get from register component
    // this.user.email = this.route.snapshot.queryParams['email'];
    // this.user.password = this.route.snapshot.queryParams['password'];
    
  }

  onSubmit() {

    if(this.tempPassword == this.form?.value.userData.password){
      console.log('rest data');
      this.form?.reset();
      this.loginService.setAuthenticated(true);
      console.log('this.loginService.setAuthenticated(true)');
       this.router.navigate(['products'], {queryParams: {username: this.user.email}})
    }
    
    // relative rout is rebundant, only example
    //this.router.navigate(['table'], { relativeTo: this.route });
    //this.auth.login();
    //this.router.navigate(['table'], {queryParams: {username: this.user.email}});
  }

  // copyUsersDetail() {
  //   this.submitted = true;
  //   this.user.email = this.form?.value.userData.email;
  //   this.user.password = this.form?.value.userData.password;
  //   this.user.loginShare = this.form?.value.questionAnswer;
  // }

}
