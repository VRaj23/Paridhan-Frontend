import { Injectable } from '@angular/core';
import { ProductType } from '../../model/product-type.model';
import { Image } from '../../model/image.model';

@Injectable()
export class SelectedProductTypeService {

  private selectedType: ProductType = new ProductType();

  constructor() { }

  getSelectedType(): ProductType{
    return this.selectedType;
  }

  setSelectedType(productType: ProductType){
    this.selectedType = productType;
  }
  
}
