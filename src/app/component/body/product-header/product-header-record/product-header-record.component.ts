import { Component, OnInit, Input } from '@angular/core';
import { ProductHeader } from '../../../../model/product-header.model';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../../../../service/data.service';
import { StoreService } from '../../../../service/store.service';

@Component({
  selector: 'app-product-header-record',
  templateUrl: './product-header-record.component.html',
  styleUrls: ['./product-header-record.component.css']
})
export class ProductHeaderRecordComponent implements OnInit {
 
  @Input() productHeader: ProductHeader;
  private imageDownloadAPI: string;

  constructor(private _route: ActivatedRoute, private _dataService: DataService
    ,private _router: Router, private _store: StoreService){
      this.imageDownloadAPI = this._dataService.getImageDownloadAPI();
  } 

  loadProductDetail(){
    this._store.setSelectedProductHeader(this.productHeader);
    this._router.navigate(['/detail']);
  }

  ngOnInit() {
  }

}
