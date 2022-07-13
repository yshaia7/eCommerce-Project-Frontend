import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Country } from 'src/app/common/country';
import { State } from 'src/app/common/state';
import { Luv2ShopFormService } from 'src/app/services/luv2-shop-form.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  
  checkoutFormGroup!: FormGroup ;
  
  totalPrice: number = 0;
  totalQuantity: number = 0;

  creditCardYears: number[] = [];
  creditCardMonth: number[] = [];

  countries: Country[] = [];

  shippingAddressStates: State[] = [];
  billingAddressStates: State[] = [];

  

  constructor(private formBuilder: FormBuilder,
              private luv2ShopFormService: Luv2ShopFormService) { }

  ngOnInit(): void {
  
  // Todo: after finish the project modify that duplication code
  this.checkoutFormGroup = this.formBuilder.group({
    customer: this.formBuilder.group({
      firstName: [''],
      lastName: [''],
      email: ['']
    }),
    shippingAddress: this.formBuilder.group({
      country: [''],
      street: [''],
      city: [''],
      state: [''],
      zipCode: ['']
      }),
      billingAddress: this.formBuilder.group({
        country: [''],
        street: [''],
        city: [''],
        state: [''],
        zipCode: ['']
      }),
      creditCard: this.formBuilder.group({
        cardType: [''],
        nameOnCard: [''],
        cardNumber: [''],
        securityCode: [''],
        expirationMonth: [''],
        expirationYear: ['']
      })
    
  })
    // populate credit card months
    const startMonth: number = new Date().getMonth() + 1;
    console.log("startMonth: " + startMonth);

    this.luv2ShopFormService.getCreditCardMonths(startMonth).subscribe(
      data => {
        console.log("Retrived credit card month: " + JSON.stringify(data));
        this.creditCardMonth = data;
      }
    );

    // populate credit card years
      this.luv2ShopFormService.getCreditCardYears().subscribe(
        data => {
          console.log("Retrived credit card years: " + JSON.stringify(data));
          this.creditCardYears = data;
        }
      )

      // populate countries
        this.luv2ShopFormService.getCountries().subscribe(
          data => {
            console.log("Retrived countries: " + JSON.stringify(data));
          this.countries = data;
          }
        )

  }

  copyShipingAddressToBillingAddress(event: any){
    console.log(this.checkoutFormGroup.controls['billingAddress']);
    if(event.target.checked){
      this.checkoutFormGroup.controls['billingAddress']
      .setValue(this.checkoutFormGroup.controls['shippingAddress'].value);

      // bug fix for states
      this.billingAddressStates = this.shippingAddressStates;
    }
    else{
      this.checkoutFormGroup.controls['billingAddress'].reset();

      // bug fix for states
      this.billingAddressStates = [];
    }
  }
  onSubmit(){
    console.log("Hendeling the submit button");
    console.log(this.checkoutFormGroup.get('customer')?.value);
    console.log("The email is: " +this.checkoutFormGroup.get('customer')?.value.email);

    console.log("The shipping address country is: " +this.checkoutFormGroup.get('shippingAddress')?.value.country.name);
    console.log("The shipping state is: " +this.checkoutFormGroup.get('shippingAddress')?.value.state.name);


  }


  handleMonthsAndYears(){

    const creditCardFormGroup = this.checkoutFormGroup.get('creditCard');

    const currentYear: number = new Date().getFullYear();
    const selectedYear: number = Number(creditCardFormGroup?.value.expirationYear);

    let startMonth: number;

    if(currentYear === selectedYear){
      startMonth = new Date().getMonth() + 1;
    }
    else{
      startMonth = 1;
    }

    this.luv2ShopFormService.getCreditCardMonths(startMonth).subscribe(
      data => {
        console.log("Retrived credit card month: " + JSON.stringify(data));
        this.creditCardMonth = data;
      }
    );
  }
  getStates(formGroupName: string){

    const formGroup = this.checkoutFormGroup.get(formGroupName);

    const countryCode = formGroup?.value.country.code;
    const countryName = formGroup?.value.country.name;

    console.log(`${formGroupName} country code: ${countryCode}`);
    console.log(`${formGroupName} country name: ${countryName}`);

    this.luv2ShopFormService.getStates(countryCode).subscribe(
      data => {
       if(formGroupName === 'shippingAddress') {
          this.shippingAddressStates = data;
       }else{
        this.billingAddressStates = data;
       }

       // select first item by default
       formGroup?.get('state')?.setValue(data[0]);
      }
    )
  }
}


