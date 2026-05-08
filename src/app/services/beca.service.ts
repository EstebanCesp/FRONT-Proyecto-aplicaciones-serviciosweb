import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { becasp_create, becasp_delete, becasp_read } from '../models/Beca';

@Injectable({
  providedIn: 'root',
})
export class BecaService {
  private readonly endpoint = '/procedimientos/ejecutarsp';

  constructor(private apiService: ApiService) {}

  getEstudiosRealizados() {
    const data: becasp_read = { nombreSP: 'sp_leer_estudios_realizados' };
    return this.apiService.post(this.endpoint, data);
  }

  getBecas() {
    const data: becasp_read = { nombreSP: 'sp_leer_beca' };
    return this.apiService.post(this.endpoint, data);
  }

  crearBeca(data: any) {
    data.nombreSP = 'sp_crear_beca';
    if (!data.fecha_fin) data.fecha_fin = null;
    return this.apiService.post(this.endpoint, data);
  }

  actualizarBeca(data: any) {
    data.nombreSP = 'sp_actualizar_beca';
    if (!data.fecha_fin) data.fecha_fin = null;
    return this.apiService.post(this.endpoint, data);
  }

  eliminarBeca(data: becasp_delete) {
    data.nombreSP = 'sp_eliminar_beca';
    return this.apiService.post(this.endpoint, data);
  }
}
