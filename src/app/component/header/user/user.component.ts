import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../../service/data.service';
import { LoginDetailsService } from '../../../service/intercom/login-details.service';
import { OrderResponse } from '../../../model/order-response.model';
import { Customer } from '../../../model/customer.model';
import { ConfirmationDialogComponent } from '../../modal/confirmation-dialog/confirmation-dialog.component';

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

  dialogName = "logoutConfirm"
  dialogTitle = "Confirm"
  dialogMessage = "Logout ?"
  dialogRedButton = "Yes, Logout"
  dialogGreenButton = "No"

  constructor(private loginService: LoginDetailsService
    ,private router: Router
    ,private dataService: DataService
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
    this.dataService.getCustomerOrders().subscribe(
      (json) => {
        if(json.status != 200)
          this.redirectToLogin();

        if(Array.isArray(json.response)){
          this.orderCount = json.response.length;
          this.orderedList = json.response;
        }
      }
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
