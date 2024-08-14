import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { guardVerificarRutaGuard } from './guard-verificar-ruta.guard';

describe('guardVerificarRutaGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => guardVerificarRutaGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
