import { Component, OnInit } from '@angular/core';
import { StoreService } from '../../../service/store.service';
import { DataService } from '../../../service/data.service';
import { Router } from '@angular/router';
import { Order } from '../../../model/order.model';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  private orders: Array<Order>;

  constructor(private storeService: StoreService,
    private dataService: DataService, private router: Router) { }

  ngOnInit() {
    this.storeService.getLoginStatus().subscribe(
      (status) => {
        if(!status){
          this.router.navigate(['login/order']);
        }
      }
    );

    this.orders = this.storeService.getOrders();

  }

  placeOrder(){
    console.log("place Order");
    for(var order of this.orders){
      this.dataService.postOrders(order).subscribe(
        (response) => {
          if(response.status = 201){
            console.log('Order Placed');
            this.storeService.resetCart();
          }else{
            console.log('Unable to place Order');
          }
        }
      );
    }
  
  }

}
