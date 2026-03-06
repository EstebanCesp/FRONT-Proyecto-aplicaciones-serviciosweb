import { Injectable } from "@angular/core";
import { ApiService } from "./api.service";
import { apoyo_profesoralCreate, apoyo_profesoralUpdate } from "../models/apoyo_profesoral";

@Injectable({
    providedIn:'root'
})
export class apoyo_profesoralService {
    private readonly endpoint = '/apoyo_profesoral'

    constructor(private apiService : ApiService){}

    getApoyo_profesoral(){
        return this.apiService.get(this.endpoint)
        
    }

    postApoyo_profesoral(data: apoyo_profesoralCreate){
         return this.apiService.post(this.endpoint, data)
    }

    putApoyo_profesoral(identificador:any,data: apoyo_profesoralUpdate ){
        return this.apiService.put(this.endpoint,'estudios', identificador, data)
    }

    deleteApoyo_profesoral(identificador:number){
        return this.apiService.delete(this.endpoint,'estudios', identificador)
    }
}