import { Component, OnInit } from '@angular/core';
import { StoreService } from '../../../service/store.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  private itemsInCart: number = 0;

  constructor(private _storeService: StoreService) { }

  ngOnInit() {
    this._storeService.currentCartCount.subscribe(count => this.itemsInCart = count);
  }

}
