import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductDetail } from '../../../model/product-detail.model';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../../../service/data.service';
import { Observable } from 'rxjs/Observable';
import { ProductHeader } from '../../../model/product-header.model';
import { ProductType } from '../../../model/product-type.model';
import { StoreService } from '../../../service/store.service';
import { Order } from '../../../model/order.model';
import { Subscription } from 'rxjs/Subscription';
import { NgForm } from '@angular/forms';

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

  constructor(private route: ActivatedRoute,private dataService: DataService
    ,private store: StoreService) {
      this.selectedProductHeader = store.getSelectedProductHeader(); 
      this.selectedType = store.getSelectedType();
      this.imageDownload = dataService.getImageDownloadAPI()+this.selectedProductHeader.imageID; 
  }

  private addToCart(){
    var order = new Order();
    
    order.quantity = this.formData.value.quantityGroup.quantity;

    var color = this.formData.value.colorGroup.color;
    var size = this.formData.value.sizeGroup.size; 
    
    var selectedLine: ProductDetail = this.productDetails.find(
      (line: ProductDetail) =>{
        return line.color == color && line.sizeChar == size;
      }
    );
    order.productLineID = selectedLine.lineID;

    var price = this.selectedProductHeader.price;
    var discout = this.selectedProductHeader.discount;
    order.amount = price - price*(discout/100);

    this.store.addOrder(order);
  }

  ngOnInit() {

    this.cartCountSubscription = this.store.currentCartCount
      .subscribe(count => this.itemsInCart = count);

    this.dataService.getProductDetail(this.selectedProductHeader.headerID.toString())
      .subscribe(
        (response) => {
          this.productDetails = response.message;
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
