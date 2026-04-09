import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { apoyo_profesoralCreate, apoyo_profesoralDelete, apoyo_profesoralRead } from '../models/apoyo_profesoral';

@Injectable({
  providedIn: 'root',
})
export class ApoyoProfesoralService {
  private readonly endpoint = '/procedimientos/ejecutarsp'

  constructor(private ApiService: ApiService ) {}

  getApoyoProfesoral() {
    const data: apoyo_profesoralRead = {
      nombreSP: 'sp_leer_apoyo_profesoral'
    }
    return this.ApiService.post(this.endpoint, data)
  }

  crearApoyoProfesoral(data:apoyo_profesoralCreate){
    data.nombreSP = 'sp_crear_apoyo_profesoral'
    return this.ApiService.post(this.endpoint, data)
  }

  actualizarApoyoProfesoral(data:apoyo_profesoralCreate){
    data.nombreSP = 'sp_actualizar_apoyo_profesoral'
    return this.ApiService.post(this.endpoint, data)
  }

  eliminarApoyoProfesoral(data:apoyo_profesoralDelete){
    data.nombreSP = 'sp_eliminar_apoyo_profesoral'
    return this.ApiService.post(this.endpoint, data)
  }

  getEstudios(){
    return this.ApiService.get('/estudios_realizados')
  }

}

