import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { estudio_acCreate, estudio_acDelete } from '../models/estudio_ac';

@Injectable({
  providedIn: 'root',
})
export class EstudioAcService {
  private readonly endpoint = '/procedimientos/ejecutarsp'
  constructor(private ApiService: ApiService) {}
  
  getEstudiosAc() {
    const data = {
      nombreSP: 'sp_leer_estudio_ac'
    }
    return this.ApiService.post(this.endpoint, data)
  }

  crearEstudioAc(data: estudio_acCreate){
    data.nombreSP = 'sp_crear_estudio_ac'
    return this.ApiService.post(this.endpoint, data)
  }

  actualizarEstudioAc(data: estudio_acCreate){
    data.nombreSP = 'sp_actualizar_estudio_ac'
    return this.ApiService.post(this.endpoint, data)
  }

  eliminarEstudioAc(data: estudio_acDelete){
    data.nombreSP = 'sp_eliminar_estudio_ac'
    return this.ApiService.post(this.endpoint, data)
  }

  getEstudios(){
    return this.ApiService.get('/estudios_realizados')
  }

  getAreasConocimiento(){
    return this.ApiService.get('/area_conocimiento')
  }
  
}
