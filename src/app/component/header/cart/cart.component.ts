import { Component, OnInit } from '@angular/core';
import { CartDetailsService } from '../../../service/intercom/cart-details.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  private itemsInCart: number = 0;

  constructor(private cartService: CartDetailsService) { }

  ngOnInit() {
    this.cartService.currentCartCount.subscribe(count => this.itemsInCart = count);
  }

}
