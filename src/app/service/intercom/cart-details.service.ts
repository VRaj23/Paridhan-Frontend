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

  private  addedToCartCount = new BehaviorSubject<number>(0);
  triggerCartIconAnimate = this.addedToCartCount.asObservable();

  private add2Cart(count: number){
    this.cartCount.next(count);
  }

  private incrementAddedToCartCount(count: number){
    //required to trigger cart icon animation
    this.addedToCartCount.next(count);
  }

  resetCart(){
    this.cartCount.next(0);
    this.itemsInCart = [];
    this.udpateCartDataInSessionStorage();
    
  } 

  addCartItem(cartItem: CartItem){
    var lineID: number = cartItem.product.lineID;
    var index: number = this.productAlreadyExistsInCart(lineID);
    if(index < 0){//add to cart
      this.itemsInCart.push(cartItem);
      this.add2Cart(this.itemsInCart.length);
      this.incrementAddedToCartCount(this.addedToCartCount.value+1);
    }else{//append to cart
      this.incrementAddedToCartCount(this.addedToCartCount.value+1);
      this.itemsInCart[index].quantity += cartItem.quantity;
    }
    this.udpateCartDataInSessionStorage();
  }

  private productAlreadyExistsInCart(lineID: number): number{
    for(var index=0; index<this.itemsInCart.length; index++){
      if(lineID == this.itemsInCart[index].product.lineID)
        return index;
    }
    return -1;
  }

  private udpateCartDataInSessionStorage(){
    sessionStorage.setItem('cart', JSON.stringify(this.itemsInCart));
  }

  restoreCartData(cartItems: CartItem[]){
    this.itemsInCart = cartItems;
    this.add2Cart(this.itemsInCart.length);
  }

  getItemsInCart(): Array<CartItem>{
    return this.itemsInCart;
  }

  deleteCartItem(index: number){
    if (index > -1) {
      this.itemsInCart.splice(index, 1);
      this.add2Cart(this.itemsInCart.length);
      this.incrementAddedToCartCount(this.addedToCartCount.value+1);
      this.udpateCartDataInSessionStorage();
    }
  }

}
