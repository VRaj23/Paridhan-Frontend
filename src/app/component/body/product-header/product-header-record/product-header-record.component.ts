import { Component, OnInit, Input } from '@angular/core';
import { ProductHeader } from '../../../../model/product-header.model';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../../../../service/data.service';
import { SelectedProductHeaderService } from '../../../../service/intercom/selected-product-header.service';

@Component({
  selector: 'app-product-header-record',
  templateUrl: './product-header-record.component.html',
  styleUrls: ['./product-header-record.component.css']
})
export class ProductHeaderRecordComponent implements OnInit {
 
  @Input() productHeader: ProductHeader;
  imageDownloadAPI: string;

  constructor(private _route: ActivatedRoute
    ,private dataService: DataService
    ,private router: Router
    ,private selectedProductHeaderService: SelectedProductHeaderService){
      this.imageDownloadAPI = this.dataService.getImageDownloadAPI();
  } 

  loadProductDetail(){
    this.selectedProductHeaderService.setSelectedProductHeader(this.productHeader);
    this.router.navigate(['/detail']);
  }

  ngOnInit() {
  }

}
