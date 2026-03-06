import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { enviroment } from "../enviroments/enviroment";

@Injectable({
    providedIn : 'root'
})
export class ApiService{
    private readonly baseUrl= enviroment.apiUrl;
    
    constructor(private http: HttpClient){}

    get(endpoint : string){
        return this.http.get(this.baseUrl+endpoint)
    }

    post(endpoint: string, data:any){
        return this.http.post(this.baseUrl+endpoint, data)
    }

    put(endpoint :string, campoIdent:string, valorIdent:any, data:any){
        return this.http.put(this.baseUrl+endpoint+'/'+campoIdent+'/'+valorIdent, data)
    }

    delete(endpoint :string, campoIdent:string, valorIdent:any){
        return this.http.delete(this.baseUrl+endpoint+'/'+campoIdent+'/'+valorIdent)
    }

}