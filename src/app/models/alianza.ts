import { Aliado } from "./aliado"
import { docenteResponse } from "./docente"
import { programa } from "./programa"

export interface alianzaResponse{
    aliado:any
    departamento:any
    fecha_inicio:Date
    fecha_fin:Date
    docente:any
}
export interface alianzasp_read{
    nombreSP:string
}

export interface alianzasp_create extends alianzasp_read{
    aliado:number
    departamento:number
    fecha_inicio:Date
    fecha_fin:Date
    docente:number
}

export interface alianzasp_delete extends alianzasp_read{
    aliado:number
    departamento:number
}