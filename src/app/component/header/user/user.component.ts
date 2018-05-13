import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../../service/data.service';
import { LoginDetailsService } from '../../../service/intercom/login-details.service';
import { OrderResponse } from '../../../model/order-response.model';
import { Customer } from '../../../model/customer.model';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  private orderCount: number = 0;
  private orderedList: OrderResponse[] = [];
  private customer: Customer = new Customer();
  private loginStatus: boolean = false;

  constructor(private loginService: LoginDetailsService
    ,private router: Router
    ,private dataService: DataService) { }

  ngOnInit() {

    this.loginService.getLoginStatus().subscribe(
      (status) => {
        if(!status){
          this.router.navigate(['login/user']);
        }else{
          this.getCustomerOrders();
          this.getCustomerInfo();
        }
      }
    );
    
  }

  private getCustomerOrders(){
    this.dataService.getCustomerOrders().subscribe(
      (json) => {
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
        this.customer = json.response;
        this.loginStatus = true;
      }
    );
  }

  logout(){
    this.loginService.onLogOut();
    this.router.navigate(['']);
  }

}
