import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthSendemailService } from '../../../services/auth.sendemail.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-change-p.component',
  imports: [FormsModule, ReactiveFormsModule,],
  templateUrl: './change-p.component.html',
  styleUrl: './change-p.component.css',
})
export class ChangePComponent {
  formulario = {
    codigo :'',
    contrasenaNueva :'',
    contrasenaConfirmacion :''
  }

  constructor(private router : Router, private authSendemailService: AuthSendemailService, private authservice: AuthService){}
  realizarCambio(){
    if(this.formulario.contrasenaNueva !== this.formulario.contrasenaConfirmacion){
      alert('Las contraseñas no coinciden. Por favor, inténtalo de nuevo.');
      return;
    }
    if(!this.authSendemailService.verifyCode(this.formulario.codigo)){
      alert('Código incorrecto. Por favor, inténtalo de nuevo.');
      return;
    }
    
    this.authservice.resetPassword(this.authSendemailService.email, this.formulario.contrasenaNueva).subscribe({
      next: () => {
        alert('Contraseña cambiada exitosamente. Por favor, inicia sesión con tu nueva contraseña.'); 
        this.router.navigate(['/login'])
        return;
      },
      error: () => {
        alert('Error al cambiar la contraseña. Por favor, inténtalo de nuevo.');
        return;
      }
    });
    this.authSendemailService.resetCode();
  }
}
