import { TestBed } from '@angular/core/testing';

import { CambiohistoricoService } from './cambiohistorico.service';

describe('CambiohistoricoService', () => {
  let service: CambiohistoricoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CambiohistoricoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
