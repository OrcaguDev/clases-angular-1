import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive, Router } from '@angular/router';
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  constructor(private router: Router) { }

  cerrarSesion(){
    // Eliminar solo el usuario actual
    localStorage.removeItem('usuarioActual');
    
    // Eliminar el token si existe
    localStorage.removeItem('token');
    
    // Opcional: Resetear cualquier estado del usuario en el servicio de autenticación
    // this.authService.resetUserState();
    
    // Navegar a la página de login
    this.router.navigate(['/login']);
  }

}
 