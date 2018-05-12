import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ColorSizePickerComponent } from './color-size-picker.component';

describe('ColorSizePickerComponent', () => {
  let component: ColorSizePickerComponent;
  let fixture: ComponentFixture<ColorSizePickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ColorSizePickerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ColorSizePickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
