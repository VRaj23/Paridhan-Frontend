import { Component, OnInit } from '@angular/core';
import { StoreService } from '../../../service/store.service';
import { DataService } from '../../../service/data.service';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginRequest } from '../../../model/login-request.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private storeService: StoreService, private dataService: DataService
    ,private router: Router,private activeRoute: ActivatedRoute) { }

  ngOnInit() {
  }

  login(formData: NgForm){
    console.log('Trying to login');
    
    var loginRequest: LoginRequest = new LoginRequest();
    loginRequest.username = formData.value.username;
    loginRequest.password = formData.value.password;
    
    this.dataService.postLogin(loginRequest).subscribe(
      (response) => {
        if(response.status == 200){
          console.log("Login Successful");
          this.storeService.onLogin(response.message,loginRequest.username.trim());
          this.router.navigate([this.activeRoute.snapshot.params['backPath']]);
        }
        else{
          console.log(response.status+":"+response.message);
        }
      }
    );
    
  }

  newUser(){
    this.router.navigate(['register']);
  }
}
