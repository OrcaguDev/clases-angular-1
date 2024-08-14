import { TestBed } from '@angular/core/testing';

import { JuegoServService } from './juego-serv.service';

describe('JuegoServService', () => {
  let service: JuegoServService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JuegoServService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
