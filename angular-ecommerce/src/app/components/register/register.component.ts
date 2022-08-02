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
  statusMsgFromServer?: boolean;
  registretionStatus: string = '';

  constructor(private registerService: RegisterService,
              private router: Router) {}

  ngOnInit(): void {}

  validateRegistration(msg: string) {
    
    console.log("this.registretionStatus: " + this.registretionStatus);
    console.log("this.registretionStatus: " + this.registretionStatus.length);
    this.statusMsgFromServer = (this.registretionStatus.length == 0);
    console.log('this.statusMsgFromServer: '  + this.statusMsgFromServer);
    console.log(this.statusMsgFromServer);

   

  }

  onSubmit() {

    this.register.email = this.form?.value.email;
    this.register.password = this.form?.value.password;
    
    this.registration.register = this.register;

    this.registerService.addnewRegister(this.registration).subscribe(
      data => { 
        this.registretionStatus = data.msg;

        this.form?.reset();
    
        if(this.registretionStatus.length == 0){
          this.router.navigateByUrl('/login');
        }

      }
    );
  }

}


