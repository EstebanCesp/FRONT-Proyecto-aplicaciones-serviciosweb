
import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { docente_Read, docente_Create, docente_Delete } from '../models/docente';

@Injectable({
  providedIn: 'root',
})
export class DocentesService {

  private readonly endpoint = '/procedimientos/ejecutarsp'

  constructor(private apiService: ApiService) {}

  getDocentes() {
    const data:docente_Read = {
      nombreSP: 'sp_leer_docentes'
    }
    return this.apiService.post(this.endpoint, data)
  }

  getLineasInvestigacion() {
    return this.apiService.get('/linea_investigacion');
  }

  crearDocente(data:any){
    data.nombreSP = 'sp_crear_docente';
    data.p_resultado = "";
    return this.apiService.post(this.endpoint, data);
  }

  actualizarDocente(data:any){
    data.nombreSP = 'sp_actualizar_docente';
    data.p_resultado = "";
    return this.apiService.post(this.endpoint, data);
  }

  eliminarDocente(data:docente_Delete){
    data.nombreSP = 'sp_eliminar_docente'
    return this.apiService.post(this.endpoint, data)
  }
}
