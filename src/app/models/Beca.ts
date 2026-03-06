
export interface Beca {
  estudios: number;
  tipo: string;
  institucion: string;
  fecha_inicio: string;
  fecha_fin: string | null;
}

export interface BecaCreate {
  estudios: number;
  tipo: string;
  institucion: string;
  fecha_inicio: string;
  fecha_fin: string | null;
}

export interface BecaUpdate {
  estudios: number | null;
  tipo: string | null;
  institucion: string | null;
  fecha_inicio: string | null;
  fecha_fin: string | null;
}