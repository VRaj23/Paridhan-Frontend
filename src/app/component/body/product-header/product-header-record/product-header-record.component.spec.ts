import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductHeaderRecordComponent } from './product-header-record.component';

describe('ProductHeaderRecordComponent', () => {
  let component: ProductHeaderRecordComponent;
  let fixture: ComponentFixture<ProductHeaderRecordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductHeaderRecordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductHeaderRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
