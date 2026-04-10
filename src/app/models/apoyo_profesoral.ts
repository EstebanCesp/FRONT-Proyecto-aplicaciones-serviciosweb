import { estudios_realizadosResponse } from "./estudios_realizados"

export interface apoyo_profesoralResponse{
    estudios : any
    con_apoyo : boolean
    institucion : string
    tipo : string
}

export interface apoyo_profesoralRead{
    nombreSP: string
}

export interface apoyo_profesoralCreate extends apoyo_profesoralRead{
    estudios : any
    con_apoyo : boolean
    institucion : string
    tipo : string
}

export interface apoyo_profesoralDelete extends apoyo_profesoralRead{
    estudios : any
}