import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../servicios/auth.service';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

export const guardVerificarRutaGuard: CanActivateFn = (route, state): Observable<boolean> => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.verificarAutenticacion().pipe(
    switchMap(estaAutenticado => {
      if (!estaAutenticado) {
        console.log("Debes iniciar sesión.");
        router.navigate(['/login']);
        return of(false);
      }
      return of(true);
    })
  );
};