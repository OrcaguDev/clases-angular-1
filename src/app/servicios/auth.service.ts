import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private usuariosKey = 'usuarios';
  private isBrowser: boolean = typeof window !== 'undefined';

  constructor() {}

  registrar(usuario: { email: string, password: string }): Observable<boolean> {
    const usuarios = this.obtenerUsuarios();
    if (usuarios.find(u => u.email === usuario.email)) {
      console.log('Usuario ya existe:', usuario);
      return of(false);
    }
    console.log('Nuevo usuario a registrar:', usuario);
    usuarios.push(usuario);
    this.guardarUsuarios(usuarios);
    console.log('Usuarios actualizados:', usuarios);
    return of(true);
  }

  isLoggedIn(credenciales: { email: string, password: string }): Observable<boolean> {
    const usuarios = this.obtenerUsuarios();
    const usuarioEncontrado = usuarios.find(u => 
      u.email === credenciales.email && u.password === credenciales.password
    );
    if (usuarioEncontrado) {
      this.setLocalStorage('usuarioActual', JSON.stringify(usuarioEncontrado));
      return of(true);
    }
    return of(false);
  }

  verificarAutenticacion(): Observable<any> {
    return of(this.getLocalStorage('usuarioActual')).pipe(
      map(usuarioActual => {
        if (!usuarioActual) {
          console.log('No hay información de sesión');
          return null;
        }
        try {
          const sesionInfo = JSON.parse(usuarioActual);
          console.log('Información de sesión:', sesionInfo);
          return sesionInfo;
        } catch (error) {
          console.error('Error al analizar la información de sesión:', error);
          return null;
        }
      })
    );
  }

  private obtenerUsuarios(): Array<{ email: string, password: string }> {
    const usuarios = this.getLocalStorage(this.usuariosKey);
    return usuarios ? JSON.parse(usuarios) : [];
  }

  private guardarUsuarios(usuarios: Array<{ email: string, password: string }>) {
    this.setLocalStorage(this.usuariosKey, JSON.stringify(usuarios));
  }

  private getLocalStorage(key: string): string | null {
    if (this.isBrowser) {
      return localStorage.getItem(key);
    }
    return null;
  }

  private setLocalStorage(key: string, value: string): void {
    if (this.isBrowser) {
      localStorage.setItem(key, value);
    }
  }

  private parseJwt(token: string): any {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
  }
}