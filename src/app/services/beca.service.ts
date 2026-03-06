import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { BecaCreate, BecaUpdate } from '../models/Beca';

@Injectable({
  providedIn: 'root'
})
export class BecaService {

  private readonly endpoint = '/becas' 

  constructor(private apiService: ApiService) {}

  getBecas() {
    return this.apiService.get(this.endpoint)
  }

  postBeca(data: BecaCreate) {
    return this.apiService.post(this.endpoint, data)
  }

  putBeca(data: BecaUpdate, identificador: number) {
  return this.apiService.put(this.endpoint, 'estudios', String(identificador), data)
}

deleteBeca(identificador: number) {
  return this.apiService.delete(this.endpoint, 'estudios', String(identificador))
}
}
