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
  
  registrationServerResponse: Registration = new Registration();

  // TODO need to add relevent error message if password input is incorrect
  
  ngOnInit(): void {
    
    
  }

  onSubmit() {

    this.register.email = this.form?.value.email;
    this.register.password = this.form?.value.password;


    this.registration.register = this.register;
    
    this.loginService.loginUser(this.registration).subscribe(
      data => {
       this.registrationServerResponse = data;
      }
    )

    if( this.registrationServerResponse?.register?.password == this.form?.value.password){
      console.log('rest data');
      this.form?.reset();
      this.loginService.setAuthenticated(true);
      console.log('this.loginService.setAuthenticated(true)');
      // TODO change it to navigateByUrl
       this.router.navigate(['products'])
    } 
    else
      console.log(this.registrationServerResponse);
  }
}
