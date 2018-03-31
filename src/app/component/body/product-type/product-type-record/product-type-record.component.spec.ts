import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductTypeRecordComponent } from './product-type-record.component';

describe('ProductTypeRecordComponent', () => {
  let component: ProductTypeRecordComponent;
  let fixture: ComponentFixture<ProductTypeRecordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductTypeRecordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductTypeRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
