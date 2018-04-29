import { Component, OnInit } from '@angular/core';
import { StoreService } from '../../../service/store.service';
import { DataService } from '../../../service/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  constructor(private storeService: StoreService,
    private dataService: DataService, private router: Router) { }

  ngOnInit() {
    this.storeService.getLoginStatus().subscribe(
      (status) => {
        if(!status){
          this.router.navigate(['login/order']);
        }
      }
    );
  }

}
