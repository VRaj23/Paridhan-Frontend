import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartDetailsService } from '../../../service/intercom/cart-details.service';
import { CartItem } from '../../../model/cart-item.model';

@Component({
  selector: 'app-cart-detail',
  templateUrl: './cart-detail.component.html',
  styleUrls: ['./cart-detail.component.css']
})
export class CartDetailComponent implements OnInit {

  itemsInCart: number = 0;
  totalAmount: number = 0;
  cartItems: CartItem[] = [];
  showItemTable:boolean =  false;

  dialogName = "clearCartConfirmDialog";
  dialogTitle = "Confirm"
  dialogMessage = "Clear all items from shopping cart ?"
  dialogRedButton = "Yes, clear cart"
  dialogGreenButton = "No !"


  constructor(
     private cartDetailsService: CartDetailsService
    ,private router: Router) 
    { 
    this.cartDetailsService.currentCartCount.subscribe
    ((count) => {
      this.itemsInCart = count
      if(count==0)
        this.showItemTable = false;
      else
        this.showItemTable = true;
    });
  }

  ngOnInit() {
    this.cartItems = this.cartDetailsService.getItemsInCart();
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
    for(var item of this.cartItems){
      this.totalAmount = this.totalAmount + item.price * item.quantity;
    }
  }

  clearCart(){
    this.cartDetailsService.resetCart();
  }

  onClearCartConfirmDialogButtonClick($event){
    if ($event ==  this.dialogRedButton)
      this.clearCart();
  }

  onDeleteCartItem(index: number){
    this.cartDetailsService.deleteCartItem(index);
    this.cartItems = this.cartDetailsService.getItemsInCart();
  }

}
