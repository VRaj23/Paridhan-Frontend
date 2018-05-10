import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class LoginDetailsService {

  constructor() { }

  private loggedIn = new BehaviorSubject<boolean>(false);
  private token: string;

  getLoginStatus(): Observable<boolean>{
    return this.loggedIn;
  }

  getToken(): string{
    return this.token;
  }

  onLogin(token: string, name: string){
    this.token = token.replace(/(\r\n|\n|\r)/gm,"").trim();
    this.loggedIn.next(true);
  }

  onLogOut(){
    this.token = "";
    this.loggedIn.next(false);
  }

}
