


export interface EstudioRealizadoResponse {
  id: number;
  docente: any;
  titulo: string;
  universidad: string;
  tipo: string;
  fecha: string;
  beca: any; // detalle anidado que puede venir null
}

export interface BecaResponse {
  estudios: any;
  tipo: string;
  institucion: string;
  fecha_inicio: string;
  fecha_fin: string | null;
}

export interface becasp_read {
  nombreSP: string;
}

export interface becasp_create extends becasp_read {
  estudios: number;
  tipo: string;
  institucion: string;
  fecha_inicio: string;
  fecha_fin: string | null;
}

export interface becasp_delete extends becasp_read {
  estudios: number;
}