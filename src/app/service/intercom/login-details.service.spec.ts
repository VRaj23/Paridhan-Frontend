import { TestBed, inject } from '@angular/core/testing';

import { LoginDetailsService } from './login-details.service';

describe('LoginDetailsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoginDetailsService]
    });
  });

  it('should be created', inject([LoginDetailsService], (service: LoginDetailsService) => {
    expect(service).toBeTruthy();
  }));
});
