import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { alianzasp_create, alianzasp_delete, alianzasp_read, alianzasp_update } from '../models/alianza';

@Injectable({
  providedIn: 'root',
})
export class AlianzaService {
  private readonly endpoint = '/procedimientos/ejecutarsp'

  constructor(private apiService: ApiService) {}

  getAlianzas() {
    const data:alianzasp_read = {
      nombresp: 'sp_leer_alianzas'
    }
    return this.apiService.post(this.endpoint, data)
  }

  crearAlianza(data:alianzasp_create){
    data.nombresp = 'sp_crear_alianza'
    return this.apiService.post(this.endpoint, data)
  }

  actualizarAlianza(data:alianzasp_update){
    data.nombresp = 'sp_actualizar_alianza'
    return this.apiService.post(this.endpoint, data)
  }

  eliminarAlianza(data:alianzasp_delete){
    data.nombresp = 'sp_eliminar_alianza'
    return this.apiService.post(this.endpoint, data)
  }
}
