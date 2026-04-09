import { linea_investigacion } from "./linea_investigacion"

export interface docenteResponse{
    cedula: number
    nombres: string
    apellidos: string
    genero: string
    cargo: string
    fecha_nacimiento: Date
    correo: string
    telefono: string
    url_cvlac: string
    fecha_actualizacion: Date
    escalafon: string
    perfil: string
    cat_minciencia: string
    conv_minciencia: string
    nacionalidaad:string
    linea_investigacion:any
}

export interface docente_Read{
    nombreSP :string
}

export interface docente_Create extends docente_Read{
    cedula: number
    nombres: string
    apellidos: string
    genero: string
    cargo: string
    fecha_nacimiento: Date
    correo: string
    telefono: string
    url_cvlac: string
    fecha_actualizacion: Date
    escalafon: string
    perfil: string
    cat_minciencia: string
    conv_minciencia: string
    nacionalidaad:string
    linea_investigacion: number
}

export interface docente_Delete extends docente_Read{
    cedula: number
}


