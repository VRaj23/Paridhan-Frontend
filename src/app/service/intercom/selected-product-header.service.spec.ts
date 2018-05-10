import { TestBed, inject } from '@angular/core/testing';

import { SelectedProductHeaderService } from './selected-product-header.service';

describe('SelectedProductHeaderService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SelectedProductHeaderService]
    });
  });

  it('should be created', inject([SelectedProductHeaderService], (service: SelectedProductHeaderService) => {
    expect(service).toBeTruthy();
  }));
});
