import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../service/data.service';
import { Router } from '@angular/router';
import { OrderRequest } from '../../../model/order-request.model';
import { LoginDetailsService } from '../../../service/intercom/login-details.service';
import { CartDetailsService } from '../../../service/intercom/cart-details.service';
import { Address } from '../../../model/address.model';
import { Customer } from '../../../model/customer.model';
import { CartItem } from '../../../model/cart-item.model';
import { Apollo } from 'apollo-angular';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  cartItems: CartItem[] = [];
  orders: OrderRequest[] = [];
  deliveryAddress: Address = new  Address();
  customerName: string;
  customerContact: string;
  placeOrderDisabled: boolean = false;
  isOrderPlaced: boolean = false;


  constructor(private loginDetailService: LoginDetailsService,
    private cartDetailService: CartDetailsService,
    private dataService: DataService, 
    private router: Router,
    private apollo: Apollo) { }

  ngOnInit() {
    this.loginDetailService.getLoginStatus().subscribe(
      (status) => {
        if(!status){
          this.router.navigate(['login/order']);
        }else{
          this.dataService.getCustomerInfo().subscribe(
            (json)=>{
              this.deliveryAddress = json.response.addressResponse;
            }
          );
        }
      }
    );
    this.cartItems = this.cartDetailService.getItemsInCart();
  }

  placeOrder(){
    this.placeOrderDisabled = true;
    console.log("placing Order");
    this.prepareOrders();
    
      this.dataService.postOrders(this.orders).subscribe(
        (json) => {
          if(json.status == 201){
            console.log('Order Placed '+json.message);
            this.isOrderPlaced = true;
            this.apollo.getClient().resetStore();
            this.orders=[]
            this.placeOrderDisabled = false;
            this.cartDetailService.resetCart();
            //TODO show dialog and redirect to user page
          }else{
            console.log('Unable to place Order');
          }
        }
      );
  
  }

  prepareOrders(){
    for(var item of this.cartItems){
      this.orders.push(new OrderRequest(
        item.product.lineID
        ,this.deliveryAddress.addressID
        ,item.quantity
        ,item.price * item.quantity
      ));
    }
  }

  orderPlacedOK(){
    this.router.navigate(['/user']);
  }

}
