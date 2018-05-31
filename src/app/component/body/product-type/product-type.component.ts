import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
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

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.dataService.getProductType().subscribe(
      (json) => {
        this.productTypeList = json.response;
      }
    );

  }

}
