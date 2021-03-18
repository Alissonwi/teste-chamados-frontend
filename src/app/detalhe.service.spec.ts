import { TestBed } from '@angular/core/testing';

import { DetalheService } from './detalhe.service';

describe('DetalheService', () => {
  let service: DetalheService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DetalheService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
