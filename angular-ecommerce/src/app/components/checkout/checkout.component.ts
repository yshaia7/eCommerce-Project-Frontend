import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Luv2ShopFormService } from 'src/app/services/luv2-shop-form.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  checkoutFormGroup!: FormGroup ;
  creditCardYears: number[] = [];
  creditCardMonth: number[] = [];

  totalPrice: number = 0;
  totalQuantity: number = 0;

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

  }

  copyShipingAddressToBillingAddress(event: any){
    console.log(this.checkoutFormGroup.controls['billingAddress']);
    if(event.target.checked){
      this.checkoutFormGroup.controls['billingAddress']
      .setValue(this.checkoutFormGroup.controls['shippingAddress'].value)
    }
    else{
      this.checkoutFormGroup.controls['billingAddress'].reset();
    }
  }
  onSubmit(){
    console.log("Hendeling the submit button");
    console.log(this.checkoutFormGroup.get('customer')?.value);
    console.log("The email is: " +this.checkoutFormGroup.get('customer')?.value.email);
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
}


