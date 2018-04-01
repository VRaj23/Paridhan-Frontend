import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, Router, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';


import { AppComponent } from './app.component';
import { DataService } from './service/data.service';
import { HeaderComponent } from './component/header/header.component';
import { CartComponent } from './component/header/cart/cart.component';
import { BodyComponent } from './component/body/body.component';
import { ProductTypeComponent } from './component/body/product-type/product-type.component';
import { ProductHeaderComponent } from './component/body/product-header/product-header.component';
import { ProductDetailComponent } from './component/body/product-detail/product-detail.component';
import { ProductTypeRecordComponent } from './component/body/product-type/product-type-record/product-type-record.component';
import { ProductHeaderRecordComponent } from './component/body/product-header/product-header-record/product-header-record.component';

const appRoutes: Routes = [
  {path: '', component: ProductTypeComponent}
  ,{path: 'product/:type', component: ProductHeaderComponent}
  ,{path: 'product/:type/:header', component: ProductDetailComponent}
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
    ProductHeaderRecordComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    DataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
