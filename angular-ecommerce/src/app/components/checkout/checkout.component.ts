import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  checkoutFormGroup!: FormGroup ;
  
  totalPrice: number = 0;
  totalQuantity: number = 0;

  constructor(private formBuilder: FormBuilder) { }

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
}


