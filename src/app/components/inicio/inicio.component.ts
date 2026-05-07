import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-inicio',
  imports: [CommonModule],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponent implements OnInit {

  constructor (private router: Router, private authservice : AuthService){}
  
  islogged:boolean = false

  ngOnInit(): void {
    this.islogged = this.authservice.isAuthenticated()
  }
  
  cerrarSesion() {
    this.authservice.cerrarSesion()
    this.router.navigate(['/login'])
  }
  iniciarSesion(){
    this.router.navigate(['/login'])
  }
}
