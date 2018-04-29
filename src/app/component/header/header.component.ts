import { Component, OnInit } from '@angular/core';
import { StoreService } from '../../service/store.service';
import { DataService } from '../../service/data.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  private user: string = "Login";

  constructor(private storeService: StoreService, private dataService: DataService) { }

  ngOnInit() {
    this.storeService.getLoginStatus().subscribe(
      (status) => {
        if(status){
         this.getName(); 
        }else{
          this.user="Login";
        }          
      }
    );
  }

  private getName(){
    this.dataService.getName().subscribe(
      (response) => {
        if(response.status == 200)
          this.user = response.message;
      }
    );
  }

}
