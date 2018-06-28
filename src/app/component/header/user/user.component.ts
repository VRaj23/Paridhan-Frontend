import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../../service/data.service';
import { LoginDetailsService } from '../../../service/intercom/login-details.service';
import { OrderResponse } from '../../../model/order-response.model';
import { Customer } from '../../../model/customer.model';
import { ConfirmationDialogComponent } from '../../modal/confirmation-dialog/confirmation-dialog.component';

import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import gql from 'graphql-tag';
import { OrderGQL, QueryGQL } from '../../../model/order.graphql';
import { JsonResponse } from '../../../model/json-response.model';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  orderCount: number = 0;
  orderedList: OrderResponse[] = [];
  customer: Customer = new Customer();
  loginStatus: boolean = false;

  orders: Observable<OrderGQL[]>;

  dialogName = "logoutConfirm"
  dialogTitle = "Confirm"
  dialogMessage = "Logout ?"
  dialogRedButton = "Yes, Logout"
  dialogGreenButton = "No"

  constructor(private loginService: LoginDetailsService
    ,private router: Router
    ,private dataService: DataService
    ,private apollo: Apollo
    ) { }

  ngOnInit() {

    this.loginService.getLoginStatus().subscribe(
      (status) => {
        if(!status){
          this.redirectToLogin();
        }else{
          this.getCustomerOrders();
          this.getCustomerInfo();
        }
      }
    );
  }

  private redirectToLogin(){
    this.router.navigate(['login/user']);
  }

  private getCustomerOrders(){
    this.orders = this.apollo.watchQuery<QueryGQL>({
      query: gql`
        {
          allOrders {
            orderID
            imageID
            productName
            status
            creationDateTime
          }
        }
      `
    })
    .valueChanges
    .pipe(
      map(result => result.data.allOrders)
    );
  }

  private getCustomerInfo(){
    this.dataService.getCustomerInfo().subscribe(
      (json) => {
        if(json.status == 200){
          this.customer = json.response;
          this.loginStatus = true;
        }else{
          this.redirectToLogin();
        }
      }
    );
  }

  logout(){
    this.loginService.onLogOut();
    this.router.navigate(['']);
  }

  onLogoutDialogButtonClick($event){
    if ($event == this.dialogRedButton){
      this.logout();
    }
  }

}