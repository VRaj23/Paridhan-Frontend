import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, Router, RouterModule } from '@angular/router';
import { HttpClientModule, HttpHeaders } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ServiceWorkerModule } from '@angular/service-worker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ApolloModule, Apollo } from 'apollo-angular';
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http';
import { setContext } from 'apollo-link-context';
import { InMemoryCache} from 'apollo-cache-inmemory';

import { DataService } from './service/data.service';
import { LoginDetailsService } from './service/intercom/login-details.service';
import { CartDetailsService } from './service/intercom/cart-details.service';
import { SelectedProductHeaderService } from './service/intercom/selected-product-header.service';
import { SelectedProductTypeService } from './service/intercom/selected-product-type.service';

import { AppComponent } from './app.component';
import { HeaderComponent } from './component/header/header.component';
import { CartComponent } from './component/header/cart/cart.component';
import { BodyComponent } from './component/body/body.component';
import { ProductTypeComponent } from './component/body/product-type/product-type.component';
import { ProductHeaderComponent } from './component/body/product-header/product-header.component';
import { ProductDetailComponent } from './component/body/product-detail/product-detail.component';
import { ProductTypeRecordComponent } from './component/body/product-type/product-type-record/product-type-record.component';
import { ProductHeaderRecordComponent } from './component/body/product-header/product-header-record/product-header-record.component';
import { CartDetailComponent } from './component/body/cart-detail/cart-detail.component';
import { SearchComponent } from './component/header/search/search.component';
import { LoginComponent } from './component/body/login/login.component';
import { OrderComponent } from './component/body/order/order.component';
import { RegiserUserComponent } from './component/body/regiser-user/regiser-user.component';
import { UserComponent } from './component/header/user/user.component';
import { ColorSizePickerComponent } from './component/body/product-detail/color-size-picker/color-size-picker.component';
import { UserOrderedItemComponent } from './component/header/user/user-ordered-item/user-ordered-item.component';
import { environment } from '../environments/environment.prod';
import { ConfirmationDialogComponent } from './component/modal/confirmation-dialog/confirmation-dialog.component';
import { UserOrderDetailComponent } from './component/header/user/user-order-detail/user-order-detail.component';
import { CartItem } from './model/cart-item.model';


const appRoutes: Routes = [
  {path: '', component: ProductTypeComponent}
  ,{path: 'product', component: ProductHeaderComponent}
  ,{path: 'detail', component: ProductDetailComponent}
  ,{path: 'cart', component: CartDetailComponent}
  ,{path: 'order', component: OrderComponent}
  ,{path: 'login/:backPath', component: LoginComponent}
  ,{path: 'login', component: LoginComponent}
  ,{path: 'register', component: RegiserUserComponent}
  ,{path: 'user', component: UserComponent}
  ,{path: 'order_detail/:id', component: UserOrderDetailComponent}
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
    CartDetailComponent,
    SearchComponent,
    LoginComponent,
    OrderComponent,
    RegiserUserComponent,
    UserComponent,
    ColorSizePickerComponent,
    UserOrderedItemComponent,
    ConfirmationDialogComponent,
    UserOrderDetailComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ApolloModule,
    HttpLinkModule,
    RouterModule.forRoot(appRoutes,{initialNavigation: false})
    ,environment.production ? ServiceWorkerModule.register('/ngsw-worker.js') : []
  ],
  providers: [
    DataService,
    LoginDetailsService,
    CartDetailsService,
    SelectedProductHeaderService,
    SelectedProductTypeService
  ],
  bootstrap: [AppComponent]
})

export class AppModule { 
  constructor(apollo: Apollo, 
    httpLink: HttpLink,
    loginService: LoginDetailsService,
    cartService: CartDetailsService) {
    //TODO DRY
    const http = httpLink.create({uri: 'https://www.vraj23.com/auth/order/graphql'});

    const auth = setContext((_, { headers }) => {
      const token = loginService.getToken();
      if (!token) {
        return {};
      } else {
        return {
          headers: new HttpHeaders().append('Authorization', `Bearer ${token}`)
        };
      }
    });
    
    apollo.create({
      link: auth.concat(http),
      cache: new InMemoryCache(),
    });

    //restores user login after page refresh
    var token = sessionStorage.getItem('token');
    if(token != null)
      loginService.onLogin(token);

    //restore items in cart
    var cartItems: CartItem[] = JSON.parse(sessionStorage.getItem('cart'));
    if (cartItems != null)
      cartService.restoreCartData(cartItems);
  }
}
