import { Injectable } from '@angular/core';
import { ProductType } from '../model/product-type.model';
import { ProductHeader } from '../model/product-header.model';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
@Injectable()
export class StoreService {

  private selectedType = new ProductType();
  private selectedProductHeader = new ProductHeader();
  
  private cartCount = new BehaviorSubject<number>(0);
  currentCarCount = this.cartCount.asObservable();

  constructor() { }

  add2Cart(count: number){
    this.cartCount.next(count);
  }

  getSelectedType(): ProductType{
    return this.selectedType;
  }

  setSelectedType(productType: ProductType){
    this.selectedType = productType;
  }

  getSelectedProductHeader(): ProductHeader{
    return this.selectedProductHeader;
  }

  setSelectedProductHeader(productHeader: ProductHeader){
    this.selectedProductHeader = productHeader;
  }

}
