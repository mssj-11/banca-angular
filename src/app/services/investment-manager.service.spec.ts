import { TestBed } from '@angular/core/testing';

import { InvestmentManagerService } from './investment-manager.service';

describe('InvestmentManagerService', () => {
  let service: InvestmentManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InvestmentManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
