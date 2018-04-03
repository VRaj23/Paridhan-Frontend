import { Component, OnInit, Input } from '@angular/core';
import { ProductType } from '../../../../model/product-type.model';
import { DataService } from '../../../../service/data.service';
import { Router } from '@angular/router';
import { StoreService } from '../../../../service/store.service';

@Component({
  selector: 'app-product-type-record',
  templateUrl: './product-type-record.component.html',
  styleUrls: ['./product-type-record.component.css']
})
export class ProductTypeRecordComponent implements OnInit {

  @Input() productType: ProductType;
  private imageDownloadAPI: string;

  constructor(private _dataService: DataService,private _router: Router
    ,private _store: StoreService) { 
    this.imageDownloadAPI = this._dataService.getImageDownloadAPI();
  }

  loadProductHeader(){
    this._store.setSelectedType(this.productType);
    this._router.navigate(['/product']);
  }

  ngOnInit() {
  }

}
