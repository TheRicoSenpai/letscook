import { TestBed } from '@angular/core/testing';

import { CooksService } from './cooks.service';

describe('CooksService', () => {
  let service: CooksService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CooksService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
