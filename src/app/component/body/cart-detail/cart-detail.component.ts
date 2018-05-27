import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartDetailsService } from '../../../service/intercom/cart-details.service';
import { CartItem } from '../../../model/cart-item.model';

import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

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

  constructor(
     private cartDetailsService: CartDetailsService
    ,private router: Router
    ,private ngModal: NgbModal) 
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

  open(content) {
    this.ngModal.open(content, { size: 'sm',centered: true }).result.then((result) => {
        if (result == 'yes'){
          this.clearCart();
        }
      }, (rejected) => {
        console.log('dismissed');
    });
  }

}
