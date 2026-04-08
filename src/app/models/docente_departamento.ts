import { docenteResponse } from "./docente"
import { programa } from "./programa"

export interface docente_departamentoResponse{
    docente:docenteResponse
    departamento:programa
    dedicacion:string
    modalidad:string
    fecha_ingreso:Date
    fecha_salida:Date
}

export interface docente_departamento_read{
    nombresp:string
}

export interface docente_departamento_create extends docente_departamento_read{
    docente:number
    departamento:number
    dedicacion:string
    modalidad:string
    fecha_ingreso:Date
    fecha_salida:Date
}

export interface docente_departamento_update extends docente_departamento_read{
    docente:number | null
    departamento:number | null
    dedicacion:string | null
    modalidad:string | null
    fecha_ingreso:Date | null
    fecha_salida:Date | null
}

export interface docente_departamento_delete extends docente_departamento_read{
    docente:number
    departamento:number
}

