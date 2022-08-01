import { Component, OnInit } from '@angular/core';
import { OrderHistory } from 'src/app/common/order-history';
import { OrderHistoryService } from 'src/app/services/order-history.service';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.css']
})
export class OrderHistoryComponent implements OnInit {

  orderHistoryList: OrderHistory[] = [];
  storage: Storage = localStorage;

  constructor(private orderHistoryService: OrderHistoryService) { }

  ngOnInit(): void {
    this.handleOrderHistoryService();
  }
  handleOrderHistoryService() {
    
    // read the user's email address from browser storage
    const theEmail = JSON.parse(this.storage.getItem('userEmail') || '{}');

    //const theEmail = "yshaia7@gmail.com";
    // retrieve data from the service
    this.orderHistoryService.getOrderHistory(theEmail).subscribe(
      data => 
        { 
          console.log(data)
          return this.orderHistoryList = data._embedded.orders
        }
    ), (error: any) =>{
      console.log(error);
    };
    //if(data == '{}'));
  }


}
