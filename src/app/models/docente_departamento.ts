import { DeprecatedGuard } from "@angular/router"
import { docenteResponse } from "./docente"
import { programa } from "./programa"

export interface docente_departamentoResponse{
    dedicacion:string
    modalidad:string
    fecha_ingreso:Date
    fecha_salida:Date
    docente:any
    departamento:any
}

export interface docente_departamento_read{
    nombreSP:string
}

export interface docente_departamento_create extends docente_departamento_read{
    docente:number
    departamento:number
    dedicacion:string
    modalidad:string
    fecha_ingreso:Date
    fecha_salida:Date
}

export interface docente_departamento_delete extends docente_departamento_read{
    docente:number
    departamento:number
}

