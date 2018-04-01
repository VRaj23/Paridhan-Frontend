import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-product-detail-size',
  templateUrl: './product-detail-size.component.html',
  styleUrls: ['./product-detail-size.component.css']
})
export class ProductDetailSizeComponent implements OnInit {

  @Input() detailSizeValue: string;

  constructor() { }

  ngOnInit() {
  }

}
