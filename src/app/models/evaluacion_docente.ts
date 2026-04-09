import { docenteResponse } from "./docente"

export interface evaluacion_docenteResponse{
    id:number
    docente:any
    calificacion:number
    semestre:string
}

export interface evaluacion_docente_read{
    nombreSP:string
}

export interface evaluacion_docente_create extends evaluacion_docente_read{
    id:number
    docente:number
    calificacion:number
    semestre:string
}

export interface evaluacion_docente_update extends evaluacion_docente_read{
    id:number | null
    docente:number | null
    calificacion:number | null
    semestre:string | null
}

export interface evaluacion_docente_delete extends evaluacion_docente_read{
    id:number
}
