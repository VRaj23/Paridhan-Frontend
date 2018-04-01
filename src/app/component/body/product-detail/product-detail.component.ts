import { Component, OnInit } from '@angular/core';
import { ProductDetail } from '../../../model/product-detail.model';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../../../service/data.service';
import { Observable } from 'rxjs/Observable';
import { ProductHeader } from '../../../model/product-header.model';
import { StoreService } from '../../../service/store.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  private detailList$: Observable<Array<ProductDetail>>;
  private selectedProductHeader: ProductHeader;
  private imageDownload: string;

  constructor(private _route: ActivatedRoute,private _dataService: DataService
    ,private _store: StoreService) {
      this.selectedProductHeader = _store.getSelectedProductHeader(); 
      this.imageDownload = _dataService.getImageDownloadAPI()+this.selectedProductHeader.imageID;
  }

  ngOnInit() {
    this.detailList$ = this._dataService.getProductDetail
      (this.selectedProductHeader.headerID.toString());
  }

}
