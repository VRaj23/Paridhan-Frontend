import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../service/data.service';
import { Observable } from 'rxjs/Observable';
import { ProductHeader } from '../../../model/product-header.model';

@Component({
  selector: 'app-product-header',
  templateUrl: './product-header.component.html',
  styleUrls: ['./product-header.component.css']
})
export class ProductHeaderComponent implements OnInit {

  headerList$: Observable<Array<ProductHeader>>;

  constructor(private _dateService: DataService) { }

  ngOnInit() {
    this.headerList$ = this._dateService.getProductHeader();
  }

}
