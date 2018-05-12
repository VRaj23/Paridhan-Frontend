import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ProductDetail } from '../../../../model/product-detail.model';

@Component({
  selector: 'app-color-size-picker',
  templateUrl: './color-size-picker.component.html',
  styleUrls: ['./color-size-picker.component.css']
})
export class ColorSizePickerComponent implements OnInit {

  @Input() productDetailList: ProductDetail[] =  [];
  private colorSet: ValueStateSet[] = [];
  private sizeSet: ValueStateSet[] = [];
  private dictionay: Dictionary[] = [];

  colorButtonSelectedValue: string;
  sizeButtonSelectedValue: string;

  @Output() productLineSelectedEvent = new EventEmitter<number>();

  constructor(){ }

  ngOnInit() { }

  ngOnChanges() {
    this.init();
  }

  init(){
    if(this.productDetailList){
      this.initColorSizeSets();
      this.initDictionary(this.productDetailList);
      this.onColorButtonClick(this.colorSet[0].value);
    }
  }

  initColorSizeSets() {
    for(var product of this.productDetailList){
      this.colorSet.push(new ValueStateSet(product.color));
      this.sizeSet.push(new ValueStateSet(product.sizeChar));
    }
  }

  initDictionary(list: ProductDetail[]){
    for(var product of list){
      this.add2Dictionary(product.color, product.sizeChar, TYPE.COLOR);
      this.add2Dictionary(product.sizeChar,product.color,TYPE.SIZE);
    }
  }

  add2Dictionary(key: string, child: string, type: TYPE){
    var keySetIndex = this.getSetIndexWrapper(key, type);
    var childSetIndex = this.getSetIndexWrapper(child, type == TYPE.COLOR ? TYPE.SIZE : TYPE.COLOR);
    var dictIndex = this.getDictIndex(keySetIndex,type);

    if(dictIndex == -1){
      this.dictionay.push(new Dictionary(type ,keySetIndex,childSetIndex));
    }else{
      this.dictionay[dictIndex].child.push(childSetIndex);
    }
  }

  getDictIndex(key: number, type: TYPE):number{
    var index: number = 0;
    for(var record of this.dictionay){
      if(record.key == key && record.type == type)
        return index;
      index++;
    }
    return -1;
  }

  getSetIndexWrapper(value: string, type: TYPE): number{
    if(type == TYPE.COLOR)
      return this.getSetIndex(value, this.colorSet);
    else if(type == TYPE.SIZE)
      return this.getSetIndex(value, this.sizeSet);
    else
      return -1;
  }

  getSetIndex(value: string, set: ValueStateSet[]):number{
    var index: number = 0;
    for(var record of set){
      if(record.value == value)
        return index;
      index++;
    }
  }

  getColor(val: string){
    return "#"+val;
  }

  onColorButtonClick(value: string){
    this.colorButtonSelectedValue = value;
    this.clickHandler(value,TYPE.COLOR);    
  }

  onSizeButtonClick(value: string){
    this.sizeButtonSelectedValue = value;
    this.clickHandler(value,TYPE.SIZE);
  }

  clickHandler(value: string, type: TYPE){
    var setIndex = this.getSetIndexWrapper(value,type);
    var dictIndex = this.getDictIndex(setIndex, type);
    var state = this.getSet(type)[setIndex].state;

    if(state == STATE.DISABLED){
      this.cancelPreviousSelectedValue(type);
      this.select(dictIndex);
      this.enableAllChild(dictIndex);
    }
    else if(state == STATE.SELECTED){
      this.enableAllChild(dictIndex);
    }
    else if(state == STATE.ENABLED){
      this.select(dictIndex);
    }
    this.broadcastProductLineID();
  }

  getSet(type: TYPE){
    if(type == TYPE.COLOR)
      return this.colorSet;
    if(type == TYPE.SIZE)
    return this.sizeSet;
  }

  cancelPreviousSelectedValue(type: TYPE){
    if(type == TYPE.COLOR)
      this.sizeButtonSelectedValue = null;
    if(type == TYPE.SIZE)
      this.colorButtonSelectedValue = null;
  }

  enableAllChild(dictIndex: number){
    var dictionary: Dictionary = this.dictionay[dictIndex];
    var type: TYPE = dictionary.type;
    var children: number[] = dictionary.child;
    var set: ValueStateSet[] = this.getSet(type == TYPE.COLOR ? TYPE.SIZE : TYPE.COLOR);
    this.disableAll(set);
    for(var child of children){
      set[child].state = STATE.ENABLED;
    }    
  }

  select(dictIndex: number){
    var dictionary: Dictionary = this.dictionay[dictIndex];
    var type: TYPE = dictionary.type;
    var set: ValueStateSet[] = this.getSet(type);
    var selectedIndex = dictionary.key;

    this.disableAll(set);
    set[selectedIndex].state = STATE.SELECTED;
  }

  disableAll(set: ValueStateSet[]){
    for(var record of set){
      record.state = STATE.DISABLED;
    }
  }

  broadcastProductLineID(){
    for(var product of this.productDetailList){
      if(this.colorButtonSelectedValue == product.color 
         && this.sizeButtonSelectedValue == product.sizeChar){
            this.productLineSelectedEvent.emit(product.lineID);
            return;
        }
    }
    this.productLineSelectedEvent.emit(-1);
  }

}

class ValueStateSet{
  readonly value: string;
  state: STATE = STATE.DISABLED;

  constructor(v: string){
    this.value = v;
  }
}

class Dictionary{
  readonly type: TYPE;
  readonly key: number;
  child: number[] = [];

  constructor(t: TYPE, k:number, c:number){
    this.type = t;
    this.key = k;
    this.child.push(c);
  }
}

enum TYPE{
  COLOR = "color",
  SIZE = "size"
}

enum STATE{
  SELECTED = "selected", // selected by user
  ENABLED = "enabled",  // available for selection
  DISABLED= "disabled" // not available for selection until Reset
}