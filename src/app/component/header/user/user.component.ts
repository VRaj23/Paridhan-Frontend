import { Component, OnInit } from '@angular/core';
import { StoreService } from '../../../service/store.service';
import { Router } from '@angular/router';
import { DataService } from '../../../service/data.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  private orderCount: number = 0;

  constructor(private storeService: StoreService,private router: Router
    ,private dataService: DataService) { }

  ngOnInit() {

    this.storeService.getLoginStatus().subscribe(
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
      (response) => {
        if(Array.isArray(response.message)){
          this.orderCount = response.message.length;
        }
      }
    );
  }

  logout(){
    this.storeService.onLogOut();
    this.router.navigate(['']);
  }

}
