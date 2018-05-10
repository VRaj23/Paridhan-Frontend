import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductDetail } from '../../../model/product-detail.model';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../../../service/data.service';
import { Observable } from 'rxjs/Observable';
import { ProductHeader } from '../../../model/product-header.model';
import { ProductType } from '../../../model/product-type.model';
import { Subscription } from 'rxjs/Subscription';
import { NgForm } from '@angular/forms';
import { OrderRequest } from '../../../model/order-request.model';
import { SelectedProductTypeService } from '../../../service/intercom/selected-product-type.service';
import { SelectedProductHeaderService } from '../../../service/intercom/selected-product-header.service';
import { CartDetailsService } from '../../../service/intercom/cart-details.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  private productDetails: ProductDetail[];
  private selectedProductHeader: ProductHeader;
  private selectedType: ProductType;
  private imageDownload: string;
  private cartCountSubscription: Subscription;
  private itemsInCart: number = 0;
  private defaultColor: string;
  private defaultSize: string;
  
  @ViewChild("formData") formData: NgForm;

  constructor(private route: ActivatedRoute
    ,private dataService: DataService
    ,private selectedProductTypeService: SelectedProductTypeService
    ,private selectedProductHeaderService: SelectedProductHeaderService
    ,private cartService: CartDetailsService
  ) {
      this.selectedProductHeader = this.selectedProductHeaderService.getSelectedProductHeader(); 
      this.selectedType = this.selectedProductTypeService.getSelectedType();
      this.imageDownload = dataService.getImageDownloadAPI()+this.selectedProductHeader.imageID; 
  }

  private addToCart(){
    
    var color = this.formData.value.colorGroup.color;
    var size = this.formData.value.sizeGroup.size; 
    
    var selectedLine: ProductDetail = this.productDetails.find(
      (line: ProductDetail) =>{
        return line.color == color && line.sizeChar == size;
      }
    );

    var price = this.selectedProductHeader.price;
    var discout = this.selectedProductHeader.discount;

    var order: OrderRequest = {
      amount: price - price*(discout/100)
      ,deliveryAddressID: 124//TODO change
      ,productLineID: selectedLine.lineID
      ,quantity: this.formData.value.quantityGroup.quantity
    }

    this.cartService.addOrder(order);
  }

  ngOnInit() {

    this.cartCountSubscription = this.cartService.currentCartCount
      .subscribe(count => this.itemsInCart = count);

    this.dataService.getProductDetail(this.selectedProductHeader.headerID.toString())
      .subscribe(
        (res) => {
          this.productDetails = res.response;
          this.defaultColor = this.productDetails[0].color;
          this.defaultSize = this.productDetails[0].sizeChar;
        }
      );
  }

  ngOnDestory(){
    this.cartCountSubscription.unsubscribe();
  }

  onChildClick(obj){
    //console.log("value: "+obj.value+" Type: "+obj.type);
  }

}
