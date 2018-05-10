import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../service/data.service';
import { Router } from '@angular/router';
import { OrderRequest } from '../../../model/order-request.model';
import { LoginDetailsService } from '../../../service/intercom/login-details.service';
import { CartDetailsService } from '../../../service/intercom/cart-details.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  private orders: Array<OrderRequest>;

  constructor(private loginDetailService: LoginDetailsService,
    private cartDetailService: CartDetailsService,
    private dataService: DataService, private router: Router) { }

  ngOnInit() {
    this.loginDetailService.getLoginStatus().subscribe(
      (status) => {
        if(!status){
          this.router.navigate(['login/order']);
        }
      }
    );

    this.orders = this.cartDetailService.getOrders();

  }

  placeOrder(){
    console.log("place Order");
    for(var order of this.orders){
      console.log("Placing Order for addressID "+order.deliveryAddressID)
      this.dataService.postOrders(order).subscribe(
        (res) => {
          if(res.status == 201){
            console.log('Order Placed '+res.message);
            this.cartDetailService.resetCart();
          }else{
            console.log('Unable to place Order');
          }
        }
      );
    }
  
  }

}
