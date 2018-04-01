import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductDetailColorComponent } from './product-detail-color.component';

describe('ProductDetailColorComponent', () => {
  let component: ProductDetailColorComponent;
  let fixture: ComponentFixture<ProductDetailColorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductDetailColorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductDetailColorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
