import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ProductType } from '../../../model/product-type.model';
import { DataService } from '../../../service/data.service';

@Component({
  selector: 'app-product-type',
  templateUrl: './product-type.component.html',
  styleUrls: ['./product-type.component.css']
})
export class ProductTypeComponent implements OnInit {

  typeList$: Observable<Array<ProductType>>;

  constructor(private _dataService: DataService) { }

  ngOnInit() {
    this.typeList$ = this._dataService.getProductType();
  }

}
