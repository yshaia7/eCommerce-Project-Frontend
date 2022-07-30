import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Register } from '../common/register';
import { Registration } from '../common/registration';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  private registerUrl = 'http://localhost:8080/api/register/addNewRegister';

  constructor(private httpClient: HttpClient) { }

  addnewRegister(registration: Registration): Observable<any>{
    return this.httpClient.post<Registration>(this.registerUrl, registration);
  }

}

  // interface GetRegisterResponse{
  //   _embedded: {
  //     orders: OrderHistory[];
  //   }
  // }