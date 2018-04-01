import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { ProductType } from '../model/product-type.model';
import { ProductHeader } from '../model/product-header.model';
import { ProductDetail } from '../model/product-detail.model';

@Injectable()
export class DataService {
  private backendAPI: string = "http://localhost:8080";
  private productHeaderAPI: string = "/product/header";
  private productTypeAPI: string = "/product/type";
  private imageDownloadAPI: string = "/product/download/";
  private productDetailAPI: string = "/product/line/";

  constructor(private _http: HttpClient) { 
  }

  getProductType(): Observable<Array<ProductType>>{
    return this._http.get<Array<ProductType>>(this.backendAPI + this.productTypeAPI);
  }

  getProductHeader(): Observable<Array<ProductHeader>>{
    return this._http.get<Array<ProductHeader>>(this.backendAPI + this.productHeaderAPI);
  }

  getProductDetail(): Observable<Array<ProductDetail>>{
    return this._http.get<Array<ProductDetail>>(this.backendAPI + this.productDetailAPI);
  }

  getImageDownloadAPI(): string{
    return this.backendAPI + this.imageDownloadAPI;
  }

}
