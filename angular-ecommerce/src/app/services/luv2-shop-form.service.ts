import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Luv2ShopFormService {

  constructor() { }

  getCreditCardMonths(startMonth: number): Observable<number[]>{
    
    let data: number[] = [];

    // build an array for "Month" dropdown list
    // - start at current month and loop until

    // Todo - change the number 12 to consts
    for (let theMonth = startMonth; theMonth <= 12; theMonth++){
      data.push(theMonth);
    }

    // wrap the array with Observable
    return of(data);
  }

  getCreditCardYears(): Observable<number[]>{
    let data:number[] = [];

       // build an array for "Year" dropdown list
    // - start at current year and loop for next 10 year

    const startYear: number = new Date().getFullYear();
    const endYear: number = startYear +10;

    for(let theYear = startYear; theYear <= endYear; theYear++){
      data.push(theYear);
    }

    return of(data)
  }
}
