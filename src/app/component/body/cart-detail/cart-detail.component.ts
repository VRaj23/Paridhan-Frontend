import { Component, OnInit } from '@angular/core';
import { StoreService } from '../../../service/store.service';
import { Router } from '@angular/router';
import { Order } from '../../../model/order.model';

@Component({
  selector: 'app-cart-detail',
  templateUrl: './cart-detail.component.html',
  styleUrls: ['./cart-detail.component.css']
})
export class CartDetailComponent implements OnInit {

  private itemsInCart: number = 0;
  private totalAmount: number = 0;
  private orders: Order[] = [];

  constructor(private _storeService: StoreService,private router: Router) { 
    this._storeService.currentCartCount.subscribe(count => this.itemsInCart = count);
  }

  ngOnInit() {
    this.orders = this._storeService.getOrders();
    this.calculateTotalAmount();
  }

  initiateOrder(){
    if(this.itemsInCart > 0){
      console.log('Start Ordering');
      this.router.navigate(['order']);
    }
    else
      alert('No items in Cart\nPlease add items in cart to order');
  }

  private calculateTotalAmount(){
    for(var order of this.orders){
      this.totalAmount = this.totalAmount + order.amount;
    }
  }

}
