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
import { OrderResponse } from '../model/order-response.model';
import { Customer } from '../model/customer.model';
import { City } from '../model/city.model';

@Injectable()
export class DataService {
  backendAPI: string = "https://www.vraj23.com";
  //backendAPI: string = "https://localhost:8443";
  //backendAPI: string = "http://localhost:8080";
  productHeaderAPI: string = "/product/header";
  productTypeAPI: string = "/product/type";
  imageDownloadAPI: string = "/product/downloadImage/";
  productDetailAPI: string = "/product/line";
  customerLoginAPI: string = "/customer/login";
  registerUserAPI: string = "/customer/registerUser";
  customerInfoAPI: string = "/auth/customer/info";
  customerAddOrderAPI: string = "/auth/customer/order/addOrder";
  customerOrdersAPI: string = "/auth/customer/order/getAll";
  getCitiesAPI: string ="/address/cities";

  constructor(private http: HttpClient, private loginDetailService: LoginDetailsService) {  }

//UTIL

  getImageDownloadAPI(): string{
    return this.backendAPI + this.imageDownloadAPI;
  }

  private getHeaderWithToken(): {}{
    return {headers: new HttpHeaders()
      .append("Authorization", "Bearer ".concat(this.loginDetailService.getToken()) )};
  }

//GET

  getProductType(): Observable<JsonResponse<ProductType[]>>{
    return this.http.get<JsonResponse<ProductType[]>>(this.backendAPI + this.productTypeAPI);
  }

  getProductHeader(typeID: number): Observable<JsonResponse<ProductHeader[]>>{
    return this.http.get<JsonResponse<ProductHeader[]>>
      (this.backendAPI + this.productHeaderAPI + "?t=" + typeID.toString());
  }

  getProductDetail(headerID: string): Observable<JsonResponse<ProductDetail[]>>{
    return this.http.get<JsonResponse<ProductDetail[]>>
      (this.backendAPI + this.productDetailAPI + "?h=" + headerID);
  }

  getCities(): Observable<JsonResponse<City[]>>{
    return this.http.get<JsonResponse<City[]>>(this.backendAPI + this.getCitiesAPI);
  }

  getCustomerInfo(): Observable<JsonResponse<Customer>>{
    return this.http.get<JsonResponse<Customer>>(this.backendAPI + this.customerInfoAPI
      ,this.getHeaderWithToken() );
  }

  getCustomerOrders(): Observable<JsonResponse<OrderResponse[]>>{
    return this.http.get<JsonResponse<OrderResponse[]>>(this.backendAPI + this.customerOrdersAPI
      ,this.getHeaderWithToken() );
  }

//POST

  postLogin(request: LoginRequest): Observable<JsonResponse<string>>{
    return this.http.post<JsonResponse<string>>(this.backendAPI + this.customerLoginAPI,request);
  }

  postRegister(request: RegisterRequest): Observable<JsonResponse<null>>{
    return this.http.post<JsonResponse<null>>(this.backendAPI + this.registerUserAPI,request);
  }

  postOrders(request: OrderRequest): Observable<JsonResponse<null>>{
    return this.http.post<JsonResponse<null>>(this.backendAPI + this.customerAddOrderAPI
      ,request
      ,this.getHeaderWithToken());
  }

}
