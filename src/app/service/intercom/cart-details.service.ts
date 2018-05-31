import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { OrderRequest } from '../../model/order-request.model';
import { CartItem } from '../../model/cart-item.model';

@Injectable()
export class CartDetailsService {

  constructor() { }

  private itemsInCart: CartItem[] = [];
  private cartCount = new BehaviorSubject<number>(0);

  currentCartCount = this.cartCount.asObservable();

  private add2Cart(count: number){
    this.cartCount.next(count);
  }

  resetCart(){
    this.cartCount.next(0);
    this.itemsInCart = [];
    
  } 

  addCartItem(cartItem: CartItem){
    this.itemsInCart.push(cartItem);
    this.add2Cart(this.itemsInCart.length);
  }

  getItemsInCart(): Array<CartItem>{
    return this.itemsInCart;
  }

}
