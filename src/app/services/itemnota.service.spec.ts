import { TestBed } from '@angular/core/testing';

import { ItemnotaService } from './itemnota.service';

describe('ItemnotaService', () => {
  let service: ItemnotaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ItemnotaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
