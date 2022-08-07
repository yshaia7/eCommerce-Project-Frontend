import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {  Observable, of } from 'rxjs';
import { Country } from '../common/country';
import {map} from 'rxjs/operators';
import { State } from '../common/state';
import { AppConsts } from '../common/app-consts';
<<<<<<< HEAD
import { GetResponseCountries, GetResponseStates } from '../common/app-interfaces';
=======
>>>>>>> fab866f3ff276d80c3e112b48cd2d6850a7f4022

@Injectable({
  providedIn: 'root'
})
export class Luv2ShopFormService {

  private contriesUrl = 'http://localhost:8080/api/countries';
  private stateUrl =  'http://localhost:8080/api/states';

  constructor(private httpClient: HttpClient) { }

  getCountries(): Observable<Country[]>{
    return this.httpClient.get<GetResponseCountries>(this.contriesUrl).pipe(
      map(response => response._embedded.countries)
    );
  }

  getStates(theCountryCode: string): Observable<State[]>{

    // searchUrl
    const searchStatesUrl  = `${this.stateUrl}/search/findByCountryCode?code=${theCountryCode}`;
    
    return this.httpClient.get<GetResponseStates>(searchStatesUrl).pipe(
      map(response => response._embedded.states)
    );
  }

  getCreditCardMonths(startMonth: number): Observable<number[]>{
    
    let data: number[] = [];

    // build an array for "Month" dropdown list
    // - start at current month and loop until

    for (let theMonth = startMonth; theMonth <= AppConsts.MONTH; theMonth++){
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
    const endYear: number = startYear + AppConsts.TEN;

    for(let theYear = startYear; theYear <= endYear; theYear++){
      data.push(theYear);
    }

    return of(data)
  }
}
