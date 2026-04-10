import { Injectable } from '@angular/core';
import { estudios_realizadosCreate, estudios_realizadosDelete, estudios_realizadosRead } from '../models/estudios_realizados';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class EstudiosRealizadosService {
  private readonly endpoint = '/procedimientos/ejecutarsp'

  constructor(private ApiService: ApiService  ) {}

  getEstudiosRealizados() {
    const data:estudios_realizadosRead = {
      nombreSP: 'sp_leer_estudios_realizados'
    }
    return this.ApiService.post(this.endpoint, data)
  }

  crearEstudiosRealizados(data:estudios_realizadosCreate){
    data.nombreSP = 'sp_crear_estudios_realizados'
    return this.ApiService.post(this.endpoint, data)
  }

  actualizarEstudiosRealizados(data:estudios_realizadosCreate){
    data.nombreSP = 'sp_actualizar_estudios_realizados'
    return this.ApiService.post(this.endpoint, data)
  }

  eliminarEstudiosRealizados(data:estudios_realizadosDelete){
    data.nombreSP = 'sp_eliminar_estudios_realizados'
    return this.ApiService.post(this.endpoint, data)
  }

  getDocentes(){
    return this.ApiService.get('/docente')
  }
}
