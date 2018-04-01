import { Component, OnInit, Input } from '@angular/core';
import { ProductHeader } from '../../../../model/product-header.model';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../../../../service/data.service';

@Component({
  selector: 'app-product-header-record',
  templateUrl: './product-header-record.component.html',
  styleUrls: ['./product-header-record.component.css']
})
export class ProductHeaderRecordComponent implements OnInit {
 
  @Input() productHeader: ProductHeader;
  private typeID: number;
  private imageDownloadAPI: string;

  constructor(private _route: ActivatedRoute, private _dataService: DataService) {
    this.typeID = _route.snapshot.params['type'];
    this.imageDownloadAPI = this._dataService.getImageDownloadAPI();
  }

  ngOnInit() {
  }

}
