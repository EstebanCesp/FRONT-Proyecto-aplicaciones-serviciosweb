export interface estudios_realizadosResponse{
    id: number
    titulo: string
    universidad: string
    fecha: Date
    tipo: string
    ciudad: string
    docente: any 
    ins_acreditada: number
    metodologia: string
    perfil_egresado: string
    pais: string
}

export interface estudios_realizadosRead{
    nombreSP: string
}

export interface estudios_realizadosCreate extends estudios_realizadosRead{
    id: number
    titulo: string
    universidad: string
    fecha: Date
    tipo: string
    ciudad: string
    docente: any 
    ins_acreditada: number
    metodologia: string
    perfil_egresado: string
    pais: string
}

export interface estudios_realizadosDelete extends estudios_realizadosRead{
    id: number
}