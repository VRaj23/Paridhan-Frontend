import { Component, OnInit } from '@angular/core';
import { ProductDetail } from '../../../model/product-detail.model';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../../../service/data.service';
import { Observable } from 'rxjs/Observable';
import { ProductHeader } from '../../../model/product-header.model';
import { ProductType } from '../../../model/product-type.model';
import { StoreService } from '../../../service/store.service';
import { Subscription } from 'rxjs/Subscription';

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
  private detailSubscription: Subscription;
  private itemsInCart: number = 0;

  constructor(private _route: ActivatedRoute,private _dataService: DataService
    ,private _store: StoreService) {
      this.selectedProductHeader = _store.getSelectedProductHeader(); 
      this.selectedType = _store.getSelectedType();
      this.imageDownload = _dataService.getImageDownloadAPI()+this.selectedProductHeader.imageID;
      this._store.currentCarCount.subscribe(count => this.itemsInCart = count);
  
  }

  private addToCart(){
    this._store.add2Cart(++this.itemsInCart);
  }

  ngOnInit() {
    this.detailSubscription = this._dataService.getProductDetail
      (this.selectedProductHeader.headerID.toString()).subscribe(
        (details) => this.productDetails = details
      );
  }

  ngOnDestory(){
    this.detailSubscription.unsubscribe();
  }

}
