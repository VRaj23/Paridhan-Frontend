import { Injectable } from '@angular/core';
import { BehaviorSubject ,  Observable } from 'rxjs';
import { DataService } from '../data.service';
import { Apollo } from 'apollo-angular';

@Injectable()
export class LoginDetailsService {

  constructor(private apollo: Apollo) { }

  private loggedIn = new BehaviorSubject<boolean>(false);
  private token: string;
  private 

  getLoginStatus(): Observable<boolean>{
    return this.loggedIn;
  }

  getToken(): string{
    return this.token;
  }

  onLogin(token: string){
    this.token = token.replace(/(\r\n|\n|\r)/gm,"").trim();
    this.loggedIn.next(true);

  }

  onLogOut(){
    this.apollo.getClient().resetStore();
    this.token = "";
    this.loggedIn.next(false);
  }

}
