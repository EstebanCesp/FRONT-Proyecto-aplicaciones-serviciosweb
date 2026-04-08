import { Aliado } from "./aliado"
import { docenteResponse } from "./docente"
import { programa } from "./programa"

export interface alianzaResponse{
    aliado:Aliado
    departamento:programa
    fecha_inicio:Date
    fecha_fin:Date
    docente:docenteResponse
}
export interface alianzasp_read{
    nombresp:string
}

export interface alianzasp_create extends alianzasp_read{
    aliado:number
    departamento:number
    fecha_inicio:Date
    fecha_fin:Date
    docente:number
}

export interface alianzasp_update extends alianzasp_read{
    aliado:number | null
    departamento:number | null
    fecha_inicio:Date | null
    fecha_fin:Date | null
    docente:number | null
}

export interface alianzasp_delete extends alianzasp_read{
    aliado:number
    departamento:number
}