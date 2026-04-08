import { linea_investigacion } from "./linea_investigacion"

export interface docente{
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
    linea_investigacion_principal: linea_investigacion
}