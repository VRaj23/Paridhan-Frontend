import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../service/data.service';
import { Observable } from 'rxjs';
import { ProductHeader } from '../../../model/product-header.model';
import { ActivatedRoute } from '@angular/router';
import { ProductType } from '../../../model/product-type.model';
import { SelectedProductTypeService } from '../../../service/intercom/selected-product-type.service';

@Component({
  selector: 'app-product-header',
  templateUrl: './product-header.component.html',
  styleUrls: ['./product-header.component.css']
})
export class ProductHeaderComponent implements OnInit {

  selectedType: ProductType;
  headerList: Array<ProductHeader>;

  constructor(private _route: ActivatedRoute
    ,private dateService: DataService
    ,private selectedProductTypeService: SelectedProductTypeService) { 
    this.selectedType = this.selectedProductTypeService.getSelectedType();
  }

  ngOnInit() {
    this.dateService.getProductHeader(this.selectedType.typeID)
      .subscribe(
        (res) => {
          this.headerList = res.response
        }
      );
  }
  
  ngOnDestory(){
    
  }

}
