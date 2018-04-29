import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-product-detail-color',
  templateUrl: './product-detail-color.component.html',
  styleUrls: ['./product-detail-color.component.css']
})
export class ProductDetailColorComponent implements OnInit {

  @Input() detailValue: string = "";
  @Input() detailType: string;

  @Output() eventEmitter: EventEmitter<{"value":string,"type":string}>  = new EventEmitter();
  
  private setClass(): any{
    return "colorButton";
  }

  private setStyle(element): any{
    //console.log("setStyle: "+this.detailType+" "+this.detailValue);
    if (this.detailType === "COLOR")
      return { 'background': '#'+this.detailValue };
    else
      return { 'value' : this.detailValue };
  }

  private onClick(){
    //console.log("onClick: "+this.detailType+" "+this.detailValue);
    this.eventEmitter.emit({"value": this.detailValue,"type": this.detailType});
  }

  constructor() { 
    //console.log("constructor: "+this.detailType+" "+this.detailValue);
  }

  ngOnInit() {
    //console.log("ngOnInit: "+this.detailType+" "+this.detailValue);
  }

}
