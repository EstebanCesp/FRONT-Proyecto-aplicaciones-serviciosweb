import { Injectable } from "@angular/core";
import { ApiService } from "./api.service";
import { aliadoCreate, aliadoUpdate } from "../models/aliado";

@Injectable({
    providedIn:'root'
})
export class aliadoService {
    private readonly endpoint = '/aliados'

    constructor(private apiService : ApiService){}

    getAliados(){
        return this.apiService.get(this.endpoint)
    }

    postAliado(data:aliadoCreate){
        return this.apiService.post(this.endpoint, data)
    }

    putAliado(data:aliadoUpdate, identificador: string){
        return this.apiService.put(this.endpoint, 'nit', identificador, data)
    }

    deleteAliado(identificador:string){
        return this.apiService.delete(this.endpoint, 'nit', identificador)
    }
}