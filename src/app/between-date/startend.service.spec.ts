import { TestBed } from '@angular/core/testing';

import { StartendService } from './startend.service';

describe('StartendService', () => {
  let service: StartendService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StartendService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
