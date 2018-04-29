import { Injectable } from '@angular/core';
import { ProductType } from '../model/product-type.model';
import { ProductHeader } from '../model/product-header.model';
import { Order } from '../model/order.model';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
@Injectable()
export class StoreService {

  constructor() { }

  //-----------------------------------------------//
  private selectedType = new ProductType();

  getSelectedType(): ProductType{
    return this.selectedType;
  }

  setSelectedType(productType: ProductType){
    this.selectedType = productType;
  }
  //-----------------------------------------------//


  //-----------------------------------------------//
  private selectedProductHeader = new ProductHeader();

  getSelectedProductHeader(): ProductHeader{
    return this.selectedProductHeader;
  }

  setSelectedProductHeader(productHeader: ProductHeader){
    this.selectedProductHeader = productHeader;
  }
  //-----------------------------------------------//


  //-----------------------------------------------//
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
  //-----------------------------------------------//


  //-----------------------------------------------//
  private cartCount = new BehaviorSubject<number>(0);
  currentCartCount = this.cartCount.asObservable();

  private add2Cart(count: number){
    this.cartCount.next(count);
  }

  resetCart(){
    this.cartCount.next(0);
    this.orders = [];
  }
  //-----------------------------------------------//
  //-----------------------------------------------//
  private orders: Order[] = [];

  addOrder(order: Order){
    this.orders.push(order);
    this.add2Cart(this.orders.length)
  }

  getOrders(): Array<Order>{
    return this.orders;
  }
  //-----------------------------------------------//
}