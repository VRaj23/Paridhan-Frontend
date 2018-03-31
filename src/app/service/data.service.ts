import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { ProductType } from '../model/product-type.model';

@Injectable()
export class DataService {

  private productTypeAPI: string = "http://localhost:8080/product/type";

  constructor(private _http: HttpClient) { 
    this._http 
  }

  getProductType(): Observable<Array<ProductType>>{
    return this._http.get<Array<ProductType>>(this.productTypeAPI);
  }

}
