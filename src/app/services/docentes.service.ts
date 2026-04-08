
import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { docente_Read, docente_Update, docente_Create, docente_Delete } from '../models/docente';

@Injectable({
  providedIn: 'root',
})
export class DocentesService {

  private readonly endpoint = '/procedimientos/ejecutarsp'

  constructor(private apiService: ApiService) {}

  getDocentes() {
    const data:docente_Read = {
      nombresp: 'sp_leer_docentes'
    }
    return this.apiService.post(this.endpoint, data)
  }

  crearDocente(data:docente_Create){
    data.nombresp = 'sp_crear_docente'
    return this.apiService.post(this.endpoint, data)
  }

  actualizarDocente(data:docente_Update){
    data.nombresp = 'sp_actualizar_docente'
    return this.apiService.post(this.endpoint, data)
  }

  eliminarDocente(data:docente_Delete){
    data.nombresp = 'sp_eliminar_docente'
    return this.apiService.post(this.endpoint, data)
  }
}
