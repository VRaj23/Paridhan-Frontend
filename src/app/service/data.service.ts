import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { ProductType } from '../model/product-type.model';
import { ProductHeader } from '../model/product-header.model';
import { ProductDetail } from '../model/product-detail.model';
import { JsonResponse } from '../model/json-response.model';
import { LoginRequest } from '../model/login-request.model';
import { RegisterRequest } from '../model/register-request.model';
import { OrderRequest } from '../model/order-request.model';
import { LoginDetailsService } from './intercom/login-details.service';

@Injectable()
export class DataService {
  //private backendAPI: string = "http://localhost:8080";
  //private backendAPI: string = "https://192.168.1.3:8080";
  //private backendAPI: string = "http://192.168.43.123:8080";
  private backendAPI: string = "http://192.168.56.102:8080";
  private productHeaderAPI: string = "/product/header";
  private productTypeAPI: string = "/product/type";
  private imageDownloadAPI: string = "/product/downloadImage/";
  private productDetailAPI: string = "/product/line";
  private customerLoginAPI: string = "/customer/login";
  private registerUserAPI: string = "/customer/registerUser";
  private customerInfoAPI: string = "/auth/customer/info";
  private customerAddOrderAPI: string = "/auth/customer/order/addOrder";
  private customerOrdersAPI: string = "/auth/customer/order/getAll";

  constructor(private http: HttpClient, private loginDetailService: LoginDetailsService) { 
  }

  getProductType(): Observable<JsonResponse>{
    return this.http.get<JsonResponse>(this.backendAPI + this.productTypeAPI);
  }


  getProductHeader(typeID: number): Observable<JsonResponse>{
    return this.http.get<JsonResponse>
      (this.backendAPI + this.productHeaderAPI + "?t=" + typeID.toString());
  }

  getProductDetail(headerID: string): Observable<JsonResponse>{
    return this.http.get<JsonResponse>
      (this.backendAPI + this.productDetailAPI + "?h=" + headerID);
  }

  getImageDownloadAPI(): string{
    return this.backendAPI + this.imageDownloadAPI;
  }

  private getHeaderWithToken(): {}{
    return {headers: new HttpHeaders()
      .append("Authorization", "Bearer ".concat(this.loginDetailService.getToken()) )};
  }

  getCustomerInfo(): Observable<JsonResponse>{
    return this.http.get<JsonResponse>(this.backendAPI + this.customerInfoAPI
      ,this.getHeaderWithToken() );
  }

  postLogin(request: LoginRequest): Observable<JsonResponse>{
    return this.http.post<JsonResponse>(this.backendAPI + this.customerLoginAPI,request);
  }

  postRegister(request: RegisterRequest): Observable<JsonResponse>{
    return this.http.post<JsonResponse>(this.backendAPI + this.registerUserAPI,request);
  }

  postOrders(request: OrderRequest): Observable<JsonResponse>{
    return this.http.post<JsonResponse>(this.backendAPI + this.customerAddOrderAPI
      ,request
      ,this.getHeaderWithToken());
  }

  getCustomerOrders(): Observable<JsonResponse>{
    return this.http.get<JsonResponse>(this.backendAPI + this.customerOrdersAPI
      ,this.getHeaderWithToken() );
  }
}