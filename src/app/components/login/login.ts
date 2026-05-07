import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IAuth } from '../../models/auth';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class LoginComponent {

  constructor(private router: Router, private authService : AuthService) {}

  formulario : IAuth = {
    tabla:'',
    campoUsuario:'',
    campoContrasena:'',
    usuario : '',
    contrasena : ''
  }

   entrar() {
    this.authService.iniciarSesion(this.formulario).subscribe({
      next: (data: any) => {
        let estado = data?.estado ?? 0;
        console.log(estado);
        if (estado === 200) {
          this.router.navigate(['/']);
        } else {
          alert('Error al iniciar sesión. Verifica tus credenciales.');
        }
      },
      error: () => {
        alert('Error de conexión al iniciar sesión.');
      }
    });
  }

  chngPassword(){
    this.router.navigate(['/login/reqEmail'])
  }

  volver(){
    this.router.navigate(['/'])
  }
}