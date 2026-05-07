import {  Injectable, signal } from '@angular/core';
import { ApiService } from './api.service';
import { IAuth } from '../models/auth';
import { tap, map, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private apiService: ApiService,) { }
  listaAcesso: string[] =[]

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }

  haveAccess(route: string): Observable<boolean> {
    if (!this.isAuthenticated()) {
      return of(false);
    }

    if (this.listaAcesso && this.listaAcesso.length > 0) {
      return of(this.listaAcesso.includes(route));
    }

    return this.apiService.post('/procedimientos/ejecutarsp', { 'email': localStorage.getItem('usuario'), 'nombreSP': 'obtener_acceso' }).pipe(
      map((data: any) => {
        const soloRutas = data.resultados.map((item: any) => item.ruta);
        this.listaAcesso = soloRutas;
        return this.listaAcesso.includes(route);
      })
    );
  }

  iniciarSesion(credenciales: IAuth) {
    credenciales.tabla = 'usuario';
    credenciales.campoUsuario = 'email';
    credenciales.campoContrasena = 'contrasena';
    return this.apiService.post('/Autenticacion/token', credenciales).pipe(
      tap((data: any) => {
        if (data && data.estado == 200) {
          localStorage.setItem('token', data.token);
          localStorage.setItem('usuario', data.usuario);
          this.listaAcesso = [];
        }
      })
    );
  }

  cerrarSesion() {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    this.listaAcesso = [];
  }

   getToken() {
    return localStorage.getItem('token');
  }

}
