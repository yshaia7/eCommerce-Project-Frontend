import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { CartItem } from '../common/cart-item';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cartItems: CartItem[] = [];

  totalPrice: Subject<number> = new BehaviorSubject<number>(0);
  totalQuantity: Subject<number> = new BehaviorSubject<number>(0);

  storage: Storage = localStorage;
 
  constructor() {

    // read data from storage
    // let data = JSON.parse(this.storage.getItem('cartItems') || '{}');

    // if(data == '{}')
    //   this.cartItems= [];
    // else 
    //   this.cartItems = data;
    

    // compute totals based on the data that is read from storage
    this.computeCartTotals();
  }

  addToCart(theCartItem: CartItem) {
    // check if we already have the item in our cart
    let alreadyExistInCart: boolean = false;
    let existingCartItem: CartItem | undefined;
    existingCartItem = undefined; 

    if (this.cartItems.length > 0) {
      // find the item in the cart based on item id

      // find the first item in the array that tests passes
      existingCartItem = this.cartItems.find(
        (tempCartItem) => theCartItem.id == tempCartItem.id
      );

      // check if we found the item
      alreadyExistInCart = existingCartItem != undefined;
    }

    if (alreadyExistInCart) {
      existingCartItem?.quantityPlusPlus();
    } else {
      // just add the item to the array
      this.cartItems.push(theCartItem);
    }

    // compute cart total price and total quantity
    this.computeCartTotals();
  }
  
  computeCartTotals() {
    let totalPriceValue: number = 0;
    let totalQuantityValue: number = 0;

    for (let currentCartItem of this.cartItems) {
      totalPriceValue +=
        currentCartItem.quantity * Number(currentCartItem?.unitPrice);
      totalQuantityValue += currentCartItem.quantity;
    }

    // publish the new values .. all subscribers will recive the new data
    this.totalPrice.next(totalPriceValue);
    this.totalQuantity.next(totalQuantityValue);

    // log cart data - debugging
    this.logCartData(totalPriceValue, totalQuantityValue);

    // resist cart data
    this.persistaCartItems();
  }

  decrementQuantity(theCartItem: CartItem) {
    theCartItem.quantity--;

    if (theCartItem.quantity == 0) {
      this.remove(theCartItem);
    } else {
      this.computeCartTotals();
    }
  }

  remove(theCartItem: CartItem) {

    // get index of item in the array
    const itemIndex = this.cartItems.findIndex(tempCartItem => tempCartItem.id === theCartItem.id);
    
    // if found, remove the item from the array at the given index
    if (itemIndex > -1){
      this.cartItems.splice(itemIndex, 1);
    }

    this.computeCartTotals();

  }

  persistaCartItems() {
    this.storage.setItem('cartItems', JSON.stringify(this.cartItems));
  }

  logCartData(totalPriceValue: number, totalQuantityValue: number) {
    console.log('Contents of the cart');
    for (let tempCartItem of this.cartItems) {
      const subTotalPrice =
        tempCartItem.quantity * Number(tempCartItem.unitPrice);
      console.log(
        `name: ${tempCartItem.name}, quantity=${tempCartItem.quantity}, unitPrice=${tempCartItem.unitPrice}, subTotalPrice=${subTotalPrice}`
      );
    }

    console.log(
      `totalPrice: ${totalPriceValue.toFixed(
        2
      )}, totalQuantity: ${totalQuantityValue}`
    );
    console.log('----');
  }
}
