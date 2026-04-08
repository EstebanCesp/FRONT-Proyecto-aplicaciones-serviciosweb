import { docente } from "./docente"
import { programa } from "./programa"

export interface docente_departamento{
    docente:docente
    departamento:programa
    dedicacion:string
    modalidad:string
    fecha_ingreso:Date
    fecha_salida:Date
}