import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../service/data.service';
import { Observable } from 'rxjs/Observable';
import { ProductHeader } from '../../../model/product-header.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-header',
  templateUrl: './product-header.component.html',
  styleUrls: ['./product-header.component.css']
})
export class ProductHeaderComponent implements OnInit {

  private typeID: number;
  headerList$: Observable<Array<ProductHeader>>;

  constructor(private _route: ActivatedRoute,private _dateService: DataService) { 
    this.typeID = _route.snapshot.params['type'];
  }

  ngOnInit() {
    this.headerList$ = this._dateService.getProductHeader(this.typeID);
  }

}
