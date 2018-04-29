import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegiserUserComponent } from './regiser-user.component';

describe('RegiserUserComponent', () => {
  let component: RegiserUserComponent;
  let fixture: ComponentFixture<RegiserUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegiserUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegiserUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
