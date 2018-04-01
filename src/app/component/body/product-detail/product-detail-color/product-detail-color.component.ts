import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-product-detail-color',
  templateUrl: './product-detail-color.component.html',
  styleUrls: ['./product-detail-color.component.css']
})
export class ProductDetailColorComponent implements OnInit {

  @Input() detailColorValue: string = 'FFFFFF';

  private detailColor(): any{
    return { 'background-color': '#'+this.detailColorValue};
  }

  constructor() { }

  ngOnInit() {
  }

}
