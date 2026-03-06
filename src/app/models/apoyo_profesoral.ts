export interface apoyo_profesoral{
    estudios : number
    con_apoyo : number
    institucion : string
    tipo : string
}

export interface apoyo_profesoralCreate{
    estudios : number
    con_apoyo : number
    institucion : string
    tipo : string
}

export interface apoyo_profesoralUpdate{
    estudios : number|null
    con_apoyo : number|null
    institucion : string|null
    tipo : string|null
}