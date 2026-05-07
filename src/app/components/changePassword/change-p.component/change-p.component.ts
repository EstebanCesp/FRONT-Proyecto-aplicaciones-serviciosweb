import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-change-p.component',
  imports: [],
  templateUrl: './change-p.component.html',
  styleUrl: './change-p.component.css',
})
export class ChangePComponent {
  constructor(private router : Router){}
  realizarCambio(){
    this.router.navigate(['/login'])
  }
}
