import { Component, OnInit, Input } from '@angular/core';
import { OrderResponse } from '../../../../model/order-response.model';
import { DataService } from '../../../../service/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-ordered-item',
  templateUrl: './user-ordered-item.component.html',
  styleUrls: ['./user-ordered-item.component.css']
})
export class UserOrderedItemComponent implements OnInit {

  @Input() orderID: number;
  @Input() imageID: number;     
  @Input() productName: string;
  @Input() status: string;
  @Input() creationDateTime: string;
  imageDownloadAPI: string;

  constructor(
    private dataService: DataService,
    private router: Router) {
    this.imageDownloadAPI = this.dataService.getImageDownloadAPI();
   }

  ngOnInit() {}

  getFormatedDateTime(dateTime: string): string{
    return dateTime;
  }

  loadUserOrderDetail(){
    this.router.navigate(['order_detail/'+this.orderID]);
  }

}
