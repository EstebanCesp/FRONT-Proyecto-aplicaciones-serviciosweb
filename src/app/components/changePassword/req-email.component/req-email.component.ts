import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule} from '@angular/forms'
import { Router } from '@angular/router';
import { AuthSendemailService } from '../../../services/auth.sendemail.service';
@Component({
  selector: 'app-req-email.component',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './req-email.component.html',
  styleUrl: './req-email.component.css',
})
export class ReqEmailComponent {
  constructor(private router : Router, private authSendemailService: AuthSendemailService){}

  formulario = {
    email : ''
  }

  continuar(){
    this.authSendemailService.generateCode();
    this.authSendemailService.sendCode(this.formulario.email).then(success => {
      if(!success){
        alert('Código enviado al correo electrónico'); 
        this.router.navigate(['/login/change-p'])
      } else {
        alert('Error al enviar el código. Por favor, inténtalo de nuevo.');
      }
    });
    
  }
}
