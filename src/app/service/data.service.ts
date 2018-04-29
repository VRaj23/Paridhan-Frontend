import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { ProductType } from '../model/product-type.model';
import { ProductHeader } from '../model/product-header.model';
import { ProductDetail } from '../model/product-detail.model';
import { JsonResponse } from '../model/json-response.model';
import { LoginRequest } from '../model/login-request.model';
import { RegisterRequest } from '../model/register-request.model';
import { StoreService } from '../service/store.service';

@Injectable()
export class DataService {
  private backendAPI: string = "https://localhost:8080";
  //private backendAPI: string = "https://192.168.1.3:8080";
  private productHeaderAPI: string = "/product/header";
  private productTypeAPI: string = "/product/type";
  private imageDownloadAPI: string = "/product/downloadImage/";
  private productDetailAPI: string = "/product/line";
  private customerLoginAPI: string = "/customer/login";
  private registerUserAPI: string = "/customer/registerUser";
  private customerNameAPI: string = "/auth/customer/name";

  constructor(private _http: HttpClient, private storeService: StoreService) { 
  }

  getProductType(): Observable<JsonResponse>{
    return this._http.get<JsonResponse>(this.backendAPI + this.productTypeAPI);
  }


  getProductHeader(typeID: number): Observable<JsonResponse>{
    return this._http.get<JsonResponse>
      (this.backendAPI + this.productHeaderAPI + "?t=" + typeID.toString());
  }

  getProductDetail(headerID: string): Observable<JsonResponse>{
    return this._http.get<JsonResponse>
      (this.backendAPI + this.productDetailAPI + "?h=" + headerID);
  }

  getImageDownloadAPI(): string{
    return this.backendAPI + this.imageDownloadAPI;
  }

  getName(): Observable<JsonResponse>{
    const tokenHeader = new HttpHeaders()
      .append("Authorization", "Bearer ".concat(this.storeService.getToken()) );

    console.log("CHECKING HEADER\n"+tokenHeader.get("Authorization"));

    return this._http.get<JsonResponse>(this.backendAPI + this.customerNameAPI
      ,{headers: tokenHeader});
  }

  postLogin(request: LoginRequest): Observable<JsonResponse>{
    return this._http.post<JsonResponse>(this.backendAPI + this.customerLoginAPI,request);
  }

  postRegister(request: RegisterRequest): Observable<JsonResponse>{
    return this._http.post<JsonResponse>(this.backendAPI + this.registerUserAPI,request);
  }

}
