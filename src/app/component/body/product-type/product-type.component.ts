import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ProductType } from '../../../model/product-type.model';
import { DataService } from '../../../service/data.service';
import { JsonResponse } from '../../../model/json-response.model';

@Component({
  selector: 'app-product-type',
  templateUrl: './product-type.component.html',
  styleUrls: ['./product-type.component.css']
})
export class ProductTypeComponent implements OnInit {

  typeList$: Observable<Array<ProductType>>;
  productTypeList: Array<any>;

  constructor(private _dataService: DataService) { }

  ngOnInit() {
    this._dataService.getProductType().subscribe(
      (jsonResponse) => {
        this.productTypeList = jsonResponse.message;
      }
    );

  }

}
