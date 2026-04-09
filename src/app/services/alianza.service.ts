import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { alianzasp_create, alianzasp_delete, alianzasp_read} from '../models/alianza';

@Injectable({
  providedIn: 'root',
})
export class AlianzaService {
  private readonly endpoint = '/procedimientos/ejecutarsp'

  constructor(private apiService: ApiService) {}

  getAlianzas() {
    const data:alianzasp_read = {
      nombreSP: 'sp_leer_alianza'
    }
    return this.apiService.post(this.endpoint, data)
  }

  crearAlianza(data:alianzasp_create){
    data.nombreSP = 'sp_crear_alianza'
    return this.apiService.post(this.endpoint, data)
  }

  actualizarAlianza(data:alianzasp_create){
    data.nombreSP = 'sp_actualizar_alianza'
    return this.apiService.post(this.endpoint, data)
  }

  eliminarAlianza(data:alianzasp_delete){
    data.nombreSP = 'sp_eliminar_alianza'
    return this.apiService.post(this.endpoint, data)
  }

  getAliados() {
    return this.apiService.get('/aliado')
  }

  getDepartamentos() {
    return this.apiService.get('/programa')
  }

  getDocentes() {
    return this.apiService.get('/docente')
  }
}
