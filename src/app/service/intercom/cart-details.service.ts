import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { OrderRequest } from '../../model/order-request.model';

@Injectable()
export class CartDetailsService {

  constructor() { }

  private orders: OrderRequest[] = [];
  private cartCount = new BehaviorSubject<number>(0);

  currentCartCount = this.cartCount.asObservable();

  private add2Cart(count: number){
    this.cartCount.next(count);
  }

  resetCart(){
    this.cartCount.next(0);
    this.orders = [];
    
  } 
  addOrder(order: OrderRequest){
    this.orders.push(order);
    this.add2Cart(this.orders.length)
  }

  getOrders(): Array<OrderRequest>{
    return this.orders;
  }

}
