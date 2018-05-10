import { TestBed, inject } from '@angular/core/testing';

import { SelectedProductTypeService } from './selected-product-type.service';

describe('SelectedProductTypeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SelectedProductTypeService]
    });
  });

  it('should be created', inject([SelectedProductTypeService], (service: SelectedProductTypeService) => {
    expect(service).toBeTruthy();
  }));
});
