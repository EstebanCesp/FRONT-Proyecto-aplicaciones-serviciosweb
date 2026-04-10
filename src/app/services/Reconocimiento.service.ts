import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { reconocimientosp_create, reconocimientosp_delete, reconocimientosp_read, reconocimientosp_update } from '../models/Reconocimiento';

@Injectable({
  providedIn: 'root',
})
export class ReconocimientoService {
  private readonly endpoint = '/procedimientos/ejecutarsp';

  constructor(private apiService: ApiService) {}

  getReconocimientos() {
    const data: reconocimientosp_read = { nombreSP: 'sp_leer_reconocimiento' };
    return this.apiService.post(this.endpoint, data);
  }

  crearReconocimiento(data: reconocimientosp_create) {
    data.nombreSP = 'sp_crear_reconocimiento';
    return this.apiService.post(this.endpoint, data);
  }

  actualizarReconocimiento(data: reconocimientosp_update) {
    data.nombreSP = 'sp_actualizar_reconocimiento';
    return this.apiService.post(this.endpoint, data);
  }

  eliminarReconocimiento(data: reconocimientosp_delete) {
    data.nombreSP = 'sp_eliminar_reconocimiento';
    return this.apiService.post(this.endpoint, data);
  }

  getDocentes() {
    return this.apiService.get('/docente');
  }
}