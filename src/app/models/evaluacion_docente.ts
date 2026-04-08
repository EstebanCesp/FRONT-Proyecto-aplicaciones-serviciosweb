import { docente } from "./docente"

export interface evaluacion_docente{
    id:number
    docente:docente
    calificacion:number
    semestre:string
}