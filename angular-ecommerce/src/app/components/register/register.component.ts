import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {


  // TODO store user details in new DB Tables
  // TODO need to create the tables first
  submitted: boolean = false;
  
  constructor() { }

  ngOnInit(): void {
  }


     LoginUser = {email: '', password: ''};

  initializeRegisterDetail(form: NgForm | undefined){
    // this.loginUser.email = form?.value.userData.email;
    // this.loginUser.password = form?.value.userData.password;
    // console.log("initilaize method, login detail ")
    // console.log(this.loginUser);
    // return this.loginUser;
}

  getLoginUser(){
    //return this.loginUser;
}

onSubmit(){

}





}
