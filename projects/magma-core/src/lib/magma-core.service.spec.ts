import { TestBed } from '@angular/core/testing';

import { MagmaCoreService } from './magma-core.service';

describe('MagmaCoreService', () => {
  let service: MagmaCoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MagmaCoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
