import { Component, OnInit } from '@angular/core';
import { StoreService } from '../../../service/store.service';

@Component({
  selector: 'app-cart-detail',
  templateUrl: './cart-detail.component.html',
  styleUrls: ['./cart-detail.component.css']
})
export class CartDetailComponent implements OnInit {

  private itemsInCart:number = 0;

  constructor(private _storeService: StoreService) { 
    this._storeService.currentCarCount.subscribe(count => this.itemsInCart = count);
  }

  ngOnInit() {
  }

}
