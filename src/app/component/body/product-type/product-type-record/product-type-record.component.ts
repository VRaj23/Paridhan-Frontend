import { Component, OnInit, Input } from '@angular/core';
import { ProductType } from '../../../../model/product-type.model';

@Component({
  selector: 'app-product-type-record',
  templateUrl: './product-type-record.component.html',
  styleUrls: ['./product-type-record.component.css']
})
export class ProductTypeRecordComponent implements OnInit {

  @Input() productType: ProductType;
  private imageDownloadAPI: string = "http://localhost:8080/product/download/";
  constructor() { }

  ngOnInit() {
  }

}
