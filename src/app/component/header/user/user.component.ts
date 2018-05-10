import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../../service/data.service';
import { LoginDetailsService } from '../../../service/intercom/login-details.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  private orderCount: number = 0;

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
        }
      }
    );
    
  }

  private getCustomerOrders(){
    this.dataService.getCustomerOrders().subscribe(
      (json) => {
        if(Array.isArray(json.response)){
          this.orderCount = json.response.length;
        }
      }
    );
  }

  logout(){
    this.loginService.onLogOut();
    this.router.navigate(['']);
  }

}
