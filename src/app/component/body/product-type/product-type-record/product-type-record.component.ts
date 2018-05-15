import { Component, OnInit, Input } from '@angular/core';
import { ProductType } from '../../../../model/product-type.model';
import { DataService } from '../../../../service/data.service';
import { Router } from '@angular/router';
import { SelectedProductTypeService } from '../../../../service/intercom/selected-product-type.service';

@Component({
  selector: 'app-product-type-record',
  templateUrl: './product-type-record.component.html',
  styleUrls: ['./product-type-record.component.css']
})
export class ProductTypeRecordComponent implements OnInit {

  @Input() productType: ProductType;
  imageDownloadAPI: string;

  constructor(private _dataService: DataService
    ,private router: Router
    ,private selectedProductTypeService: SelectedProductTypeService) { 
    this.imageDownloadAPI = this._dataService.getImageDownloadAPI();
  }

  loadProductHeader(){
    this.selectedProductTypeService.setSelectedType(this.productType);
    this.router.navigate(['/product']);
  }

  ngOnInit() {
  }

}
