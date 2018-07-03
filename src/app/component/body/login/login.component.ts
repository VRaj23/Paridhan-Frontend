import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../service/data.service';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginRequest } from '../../../model/login-request.model';
import { NgForm } from '@angular/forms';
import { LoginDetailsService } from '../../../service/intercom/login-details.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private loginDetailService: LoginDetailsService
    , private dataService: DataService
    ,private router: Router
    ,private activeRoute: ActivatedRoute) { }

    loginFailed: boolean = false;
    loggingIn: boolean = false;

  ngOnInit() {
  }

  login(formData: NgForm){
    console.log('Trying to login');
    this.loggingIn = true;
    var loginRequest: LoginRequest = new LoginRequest();
    loginRequest.username = formData.value.username;
    loginRequest.password = formData.value.password;
    
    this.dataService.postLogin(loginRequest).subscribe(
      (json) => {
        this.loggingIn = false;
        if(json.status == 200){
          console.log("Login Successful");
          this.loginFailed = false;
          this.loginDetailService.onLogin(json.response);
          if(this.activeRoute.snapshot.params['backPath'] == null)
            this.router.navigate(['']);
          else
            this.router.navigate([this.activeRoute.snapshot.params['backPath']]);
        }
        else{
          console.log(json.status+":"+json.message);
          this.loginFailed = true;
        }
      }
    );
    
  }

  newUser(){
    this.router.navigate(['register']);
  }

  resetLoginFailed(){
    this.loginFailed = false;
  }
}
