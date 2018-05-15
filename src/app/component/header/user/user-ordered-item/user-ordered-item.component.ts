import { Component, OnInit, Input } from '@angular/core';
import { OrderResponse } from '../../../../model/order-response.model';
import { DataService } from '../../../../service/data.service';

@Component({
  selector: 'app-user-ordered-item',
  templateUrl: './user-ordered-item.component.html',
  styleUrls: ['./user-ordered-item.component.css']
})
export class UserOrderedItemComponent implements OnInit {

  @Input() order: OrderResponse;
  imageDownloadAPI: string;

  constructor(private dataService: DataService) {
    this.imageDownloadAPI = this.dataService.getImageDownloadAPI();
   }

  ngOnInit() {}

  getFormatedDateTime(dateTime: string): string{
    return dateTime;
  }

}
