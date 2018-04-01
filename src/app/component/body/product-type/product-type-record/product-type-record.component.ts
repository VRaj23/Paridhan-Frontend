import { Component, OnInit, Input } from '@angular/core';
import { ProductType } from '../../../../model/product-type.model';
import { DataService } from '../../../../service/data.service';

@Component({
  selector: 'app-product-type-record',
  templateUrl: './product-type-record.component.html',
  styleUrls: ['./product-type-record.component.css']
})
export class ProductTypeRecordComponent implements OnInit {

  @Input() productType: ProductType;
  private imageDownloadAPI: string;

  constructor(private _dataService: DataService) { 
    this.imageDownloadAPI = this._dataService.getImageDownloadAPI();
  }

  ngOnInit() {
  }

}
