import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, Router, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import { DataService } from './service/data.service';
import { StoreService } from './service/store.service';
import { HeaderComponent } from './component/header/header.component';
import { CartComponent } from './component/header/cart/cart.component';
import { BodyComponent } from './component/body/body.component';
import { ProductTypeComponent } from './component/body/product-type/product-type.component';
import { ProductHeaderComponent } from './component/body/product-header/product-header.component';
import { ProductDetailComponent } from './component/body/product-detail/product-detail.component';
import { ProductTypeRecordComponent } from './component/body/product-type/product-type-record/product-type-record.component';
import { ProductHeaderRecordComponent } from './component/body/product-header/product-header-record/product-header-record.component';
import { ProductDetailColorComponent } from './component/body/product-detail/product-detail-color/product-detail-color.component';
import { ProductDetailSizeComponent } from './component/body/product-detail/product-detail-size/product-detail-size.component';
import { CartDetailComponent } from './component/body/cart-detail/cart-detail.component';
import { SearchComponent } from './component/header/search/search.component';
import { CartItemComponent } from './component/body/cart-detail/cart-item/cart-item.component';
import { LoginComponent } from './component/body/login/login.component';
import { OrderComponent } from './component/body/order/order.component';
import { RegiserUserComponent } from './component/body/regiser-user/regiser-user.component';
import { UserComponent } from './component/header/user/user.component';

const appRoutes: Routes = [
  {path: '', component: ProductTypeComponent}
  ,{path: 'product', component: ProductHeaderComponent}
  ,{path: 'detail', component: ProductDetailComponent}
  ,{path: 'cart', component: CartDetailComponent}
  ,{path: 'order', component: OrderComponent}
  ,{path: 'login/:backPath', component: LoginComponent}
  ,{path: 'register', component: RegiserUserComponent}
  ,{path: 'user', component: UserComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CartComponent,
    BodyComponent,
    ProductTypeComponent,
    ProductHeaderComponent,
    ProductDetailComponent,
    ProductTypeRecordComponent,
    ProductHeaderRecordComponent,
    ProductDetailColorComponent,
    ProductDetailSizeComponent,
    CartDetailComponent,
    SearchComponent,
    CartItemComponent,
    LoginComponent,
    OrderComponent,
    RegiserUserComponent,
    UserComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(appRoutes,{initialNavigation: false})
  ],
  providers: [
    DataService,
    StoreService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
