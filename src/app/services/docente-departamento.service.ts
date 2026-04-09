import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { docente_departamentoResponse, docente_departamento_create, docente_departamento_delete, docente_departamento_read, docente_departamento_update } from '../models/docente_departamento';

@Injectable({
  providedIn: 'root',
})
export class DocenteDepartamentoService {
  private readonly endpoint = '/procedimientos/ejecutarsp'

  constructor(private apiService: ApiService) {}

  getDocenteDepartamentos() {
    const data:docente_departamento_read = {
      nombreSP: 'sp_leer_docente_departamento'
    }
    return this.apiService.post(this.endpoint, data)
  }

  crearDocenteDepartamento(data:docente_departamento_create){
    data.nombreSP = 'sp_crear_docente_departamento'
    return this.apiService.post(this.endpoint, data)
  }

  actualizarDocenteDepartamento(data:docente_departamento_update){
    data.nombreSP = 'sp_actualizar_docente_departamento'
    return this.apiService.post(this.endpoint, data)
  }

  eliminarDocenteDepartamento(data:docente_departamento_delete){
    data.nombreSP = 'sp_eliminar_docente_departamento'
    return this.apiService.post(this.endpoint, data)
  }

  getDocentes(){
    return this.apiService.get('/docente')
  }

  getDepartamentos(){
    return this.apiService.get('/programa')
  }
}