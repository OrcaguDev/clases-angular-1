import { Component } from '@angular/core';
import { AuthService } from '../servicios/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
    email:string= '';
    password:string= '';
  constructor(private authService: AuthService, private router: Router) { }

  onSubmit() {
    const email = (document.getElementById('email') as HTMLInputElement).value;
    const password = (document.getElementById('password') as HTMLInputElement).value;

    if (!email || !password) {
      console.log('Por favor, ingrese un email y contraseña válidos');
      return;
    }

    this.authService.isLoggedIn({ email, password })
      .subscribe(loggedIn => {
        if (loggedIn) {
          console.log('Inicio de sesión exitoso');
          // Redirigir a la página de inicio
          this.router.navigate(['/inicio']);
        } else {
          console.log('Credenciales incorrectas');
          alert('Credenciales incorrectas');
        }
      });
  }

  onRegister() {
    const email = (document.getElementById('email') as HTMLInputElement).value;
    const password = (document.getElementById('password') as HTMLInputElement).value;
  
    if (!email || !password) {
      console.log('Por favor, ingrese un email y contraseña válidos');
      return;
    }
  
    this.authService.registrar({ email, password })
      .subscribe(registrado => {
        if (registrado) {
          console.log('Usuario registrado con éxito');
          // Aquí puedes agregar la lógica para redirigir al usuario o iniciar sesión automáticamente
        } else {
          console.log('El usuario ya existe o hubo un error en el registro');
        }
      });
  }
}
