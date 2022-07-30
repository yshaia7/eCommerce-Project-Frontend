import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Register } from 'src/app/common/register';
import { Registration } from 'src/app/common/registration';
import { RegisterService } from 'src/app/services/register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  @ViewChild('f') form: NgForm | undefined;

  registration: Registration = new Registration();
  register: Register = new Register();

  registretionStatus: string = '';
  //emailErrorMsgFromTheServer = '';
  // TODO store user details in new DB Tables

  submitted: boolean = false;

  constructor(private registerService: RegisterService,
              private router: Router) {}

  ngOnInit(): void {}

  // fix - every second click on register button fall inside if
  validateRegistration() {
    this.form?.reset();
    if(Number(this.registretionStatus.length) > 0){
        console.log("inside if")
        this.router.navigateByUrl('/login');
    }
    else{  
      console.log("inside else")
      this.registretionStatus = '';
      console.log(this.registretionStatus);
    }

  }

  onSubmit() {

    this.register.email = this.form?.value.email;
    this.register.password = this.form?.value.password;
    
    this.registration.register = this.register;

    this.registerService.addnewRegister(this.registration).subscribe(
      data => { 
        this.registretionStatus = data.msg;
        console.log("this.registretionStatus: " + this.registretionStatus);
        console.log("this.registretionStatus: " + this.registretionStatus.length);
      }
    );
    this.validateRegistration();
  }

}


