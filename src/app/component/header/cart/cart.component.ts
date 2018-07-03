import { Component, OnInit } from '@angular/core';
import { CartDetailsService } from '../../../service/intercom/cart-details.service';
import { popOut, popOutState } from '../../../animation/pop-out.animation';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
  animations: [popOut]
})
export class CartComponent implements OnInit {

  itemsInCart: number = 0;
  state: popOutState = popOutState.INITIAL;

  constructor(private cartService: CartDetailsService) { }

  ngOnInit() {
    this.cartService.currentCartCount.subscribe(
      (count) => {
        this.itemsInCart = count          
      });
    
    this.cartService.triggerCartIconAnimate.subscribe(
      (count) => this.cartIconAnimate()
    );
  }

  cartIconAnimate(){
    this.state == popOutState.INITIAL ? this.state = popOutState.FINAL : this.state = popOutState.INITIAL;
  }

}
