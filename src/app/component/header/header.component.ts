import { Component, OnInit } from '@angular/core';
import { DataService } from '../../service/data.service';
import { Customer } from '../../model/customer.model';
import { LoginDetailsService } from '../../service/intercom/login-details.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  cutomer: Customer;
  customerName: string = "Login";

  constructor(private dataService: DataService
    ,private loginDetailsService: LoginDetailsService) { }

  ngOnInit() {
    this.loginDetailsService.getLoginStatus().subscribe(
      (status) => {
        if(status){
         this.getName(); 
        }else{
          this.customerName="Login";
        }          
      }
    );
  }

  private getName(){//TODO need to change
    this.dataService.getCustomerInfo().subscribe(
      (json) => {
        if(json.status == 200)
          this.cutomer = json.response;
          this.customerName = this.cutomer.name;
      }
    );
  }
}