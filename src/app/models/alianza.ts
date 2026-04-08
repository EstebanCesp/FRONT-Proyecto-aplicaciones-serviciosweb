import { Aliado } from "./aliado"
import { docente } from "./docente"
import { programa } from "./programa"

export interface alianza{
    aliado:Aliado
    departamento:programa
    fecha_inicio:Date
    fecha_fin:Date
    docente:docente
}