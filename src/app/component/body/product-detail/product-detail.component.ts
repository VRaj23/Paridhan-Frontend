import { Component, OnInit } from '@angular/core';
import { ProductDetail } from '../../../model/product-detail.model';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../../../service/data.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  private detailList$: Observable<Array<ProductDetail>>;
  private headerID: number;

  constructor(private _route: ActivatedRoute,private _dataService: DataService) { 
    this.headerID = _route.snapshot.params['header'];
  }

  ngOnInit() {
    this.detailList$ = this._dataService.getProductDetail();
  }

}
