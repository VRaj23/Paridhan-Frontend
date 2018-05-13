import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserOrderedItemComponent } from './user-ordered-item.component';

describe('UserOrderedItemComponent', () => {
  let component: UserOrderedItemComponent;
  let fixture: ComponentFixture<UserOrderedItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserOrderedItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserOrderedItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
