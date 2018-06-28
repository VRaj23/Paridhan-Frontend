import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-user-order-detail',
  templateUrl: './user-order-detail.component.html',
  styleUrls: ['./user-order-detail.component.css']
})

export class UserOrderDetailComponent implements OnInit {

  _orderID: number;
  orderSubscripton: Subscription;

  constructor(
     private activeRoute: ActivatedRoute
    ,private apollo: Apollo
  ) { }

  ngOnInit() {
    this._orderID = this.activeRoute.snapshot.params['id'];
    this.getCustomerOrders();
  }
  //TODO: use graphQL(this._orderID)
  private getCustomerOrders(){
    console.log(this._orderID);
  }

}