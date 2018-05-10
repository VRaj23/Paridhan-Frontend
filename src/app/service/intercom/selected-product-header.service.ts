import { Injectable } from '@angular/core';
import { ProductHeader } from '../../model/product-header.model';

@Injectable()
export class SelectedProductHeaderService {

  private selectedProductHeader = new ProductHeader();

  constructor() { }  

  getSelectedProductHeader(): ProductHeader{
    return this.selectedProductHeader;
  }

  setSelectedProductHeader(productHeader: ProductHeader){
    this.selectedProductHeader = productHeader;
  }

}
