import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Register } from 'src/app/common/register';
import { Registration } from 'src/app/common/registration';
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

  registration: Registration = new Registration();
  register: Register = new Register();
  
  emailErrorMsg: string = '';
  passwordErrorMsg: string = '';

  registrationServerResponse: Registration = new Registration();

    storage: Storage = localStorage;
  
  ngOnInit(): void { }

  onSubmit() {

    this.register.email = this.form?.value.email;
    this.register.password = this.form?.value.password;

    this.emailErrorMsg = '';
    this.passwordErrorMsg = '';

    this.registration.register = this.register;
    
    this.loginService.loginUser(this.registration).subscribe(
      data => {
       this.registrationServerResponse = data;

       if( this.registrationServerResponse?.register?.password == this.form?.value.password){

        // TODO add the user to the local storage if loged in
        // TODO currently load the browser logout the user
        
        // store user email in the local storage
        this.storage.setItem('userEmail', JSON.stringify(this.form?.value.email));
        
        // mark user as login for canActivate and status bar 
        this.loginService.setAuthenticated(true);

         this.router.navigateByUrl('/products')
      } 
      else
        if(this.registrationServerResponse.register == null){
          this.emailErrorMsg = data.msg;
        }else{
          this.passwordErrorMsg = data.msg;
        }
        // TODO - reset the form only if email doesnt exist
        // TODO - if email exist and password wrong. rest only the passord
        this.form?.reset();
        
        console.log("this.emailErrorMsg: " + this.emailErrorMsg)
        console.log("this.passwordErrorMsg: " + this.passwordErrorMsg)
      }
    )

 
  }
}
