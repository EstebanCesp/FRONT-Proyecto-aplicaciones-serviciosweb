import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule} from '@angular/forms'
import { Router } from '@angular/router';
@Component({
  selector: 'app-req-email.component',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './req-email.component.html',
  styleUrl: './req-email.component.css',
})
export class ReqEmailComponent {
  constructor(private router : Router){}

  formulario = {
    email : ''
  }

  continuar(){
    this.router.navigate(['/login/change-p'])
  }
}
