import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { experienciasp_create, experienciasp_delete, experienciasp_read, experienciasp_update } from '../models/experiencia';

@Injectable({
  providedIn: 'root',
})
export class ExperienciaService {
  private readonly endpoint = '/procedimientos/ejecutarsp';

  constructor(private apiService: ApiService) {}

  getExperiencias() {
    const data: experienciasp_read = { nombreSP: 'sp_leer_experiencia' };
    return this.apiService.post(this.endpoint, data);
  }

  crearExperiencia(data: experienciasp_create) {
    data.nombreSP = 'sp_crear_experiencia';
    return this.apiService.post(this.endpoint, data);
  }

  actualizarExperiencia(data: experienciasp_update) {
    data.nombreSP = 'sp_actualizar_experiencia';
    return this.apiService.post(this.endpoint, data);
  }

  eliminarExperiencia(data: experienciasp_delete) {
    data.nombreSP = 'sp_eliminar_experiencia';
    return this.apiService.post(this.endpoint, data);
  }

  getDocentes() {
    return this.apiService.get('/docente');
  }
}