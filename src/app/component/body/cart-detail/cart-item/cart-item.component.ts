import { Component, OnInit, Input } from '@angular/core';
import { OrderRequest } from '../../../../model/order-request.model';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.css']
})
export class CartItemComponent implements OnInit {

  @Input() order: OrderRequest;

  constructor() { }

  ngOnInit() {
  }

}
