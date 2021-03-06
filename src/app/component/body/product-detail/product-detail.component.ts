import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductDetail } from '../../../model/product-detail.model';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../../../service/data.service';
import { Observable ,  Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

import { ProductHeader } from '../../../model/product-header.model';
import { ProductType } from '../../../model/product-type.model';
import { OrderRequest } from '../../../model/order-request.model';
import { SelectedProductTypeService } from '../../../service/intercom/selected-product-type.service';
import { SelectedProductHeaderService } from '../../../service/intercom/selected-product-header.service';
import { CartDetailsService } from '../../../service/intercom/cart-details.service';
import { CartItem } from '../../../model/cart-item.model';
import { CartComponent } from '../../header/cart/cart.component';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  productDetails: ProductDetail[];
  selectedProductHeader: ProductHeader;
  selectedType: ProductType;
  imageDownload: string;
  itemsInCart: number = 0;
  quantity = 1;
  selectedProductLine: number = 0;
  disableAddToCartButton: boolean = true;
  
  @ViewChild("formData") formData: NgForm;

  constructor(private route: ActivatedRoute
    ,private dataService: DataService
    ,private selectedProductTypeService: SelectedProductTypeService
    ,private selectedProductHeaderService: SelectedProductHeaderService
    ,private cartService: CartDetailsService
    ,private router: Router
  ) {
      this.selectedProductHeader = this.selectedProductHeaderService.getSelectedProductHeader(); 
      this.selectedType = this.selectedProductTypeService.getSelectedType();
      this.imageDownload = dataService.getImageDownloadAPI()+this.selectedProductHeader.imageID; 
  }

  ngOnInit() {

    this.cartService.currentCartCount
      .subscribe(count => this.itemsInCart = count);

    this.dataService.getProductDetail(this.selectedProductHeader.headerID.toString())
      .subscribe(
        (json) => {
          this.productDetails = json.response;
        }
      );
  }

  receiveSelectedProductLine($event){
    if($event != -1){
      this.selectedProductLine = $event;
      this.disableAddToCartButton = false;
    }else{
      this.disableAddToCartButton = true;
    }
  }

  getProductDetail(): ProductDetail{
    for(var product of this.productDetails){
      if(product.lineID == this.selectedProductLine)
        return product;
    }
  }

  onQuantityIncrement(){
    this.quantity++;
  }

  onQuantityDecrement(){
    if(this.quantity>1)
      this.quantity--;
  }

  addToCart(){

    var price = this.selectedProductHeader.price;
    var discount = this.selectedProductHeader.discount;
    price = price - price*(discount/100);

    var item: CartItem = new CartItem(this.getProductDetail(),this.quantity,price);

    this.cartService.addCartItem(item);
  }

  buyNow(){
    this.addToCart();
    this.router.navigate(['cart']);
  }

}