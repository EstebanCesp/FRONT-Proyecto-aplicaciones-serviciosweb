export interface estudio_acResponse{
    estudios: any
    area_conocimiento: any
}

export interface estudio_acRead{
    nombreSP: string
}

export interface estudio_acCreate extends estudio_acRead{
    estudios: any
    area_conocimiento: any
}

export interface estudio_acDelete extends estudio_acRead{
    estudios: any
    area_conocimiento: any
}   