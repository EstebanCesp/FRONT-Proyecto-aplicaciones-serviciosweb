import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { evaluacion_docente_create, evaluacion_docente_delete, evaluacion_docente_read, evaluacion_docente_update } from '../models/evaluacion_docente';

@Injectable({
  providedIn: 'root',
})
export class EvaluacionDocenteService {
  private readonly endpoint = '/procedimientos/ejecutarsp'

  constructor(private apiService: ApiService) {}

  getEvaluacionDocentes() {
    const data:evaluacion_docente_read = {
      nombreSP: 'sp_leer_evaluacion_docente'
    }
    return this.apiService.post(this.endpoint, data)
  }

  crearEvaluacionDocente(data:evaluacion_docente_create){
    data.nombreSP = 'sp_crear_evaluacion_docente'
    return this.apiService.post(this.endpoint, data)
  }

  actualizarEvaluacionDocente(data:evaluacion_docente_update){
    data.nombreSP = 'sp_actualizar_evaluacion_docente'
    return this.apiService.post(this.endpoint, data)
  }

  eliminarEvaluacionDocente(data:evaluacion_docente_delete){
    data.nombreSP = 'sp_eliminar_evaluacion_docente'
    return this.apiService.post(this.endpoint, data)
  }

  getDocentes() {
    return this.apiService.get('/docente')
  }
}
