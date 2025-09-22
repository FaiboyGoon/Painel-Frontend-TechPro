import { TestBed } from '@angular/core/testing';

import { ExtratofinanceiroService } from './extratofinanceiro.service';

describe('ExtratofinanceiroService', () => {
  let service: ExtratofinanceiroService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExtratofinanceiroService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
