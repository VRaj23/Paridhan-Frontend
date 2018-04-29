import { Component, OnInit } from '@angular/core';
import { StoreService } from '../../../service/store.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  constructor(private storeService: StoreService,private router: Router) { }

  ngOnInit() {

    this.storeService.getLoginStatus().subscribe(
      (status) => {
        if(!status){
          this.router.navigate(['login/user']);
        }
      }
    );
    
  }

  logout(){
    this.storeService.onLogOut();
    this.router.navigate(['']);
  }

}
