import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../servicios/auth.service';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import Swal from 'sweetalert2';

export const guardVerificarRutaGuard: CanActivateFn = (route, state): Observable<boolean> => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.verificarAutenticacion().pipe(
    switchMap(estaAutenticado => {
      if (!estaAutenticado) {
        return Swal.fire({
          title: 'Acceso denegado',
          text: 'Debes iniciar sesión para acceder a esta página',
          icon: 'warning',
          confirmButtonText: 'Entendido'
        }).then(() => {
          router.navigate(['/login']);
          return false;
        });
      }
      return of(true);
    })
  );
};