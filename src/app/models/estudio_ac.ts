export interface estudio_acResponse{
    estudio: any
    area_conocimiento: any
}

export interface estudio_acRead{
    nombreSP: string
}

export interface estudio_acCreate extends estudio_acRead{
    estudio: any
    area_conocimiento: any
}

export interface estudio_acDelete extends estudio_acRead{
    estudio: any
    area_conocimiento: any
}   