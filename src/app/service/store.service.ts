import { Injectable } from '@angular/core';
import { ProductType } from '../model/product-type.model';
import { ProductHeader } from '../model/product-header.model';

@Injectable()
export class StoreService {

  private selectedType = new ProductType();
  private selectedProductHeader = new ProductHeader();

  constructor() { }

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
