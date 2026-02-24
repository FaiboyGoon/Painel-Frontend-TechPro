import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { demandanteGuard } from './demandante.guard';

describe('demandanteGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => demandanteGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
