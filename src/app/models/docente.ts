import { linea_investigacion } from "./linea_investigacion"

export interface docenteResponse{
    cedula: number
    nombres: string
    apellidos: string
    genero: string
    cargo: string
    fecha_nacimient: Date
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
    fecha_nacimient: Date
    correo: string
    telefono: string
    url_cvlac: string
    fecha_actualizacion: Date
    escalafon: string
    perfil: string
    cat_minciencia: string
    conv_minciencia: string
    nacionalidaad:string
    linea_investigacion_principal: number
}

export interface docente_Update extends docente_Read{
    cedula: number | null
    nombres: string | null
    apellidos: string | null
    genero: string | null
    cargo: string | null
    fecha_nacimiento: Date | null
    correo: string | null
    telefono: string | null
    url_cvlac: string | null
    fecha_actualizacion: Date | null
    escalafon: string | null
    perfil: string | null
    cat_minciencia: string | null
    conv_minciencia: string | null
    nacionalidaad:string | null
    linea_investigacion: number | null
}

export interface docente_Delete extends docente_Read{
    cedula: number
}


